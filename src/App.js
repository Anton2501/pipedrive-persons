import React from 'react';
import { useUnmount } from 'react-use';
import axios from 'axios';
import API from '~api';
import Header from '~components/header';
import StickyHeader from '~components/sticky-header';
import PersonsList from '~components/persons-list';
import './App.scss';

function App() {
    const [state, setState] = React.useState({
        list: [],
        error: '',
        limit: 10,
        start: 0,
        hasMore: true,
    });

    const { list, hasMore, error } = state;

    const getPersonsSourceRef = React.useRef(axios.CancelToken.source());
    const deletePersonSourceRef = React.useRef(axios.CancelToken.source());

    const getPersons = React.useCallback(async () => {
        try {
            const response = await API.get('/persons', {
                params: {
                    limit: state.limit,
                    start: state.start,
                },
                cancelToken: getPersonsSourceRef.current.token,
            });

            const { data } = response;

            setState({
                ...state,
                list: state.list.concat(data.data),
                start: state.start + state.limit,
                hasMore:
                    data?.additional_data?.pagination?.more_items_in_collection,
            });
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error(`getPersons error: ${error.message}`);
                setState({
                    ...state,
                    error: error.message,
                    hasMore: false,
                });
            }
        }
    }, [state, setState]);

    const onAddPerson = React.useCallback(
        (person) => {
            setState({
                ...state,
                list: [...state.list, person],
            });
        },
        [state, setState]
    );

    const onSearch = React.useCallback(
        (items, hasMore) => {
            const editedItems = items.map(({ item }) => ({
                id: item.id,
                name: item.name,
                primary_email: item.primary_email,
                email: Array.isArray(item.emails) ? item.emails[0] : '',
                phone: Array.isArray(item.phones) ? item.phones[0] : '',
                '32dedc4f136ef1c0c8d5c437bbf43a2ef331a525': Array.isArray(
                    item.custom_fields
                )
                    ? item.custom_fields[0]
                    : '',
                '1dfa3285cdfbcb8dd0b3204d57eb687397542073': Array.isArray(
                    item.custom_fields
                )
                    ? item.custom_fields[1]
                    : '',
            }));

            setState({
                ...state,
                list: editedItems,
                hasMore,
            });
        },
        [state, setState]
    );

    const onDeletePerson = React.useCallback(
        async (id) => {
            try {
                const response = await API.delete(`/persons/${id}`, {
                    cancelToken: deletePersonSourceRef.current.token,
                });

                const { data } = response;

                if (data.success) {
                    const index = state.list.findIndex(
                        (item) => id === item.id
                    );
                    const updated = [...state.list];
                    updated.splice(index, 1);
                    setState({
                        ...state,
                        list: updated,
                    });
                } else {
                    throw new Error('Unsuccessebul deletion');
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error(`Delete person error: ${error.message}`);
                    setState({
                        ...state,
                        error: error.message,
                        hasMore: false,
                    });
                }
            }
        },
        [state, setState]
    );

    React.useEffect(() => {
        getPersons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useUnmount(() => {
        if (getPersonsSourceRef.current) {
            getPersonsSourceRef.current.cancel(
                `Previous GET /persons request has been cancelled`
            );
        }
        if (deletePersonSourceRef.current) {
            deletePersonSourceRef.current.cancel(
                `Previous DEL /person request has been cancelled`
            );
        }
    });

    return (
        <div className="App">
            <Header />
            <StickyHeader onAddPerson={onAddPerson} onSearch={onSearch} />
            <main>
                <div className="main-container">
                    <PersonsList
                        list={list}
                        hasMore={hasMore}
                        error={error}
                        getPersons={getPersons}
                        onDeletePerson={onDeletePerson}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
