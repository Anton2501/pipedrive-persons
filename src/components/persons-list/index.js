import React from "react"
import InfiniteScroll from 'react-infinite-scroller';
import PersonItem from '~components/person-item';
import './style.scss';

function PersonsList({ list, hasMore, error, getPersons, onDeletePerson }) {
    return (
        <div className="persons-list">
            {error && Array.isArray(list) && list.length === 0 && (
                <div className="persons-list__error">{error}</div>
            )}
            {Array.isArray(list) && list.length > 0 && (
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={getPersons}
                    hasMore={hasMore}
                    element="ul"
                    loader={<div className="persons-list__loader" key="#loading">Loading...</div>}
                >
                    {Array.isArray(list) && list.map((item, index) => {
                        return error && index === list.length - 1 ? (
                            <>
                                <PersonItem key={item.id} onDeletePerson={onDeletePerson} {...item} />
                                <div className="persons-list__error">{error}</div>
                            </>
                        ) : (
                            <PersonItem key={item.id} onDeletePerson={onDeletePerson} {...item} />
                        )
                    })}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default PersonsList;
