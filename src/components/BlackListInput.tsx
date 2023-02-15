import React from 'react';
import BlockReviewer from './BlockReviewer';

export default function SettingInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; blackListData: Array<string>; setBlackListData: Function; }) {
    const blockReviewerList = props.blackListData.map((reviewerName: string, index: number) => {
        return (
            <BlockReviewer
                key={index}
                reviewerName={reviewerName}
                blackListData={props.blackListData}
                setBlackListData={props.setBlackListData}
            />
        );
    });
    return (
        <div>
            <h2 className='label-wrapper'>
                <label htmlFor='blackList-input' className='todo-label'>
                    {props.label}
                </label>
            </h2>
            <ul>
                {blockReviewerList}
            </ul>
            <input
                type='text'
                id='blackList-input'
                className='todo-text'
                name='text'
                autoComplete='off'
                value={props.value}
                onChange={props.handleChange}
            />
            <button 
                type='button'
                className='btn'
                onClick={() => {
                    if (props.blackListData.some((item) => item === props.value)) {
                        alert('the value already exists');
                    } else {
                        props.setBlackListData([...props.blackListData, props.value]);
                        try {
                            localStorage.setItem('blackListData', JSON.stringify([...props.blackListData, props.value]));
                        } catch (error) {
                            alert(error);
                            localStorage.clear();
                        }
                    }
                }}
            >
                Add
            </button>
        </div>
    );
}