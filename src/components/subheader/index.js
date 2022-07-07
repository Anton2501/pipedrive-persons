import React from 'react';
import Search from '~components/search';
import Button from '~components/button';
import AddPerson from '~components/add-person';
import './style.scss';

function SubHeader({ onAddPerson, onSearch }) {
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
        <>
            <div
                // className={`subheader${isAttached ? ' attached' : ''}`}
                className="subheader"
                ref={headerRef}
            >
                <div className="main-container">
                    <div className="subheader__inner">
                        <h3 className="subheader__title">People's List</h3>
                        <div className="subheader__right-wrap">
                            <Search className="subheader__search" onSearch={onSearch} />
                            <Button onClick={openModal} className="subheader__add-person">Add person</Button>
                        </div>
                        {showDialog && <AddPerson onClose={closeModal} onAddPerson={onAddPerson} />}
                    </div>
                </div>
            </div>
            {/* {isAttached && <div style={{ width: '100%', height: `${headerRef.current?.clientHeight}px` }} className="subheader__hidden"/>} */}
        </>
    );
}

export default SubHeader;
