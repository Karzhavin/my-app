import React, { useEffect, useState } from 'react';
import SettingInput from './SettingInput';
import BlackListInput from './BlackListInput';

function getLocalStorageData(storageKey: string, stateData: string, setStateData: Function) {
    if (localStorage.getItem(storageKey) && localStorage.getItem(storageKey) !== stateData) {
        const localStorageData = `${localStorage.getItem(storageKey)}`;
        setStateData(localStorageData);
    }
}

function setLocalStorageData(storageKey: string, input: string) {
    try {
        localStorage.setItem(storageKey, `${input}`);
    } catch (error) {
        alert(error);
        localStorage.clear();
    }
}

export default function SearchSettings(props: { blackListData: Array<string>; setBlackListData: Function; getReviewer: (data: { login: string; repository: string; }) => void; }) {
    const [isOpening, setOpening] = useState(false);
    const [login, setLogin] = useState('');
    const [repository, setRepository] = useState('');
    const [blackList, setBlackList] = useState('');

    useEffect(() => {
        getLocalStorageData('login', login, setLogin);
        getLocalStorageData('repository', repository, setRepository);
        getLocalStorageData('blackList', blackList, setBlackList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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

    function addBlackListItem(reviewerName: string) {
        if (props.blackListData.some((item) => item === reviewerName)) {
            alert('the value already exists');
        } else {
            props.setBlackListData([...props.blackListData, reviewerName]);
            try {
                localStorage.setItem('blackListData', JSON.stringify([...props.blackListData, reviewerName]));
            } catch (error) {
                alert(error);
                localStorage.clear();
            }
        }
    }

    function removeBlackListItem(reviewerName: string) {
        const updateBlackListData = props.blackListData.filter((item: string) => item !== reviewerName);
        props.setBlackListData(updateBlackListData);
        try {
            localStorage.setItem('blackListData', JSON.stringify(updateBlackListData));
        } catch (error) {
            alert(error);
            localStorage.clear();
        }
    }

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const requestData: { login: string; repository: string; } = { login, repository };
        props.getReviewer(requestData);
    }
    const closingTemplate = null;
    const openingTemplate = (
        <div className='search-settings'>
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
                addBlackListItem={addBlackListItem}
                removeBlackListItem={removeBlackListItem}
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
