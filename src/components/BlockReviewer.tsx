import React from 'react';

export default function BlockReviewer(props: { reviewerName: string; blackListData: Array<string>; setBlackListData: Function; removeBlackListItem: Function; }) {
    return (
        <li className='item-of-blacklist'>
            <span className='item-of-blacklist__text'>{props.reviewerName}</span>
            <button 
                type='button'
                className='btn item-of-blacklist__remove-btn'
                onClick={() => props.removeBlackListItem(props.reviewerName)}
            >
                x
            </button>
        </li>
    )
}