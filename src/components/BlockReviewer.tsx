import React from 'react';

export default function BlockReviewer(props: { reviewerName: string; blackListData: Array<string>; setBlackListData: Function; }) {
    return (
        <li className='item-of-blacklist'>
            <span className='item-of-blacklist__text'>{props.reviewerName}</span>
            <button 
                type='button'
                className='btn item-of-blacklist__remove-btn'
                onClick={() => {
                    const updateBlackListData = props.blackListData.filter((item: string) => item !== props.reviewerName);
                    props.setBlackListData(updateBlackListData);
                    try {
                        localStorage.setItem('blackListData', JSON.stringify(updateBlackListData));
                    } catch (error) {
                        alert(error);
                        localStorage.clear();
                    }
                }}
            >
                x
            </button>
        </li>
    )
}