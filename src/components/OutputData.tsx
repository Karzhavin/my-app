import React from 'react';

export default function OutputData(props: { heading: string; login: string; avatar_url: string; }) {
    return (
        <div className='stack-large'>
            <h2 id='list-heading'>{props.heading} Data:</h2>
            <div className='output-data'>
                <img
                    className='output-image'
                    src={props.avatar_url}
                    alt={`Avatar of ${props.heading}`}
                    width='100'
                />
                <div className='output-data-text'>
                    <p className='data-item'>name: {props.login}</p>
                    <p className='data-item'>
                        <a className='link' href={`https://github.com/${props.login}`}>link on github page</a>
                    </p>
                </div>
            </div>
        </div>
    );
}