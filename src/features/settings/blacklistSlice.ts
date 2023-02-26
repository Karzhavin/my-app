const initialState = {
    blacklist: []
};

export default function blacklistReducer(state = initialState, action: { type: string; payload: []; }) {
    switch (action.type) {
        case 'settings/blacklistChanged': {
            return {
                ...state,
                blacklist: action.payload
            }
        }
        default:
            return state;
    }
};