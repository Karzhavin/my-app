import { createStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const preloadedState = {
    settings: {
        loginInput: '',
        repositoryInput: '',
        blacklistInput: ''
    },
    blacklist: {
        blacklist: []
    }
}

const persistedLoginInput = localStorage.getItem('loginInput');
const persistedRepositoryInput = localStorage.getItem('repositoryInput');
const persistedBlacklistInput = localStorage.getItem('blacklistInput');
const persistedBlacklistData = localStorage.getItem('blacklistData');

if (persistedLoginInput) {
    preloadedState.settings.loginInput = persistedLoginInput;
}
if (persistedRepositoryInput) {
    preloadedState.settings.repositoryInput = persistedRepositoryInput;
}
if (persistedBlacklistInput) {
    preloadedState.settings.blacklistInput = persistedBlacklistInput;
}
if (persistedBlacklistData) {
    preloadedState.blacklist.blacklist = JSON.parse(persistedBlacklistData);
}

const store = createStore(rootReducer, preloadedState);

export default store;