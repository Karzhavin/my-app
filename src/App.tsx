import React, { useEffect, useState } from 'react';
import SearchSettings from './components/SearchSettings';
import OutputData from './components/OutputData';

export default function App() {
    const [user, setUser] = useState({ state: false, data: { login: '', avatar_url: '' }});
    const [isExistingUser, setExistingUser] = useState({ state: true, message: '' });

    const [reviewer, setReviewer] = useState({ state: false, data: { login: '', avatar_url: '' }});
    const [isExistingReviewer, setExistingReviewer] = useState({ state: true, message: '' });

    const [blackListData, setBlackListData] = useState([]);

    useEffect(() => {
    if (localStorage.getItem('blackListData') && localStorage.getItem('blackListData') !== JSON.stringify(blackListData)) {
        const localStorageData = `${localStorage.getItem('blackListData')}`;
        setBlackListData(JSON.parse(localStorageData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    async function getReviewer(data: { login: string; repository: string; }) {

        const requestURL = `https://api.github.com/repos/${data.login}/${data.repository}/contributors`;
        const request = new Request(requestURL);

        let contributorsData = []
        
        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            setExistingUser({ state: true, message: '' });
            contributorsData = await response.json();
        } catch (error) {
            setUser({ state: false, data: { login: '', avatar_url: '' }});
            setReviewer({ state: false, data: { login: '', avatar_url: '' }});
            setExistingUser({ state: false, message: 'User or repository not found! Please, repeat the request or change input data.' });
            setExistingReviewer({ state: true, message: '' });
            return;
        }
        
        const contributors = contributorsData.reduce((result: { [key: string]: { login: string; avatar_url: string; }; }, contributor: { login: string; avatar_url: string; }) => {
            result[contributor.login] = { login: contributor.login, avatar_url: contributor.avatar_url };
            return result;
        }, {});

        const receivedReviewers: Array<{ login: string; avatar_url: string; }> = [];

        for (const contributor in contributors) {
            if (contributor.toLowerCase() !== data.login.toLowerCase()) {
                if (!blackListData.some((item: string) => item.toLowerCase() === contributor.toLowerCase())) {
                    receivedReviewers.push(contributors[contributor]);
                }
            } else {
                setUser({ state: true, data: contributors[contributor]});
            }
        }

        if (receivedReviewers.length > 0) {
            const randomNumber = Math.floor(Math.random() * receivedReviewers.length);
            setReviewer({ state: true, data: receivedReviewers[randomNumber]});
            setExistingReviewer({ state: true, message: '' });
        } else {
            setReviewer({ state: false, data: { login: '', avatar_url: '' }});
            setExistingReviewer({ state: false, message: 'Reviewer not found' });
        }
    }
    return (
        <div className='searchapp stack-large'>
            <h1>Reviewer Searcher</h1>
            <SearchSettings
                blackListData={blackListData}
                setBlackListData={setBlackListData}
                getReviewer={getReviewer}
            />
            {user.state ? <OutputData heading='User' login={user.data.login} avatar_url={user.data.avatar_url} /> : null}
            {isExistingUser.state ? null : <p className='message'>{isExistingUser.message}</p>}
            {reviewer.state ? <OutputData heading='Reviewer' login={reviewer.data.login} avatar_url={reviewer.data.avatar_url} /> : null}
            {isExistingReviewer.state ? null : <p className='message'>{isExistingReviewer.message}</p>}
        </div>
    );
}
