import React, { useState } from 'react';
import SettingInput from './SettingInput';
import BlackListInput from './BlackListInput';

export default function Settings(props: { blackListData: Array<string>; setBlackListData: Function; getReviewer: (data: { login: string; repository: string; }) => void; }) {
    const [isOpening, setOpening] = useState(false);
    const [login, setLogin] = useState('');
    const [repository, setRepository] = useState('');
    const [blackList, setBlackList] = useState('');

    getLocalStorageData('login', login, setLogin);
    getLocalStorageData('repository', repository, setRepository);
    getLocalStorageData('blackList', blackList, setBlackList);

    function getLocalStorageData(storageKey: string, stateData: string, setStateData: Function) {
        if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== stateData) {
            const localStorageData = `${localStorage.getItem(storageKey)}`;
            if (localStorageData !== stateData) {
                setStateData(localStorageData);
            }
        }
    }

    function handleLoginInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setLogin(e.target.value);
        setLocalStorageData('login', `${e.target.value}`);
    }
    function handleRepositoryInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setRepository(e.target.value);
        setLocalStorageData('repository', `${e.target.value}`);
    }
    function handleBlackListInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setBlackList(e.target.value);
        setLocalStorageData('blackList', `${e.target.value}`);
    }

    function setLocalStorageData(storageKey: string, input: string) {
        try {
            localStorage.setItem(storageKey, `${input}`);
        } catch (error) {
            localStorage.clear()
        }
    }

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const requestData: { login: string; repository: string; } = { login, repository };
        props.getReviewer(requestData);
    }
    const closingTemplate = null;
    const openingTemplate = (
        <div className='stack-large'>
            <SettingInput
                id='login'
                label='Login:'
                value={login}
                handleChange={handleLoginInputChange}
            />
            <SettingInput
                id='repository'
                label='Repository:'
                value={repository}
                handleChange={handleRepositoryInputChange}
            />
            <BlackListInput
                label='BlackList:'
                value={blackList}
                handleChange={handleBlackListInputChange}
                blackListData={props.blackListData}
                setBlackListData={props.setBlackListData}
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
                className='btn btn__primary btn__lg'
                onClick={() => setOpening(!isOpening)}
            >
                {isOpening ? 'Close' : 'Get Started'}
            </button>
            {isOpening ? openingTemplate : closingTemplate}
        </form>
    );
}
