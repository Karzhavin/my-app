const initialState = {
    loginInput: '',
    repositoryInput: '',
    blacklistInput: ''
};

export default function settingsReducer(state = initialState, action: { type: string; payload: string; }) {
    switch (action.type) {
        case 'settings/loginInputUpdated': {
            return {
                ...state,
                loginInput: action.payload
            }
        }
        case 'settings/repositoryInputUpdated': {
            return {
                ...state,
                repositoryInput: action.payload
            }
        }
        case 'settings/blacklistInputUpdated': {
            return {
                ...state,
                blacklistInput: action.payload
            }
        }
        default:
            return state;
    }
};