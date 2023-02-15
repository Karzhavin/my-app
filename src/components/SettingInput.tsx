import React from 'react';

export default function SettingInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; id: string; }) {
    return (
        <div>
            <h2 className='label-wrapper'>
                <label htmlFor={`${props.id}-input`} className='todo-label'>
                    {props.label}
                </label>
            </h2>
            <input
                type='text'
                id={`${props.id}-input`}
                className='todo-text'
                name='text'
                autoComplete='off'
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
}