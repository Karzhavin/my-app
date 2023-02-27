import React, { useState } from 'react';
import SettingInput from './SettingInput';
import BlacklistInput from './BlacklistInput';
import getResult from '../functions/getResult';
import { useSelector, useDispatch } from 'react-redux';

function setLocalStorageData(storageKey: string, input: string) {
    try {
        localStorage.setItem(storageKey, `${input}`);
    } catch (error) {
        alert(error);
        localStorage.clear();
    }
}

export default function SearchSettings() {
    const [isOpening, setOpening] = useState(false);

    const loginInput = useSelector((state: { settings: { loginInput: string; }; }) => state.settings.loginInput);
    const repositoryInput = useSelector((state: { settings: { repositoryInput: string; }; }) => state.settings.repositoryInput);
    const blacklistInput = useSelector((state: { settings: { blacklistInput: string; }; }) => state.settings.blacklistInput);

    const blacklist = useSelector((state: { blacklist: { blacklist: []; }; }) => state.blacklist.blacklist);

    const dispatch = useDispatch();

    function handleLoginInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        dispatch({ type: 'settings/loginInputUpdated', payload: e.target.value });
        setLocalStorageData('loginInput', `${e.target.value}`);
    }
    function handleRepositoryInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        dispatch({ type: 'settings/repositoryInputUpdated', payload: e.target.value });
        setLocalStorageData('repositoryInput', `${e.target.value}`);
    }
    function handleBlacklistInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        dispatch({ type: 'settings/blacklistInputUpdated', payload: e.target.value });
        setLocalStorageData('blacklistInput', `${e.target.value}`);
    }

    function addBlacklistItem(reviewerName: string) {
        if (blacklist.some((item) => item === reviewerName)) {
            alert('the value already exists');
        } else {
            const newBlacklist = blacklist.slice();
            dispatch({ type: 'settings/blacklistChanged', payload: [...newBlacklist, reviewerName] });
            try {
                localStorage.setItem('blacklistData', JSON.stringify([...newBlacklist, reviewerName]));
            } catch (error) {
                alert(error);
                localStorage.clear();
            }
        }
    }
    function removeBlacklistItem(reviewerName: string) {
        const updateBlacklist = blacklist.filter((item: string) => item !== reviewerName);
        dispatch({ type: 'settings/blacklistChanged', payload: updateBlacklist });
        try {
            localStorage.setItem('blacklistData', JSON.stringify(updateBlacklist));
        } catch (error) {
            alert(error);
            localStorage.clear();
        }
    }

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        (async () => {
            const requestData: { loginInput: string; repositoryInput: string; blacklist: []; } = { loginInput, repositoryInput, blacklist };
            let result = {
                user: { state: false, data: { login: '', avatar_url: '' }},
                reviewer: { state: false, data: { login: '', avatar_url: '' }}
            };
            try {
                result = await getResult(requestData);
            } catch (error) {
                alert('User or repository not found! Please, repeat the request or change input data.');
            }
            if (result.user.state) {
                dispatch({ type: 'results/userChanged', payload: result.user });
            } else {
                dispatch({ type: 'results/userChanged', payload: result.user });
            }
            if (result.reviewer.state) {
                dispatch({ type: 'results/reviewerChanged', payload: result.reviewer });
            } else {
                dispatch({ type: 'results/reviewerChanged', payload: result.reviewer });
            }
        })();
    }
    
    const closingTemplate = null;
    const openingTemplate = (
        <div className='search-settings'>
            <SettingInput
                id='login'
                label='Login:'
                value={loginInput}
                handleChange={handleLoginInputChange}
            />
            <SettingInput
                id='repository'
                label='Repository:'
                value={repositoryInput}
                handleChange={handleRepositoryInputChange}
            />
            <BlacklistInput
                label='Blacklist:'
                value={blacklistInput}
                handleChange={handleBlacklistInputChange}
                blacklist={blacklist}
                addBlacklistItem={addBlacklistItem}
                removeBlacklistItem={removeBlacklistItem}
            />
            <button type='submit' className='btn btn__primary btn__lg'>
                Search
            </button>
        </div>
    );
    return (
        <form onSubmit={handleSubmit}>
            <button 
                type='button'
                className='btn btn__lg'
                onClick={() => setOpening(!isOpening)}
            >
                {isOpening ? 'End Search' : 'Get Started'}
            </button>
            {isOpening ? openingTemplate : closingTemplate}
        </form>
    );
}
