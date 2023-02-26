import React from 'react';
import BlockReviewer from './BlockReviewer';

export default function BlacklistInput(props: { label: string; value: string; handleChange: React.ChangeEventHandler<HTMLInputElement>; blacklist: Array<string>; addBlacklistItem: Function; removeBlacklistItem: Function; }) {
    const blockReviewerlist = props.blacklist.map((reviewerName: string) => {
        return (
            <BlockReviewer
                key={reviewerName}
                reviewerName={reviewerName}
                blacklist={props.blacklist}
                removeBlacklistItem={props.removeBlacklistItem}
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
                    {blockReviewerlist}
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
                    onClick={() => props.addBlacklistItem(props.value)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}