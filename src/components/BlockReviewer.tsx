import React from 'react';

export default function BlockReviewer(props: { reviewerName: string; blacklist: Array<string>; removeBlacklistItem: Function; }) {
    return (
        <li className='item-of-blacklist'>
            <span className='item-of-blacklist__text'>{props.reviewerName}</span>
            <button 
                type='button'
                className='btn item-of-blacklist__remove-btn'
                onClick={() => props.removeBlacklistItem(props.reviewerName)}
            >
                x
            </button>
        </li>
    )
}