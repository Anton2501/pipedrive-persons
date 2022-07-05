import React from 'react';
import { SearchIcon } from './icons';
import './style.scss';

function Search({ value, onChange, onFocus }) {
    const [isBackdropVisible, setBackdropVisiability] = React.useState(false);
    const onFocusHandler = React.useCallback((e) => {
        setBackdropVisiability(true);
        if (typeof onFocus === 'function') onFocus(e);
    }, [onFocus]);

    return (
        <div className="search">
            {isBackdropVisible && <div className="search__backdrop" onClick={() => setBackdropVisiability(false)}/>}
            <i className="search__icon">
                <SearchIcon color="#757577" />
            </i>
            <input type="text" value={value} onChange={onChange} onFocus={onFocusHandler} placeholder="Filter by name" className="search__input" />
        </div>
    )
}

export default Search;
