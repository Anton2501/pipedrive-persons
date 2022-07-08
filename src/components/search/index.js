import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from './icons';
import { useUnmount } from 'react-use';
import axios from 'axios';
import API from '~api';
import Button from '~components/button';
import './style.scss';

function Search({ className, onSearch }) {
    const [value, setValue] = React.useState('');
    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    const sourceRef = React.useRef(axios.CancelToken.source());

    const onClickSearch = React.useCallback(async () => {
        try {
            if (value && value.length > 1) {
                const response = await API.get('/persons/search', {
                    params: { term: value },
                    cancelToken: sourceRef.current.token,
                });
                const { data } = response;
                const { items, additional_data } = data.data || [];
                const hasMore =
                    additional_data?.pagination?.more_items_in_collection;

                onSearch(items, hasMore);
            } else {
                console.log(
                    'Empty search field, or value has less than 2 characters'
                );
            }
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error(`Search error: ${error.message}`);
            }
        }
    }, [value, onSearch]);

    useUnmount(() => {
        if (sourceRef.current) {
            sourceRef.current.cancel(
                `Previous GET /persons/search request has been cancelled`
            );
        }
    });

    return (
        <div className={`search${className ? ` ${className}` : ''}`}>
            <div className="search__search-field">
                <i className="search__icon">
                    <SearchIcon color="#757577" />
                </i>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Filter by name"
                    className="search__input"
                />
            </div>
            <Button
                type="submit"
                className="search__filter-btn"
                onClick={onClickSearch}
            >
                Filter
            </Button>
        </div>
    );
}

Search.propTypes = {
    className: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};

export default Search;
