import PropTypes from 'prop-types';
import React from 'react';
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
                    loader={
                        <div className="persons-list__loader" key="#loading">
                            Loading...
                        </div>
                    }
                >
                    {Array.isArray(list) &&
                        list.map((item, index) => {
                            return error && index === list.length - 1 ? (
                                <React.Fragment key={item.id}>
                                    <PersonItem
                                        {...item}
                                        onDeletePerson={onDeletePerson}
                                    />
                                    <div className="persons-list__error">
                                        {error}
                                    </div>
                                </React.Fragment>
                            ) : (
                                <PersonItem
                                    key={item.id}
                                    {...item}
                                    onDeletePerson={onDeletePerson}
                                />
                            );
                        })}
                </InfiniteScroll>
            )}
        </div>
    );
}

PersonsList.propTypes = {
    error: PropTypes.string,
    getPersons: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape(PersonItem.propTypes)),
    onDeletePerson: PropTypes.func.isRequired,
};

export default PersonsList;
