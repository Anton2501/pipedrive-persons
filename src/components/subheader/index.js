import React from 'react';
import Search from '~components/search';
import './style.scss';

function SubHeader() {
    const [isAttached, setIsAttached] = React.useState(false);   
    const savedTopRef = React.useRef();
    const headerRef = React.useRef();
    const observer = React.useCallback(() => {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > savedTopRef.current) {
            setIsAttached(true);
        }
        if (scrollTop <= savedTopRef.current) {
            setIsAttached(false);
        }
    }, [setIsAttached]);

    React.useLayoutEffect(() => {
        const { top } = headerRef.current?.getBoundingClientRect();
        savedTopRef.current = top;
    }, []);

    React.useEffect(() => {
        window.addEventListener('scroll', observer);
        return () => window.removeEventListener('scroll', observer);
    }, [observer]);

    return (
        <>
            <div
                className={`subheader${isAttached ? ' attached' : ''}`}
                ref={headerRef}
            >
                <div className="main-container">
                    <div className="subheader__inner">
                        <h3 className="subheader__title">People's List</h3>
                        <Search />
                    </div>
                </div>
            </div>
            {isAttached && <div style={{ width: '100%', height: `${headerRef.current?.clientHeight}px` }} className="subheader__hidden"/>}
        </>
    );
}

export default SubHeader;
