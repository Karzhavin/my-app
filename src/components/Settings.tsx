import React, { useState } from 'react';
import SettingInput from './SettingInput';

export default function Settings(props: { getReviewer: (data: { login: string; repository: string; }) => void; }) {
    const [isOpening, setOpening] = useState(false);
    const [login, setLogin] = useState('');
    const [repository, setRepository] = useState('');

    // Дописать блэклист

    if (localStorage.getItem('login') && localStorage.getItem('login') !== login) {
        const localStorageLogin = `${localStorage.getItem('login')}`;
        if (localStorageLogin !== login) {
            setLogin(localStorageLogin);
        }
    }
    if (localStorage.getItem('repository')) {
        const localStorageRepository = `${localStorage.getItem('repository')}`;
        if (localStorageRepository !== repository) {
            setRepository(localStorageRepository);
        }
    }

    function handleLoginInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setLogin(e.target.value);
        try {
            localStorage.setItem('login', `${e.target.value}`);
        } catch (error) {
            localStorage.clear()
        }
    }
    function handleRepositoryInputChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setRepository(e.target.value);
        try {
            localStorage.setItem('repository', `${e.target.value}`);
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
                label='Login'
                value={login}
                handleChange={handleLoginInputChange}
            />
            <SettingInput
                label='Repository'
                value={repository}
                handleChange={handleRepositoryInputChange}
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
