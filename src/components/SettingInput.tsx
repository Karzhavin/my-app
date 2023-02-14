import React from 'react';

export default function SettingInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; }) {
    return (
        <div>
            <h2 className='label-wrapper'>
                <label htmlFor='login-input' className='todo-label'>
                    {props.label}
                </label>
            </h2>
            <input
                type='text'
                id='login-input'
                className='todo-text'
                name='text'
                autoComplete='off'
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
}