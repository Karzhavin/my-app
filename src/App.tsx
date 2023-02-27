import React from 'react';
import SearchSettings from './components/SearchSettings';
import SearchResult from './components/SearchResult';

export default function App() {
    return (
        <div className='searchapp stack-large'>
            <h1>Reviewer Searcher</h1>
            <SearchSettings />
            <SearchResult />
        </div>
    );
}
