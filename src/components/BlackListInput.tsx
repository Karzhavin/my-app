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
        <div className='search-blacklist'>
            <div className='blacklist-container'>
                <label htmlFor='blacklist-input' className='search-label blacklist-label'>
                        {props.label}
                    </label>
                <ul className='list-of-blacklist'>
                    {blockReviewerList}
                </ul>
            </div>
            
            <div className='blacklist-input'>
                <input
                    type='text'
                    id='blacklist-input'
                    className='search-text'
                    name='text'
                    autoComplete='off'
                    value={props.value}
                    onChange={props.handleChange}
                />
                <button 
                    type='button'
                    className='btn blacklist-input-btn'
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
        </div>
    );
}