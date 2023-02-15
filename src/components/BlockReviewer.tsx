import React from 'react';

export default function BlockReviewer(props: { reviewerName: string; blackListData: Array<string>; setBlackListData: Function; }) {
    return (
        <li>
            <span>{props.reviewerName}</span>
            <button 
                type='button'
                className='btn'
                onClick={() => props.setBlackListData(props.blackListData.filter((item: string) => item !== props.reviewerName))}
            >
                x
            </button>
        </li>
    )
}