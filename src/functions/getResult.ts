const getResult = async function(data: { loginInput: string; repositoryInput: string; blacklist: []; }) {

    const requestURL = `https://api.github.com/repos/${data.loginInput}/${data.repositoryInput}/contributors`;
    const request = new Request(requestURL);

    let contributorsData = [];
    
    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        contributorsData = await response.json();
    } catch (error) {
        throw error;
    }
    
    const contributors = contributorsData.reduce((result: { [key: string]: { login: string; avatar_url: string; }; }, contributor: { login: string; avatar_url: string; }) => {
        result[contributor.login] = { login: contributor.login, avatar_url: contributor.avatar_url };
        return result;
    }, {});

    const user: { state: boolean; data: { login: string; avatar_url: string; } } = { state: false, data: { login: '', avatar_url: '' }};
    const reviewer: { state: boolean; data: { login: string; avatar_url: string; } } = { state: false, data: { login: '', avatar_url: '' }};

    const receivedReviewers: Array<{ login: string; avatar_url: string; }> = [];

    for (const contributor in contributors) {
        if (contributor.toLowerCase() !== data.loginInput.toLowerCase()) {
            if (!data.blacklist.some((item: string) => item.toLowerCase() === contributor.toLowerCase())) {
                receivedReviewers.push(contributors[contributor]);
            }
        } else {
            user.state = true;
            user.data = contributors[contributor];
        }
    }

    if (receivedReviewers.length > 0) {
        const randomNumber = Math.floor(Math.random() * receivedReviewers.length);
        reviewer.state = true;
        reviewer.data = receivedReviewers[randomNumber];
    }

    return {
        user: user,
        reviewer: reviewer
    }
}

export default getResult;