const initialState = {
    user: { state: false, data: { login: '', avatar_url: '' }},
    reviewer: { state: false, data: { login: '', avatar_url: '' }}
}

export default function resultsReducer(state = initialState, action: { type: string; payload: { state: boolean; data: { login: string; avatar_url: string; }; }; }) {
    switch (action.type) {
        case 'results/userChanged': {
            return {
                ...state,
                user: action.payload
            }
        }
        case 'results/reviewerChanged': {
            return {
                ...state,
                reviewer: action.payload
            }
        }
        default:
            return state;
    }
}