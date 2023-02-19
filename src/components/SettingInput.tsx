import React from 'react';

export default function SettingInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; id: string; }) {
    return (
        <div className='search-input'>
            <label htmlFor={`${props.id}-input`} className='search-label search-label__lg'>
                    {props.label}
            </label>
            <input
                type='text'
                id={`${props.id}-input`}
                className='search-text'
                name='text'
                autoComplete='off'
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
}