import React from 'react';

export default function ReviewerSection(props: { login: string; avatar_url: string; }) {
    return (
        <div className='stack-small'>
            <h2 id='list-heading'>Reviewer Section</h2>
            <div className='c-cb'>
                <img 
                    src={props.avatar_url}
                    alt='Avatar of Reviewer' 
                />
                <p>{props.login}</p>
            </div>
            <div className='btn-group'>
                <a className='btn' href={`https://github.com/${props.login}`}>
                    User Page on GitHub <span className='visually-hidden'>{props.login}</span>
                </a>
            </div>        
        </div>
    );
}