import PropTypes from 'prop-types';
import React from 'react';
import Search from '~components/search';
import Button from '~components/button';
import AddPerson from '~components/add-person';
import './style.scss';

// Commented code here is to show how I would make StickyHeader without "position: sticky;" CSS property,
// for example for IE10-11, where it doesn't supported

function StickyHeader({ onAddPerson, onSearch }) {
    // const [isAttached, setIsAttached] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const openModal = () => setShowDialog(true);
    const closeModal = () => setShowDialog(false);
    // const savedTopRef = React.useRef();
    const headerRef = React.useRef();
    // const observer = React.useCallback(() => {
    //     const scrollTop =
    //         window.pageYOffset || document.documentElement.scrollTop;

    //     if (scrollTop > savedTopRef.current) {
    //         setIsAttached(true);
    //     }
    //     if (scrollTop <= savedTopRef.current) {
    //         setIsAttached(false);
    //     }
    // }, [setIsAttached]);

    // React.useLayoutEffect(() => {
    //     const { top } = headerRef.current?.getBoundingClientRect();
    //     savedTopRef.current = top;
    // }, []);

    // React.useEffect(() => {
    //     window.addEventListener('scroll', observer);
    //     return () => window.removeEventListener('scroll', observer);
    // }, [observer]);

    return (
        <React.Fragment>
            <div
                // className={`sticky-header${isAttached ? ' attached' : ''}`}
                className="sticky-header"
                ref={headerRef}
            >
                <div className="main-container">
                    <div className="sticky-header__inner">
                        <h3 className="sticky-header__title">People's List</h3>
                        <div className="sticky-header__right-wrap">
                            <Search
                                className="sticky-header__search"
                                onSearch={onSearch}
                            />
                            <Button
                                onClick={openModal}
                                className="sticky-header__add-person"
                            >
                                Add person
                            </Button>
                        </div>
                        <AddPerson
                            isOpen={showDialog}
                            onClose={closeModal}
                            onAddPerson={onAddPerson}
                        />
                    </div>
                </div>
            </div>
            {/* {isAttached && <div style={{ width: '100%', height: `${headerRef.current?.clientHeight}px` }} className="sticky-header__hidden"/>} */}
        </React.Fragment>
    );
}

StickyHeader.propTypes = {
    onAddPerson: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default StickyHeader;
