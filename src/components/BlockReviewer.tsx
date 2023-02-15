import React from 'react';

export default function BlockReviewer(props: { reviewerName: string; blackListData: Array<string>; setBlackListData: Function; }) {
    return (
        <li>
            <span>{props.reviewerName}</span>
            <button 
                type='button'
                className='btn'
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