import React from 'react';
import { useSelector } from 'react-redux';

export default function SearchResult() {
    const user = useSelector((state: { results: { user: { state: boolean; data: { login: string; avatar_url: string; }; }; }; }) => state.results.user);
    const reviewer = useSelector((state: { results: { reviewer: { state: boolean; data: { login: string; avatar_url: string; }; }; }; }) => state.results.reviewer);

    function resultItem(heading: string, login: string, avatar_url: string) {
        return (
            <div className='stack-large'>
                <h2 id='list-heading'>{heading} Data:</h2>
                <div className='output-data'>
                    <img
                        className='output-image'
                        src={avatar_url}
                        alt={`Avatar of ${heading}`}
                        width='100'
                    />
                    <div className='output-data-text'>
                        <p className='data-item'>name: {login}</p>
                        <p className='data-item'>
                            <a className='link' href={`https://github.com/${login}`}>link on github page</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    function message(text: string) {
        return <p className='message'>{text}</p>
    }
    return (
        <div>
            {user.state ? resultItem('User', user.data.login, user.data.avatar_url) : null}
            {reviewer.state ? resultItem('Reviewer', reviewer.data.login, reviewer.data.avatar_url) : message('Reviewer not found')}
        </div>
    );
}