import React from 'react';
import BlockReviewer from './BlockReviewer';

export default function SettingInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; blackListData: Array<string>; setBlackListData: Function; addBlackListItem: Function; removeBlackListItem: Function; }) {
    const blockReviewerList = props.blackListData.map((reviewerName: string) => {
        return (
            <BlockReviewer
                key={reviewerName}
                reviewerName={reviewerName}
                blackListData={props.blackListData}
                setBlackListData={props.setBlackListData}
                removeBlackListItem={props.removeBlackListItem}
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
                    onClick={() => props.addBlackListItem(props.value)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}