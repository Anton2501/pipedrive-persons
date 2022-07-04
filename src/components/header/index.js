import React from 'react';
import Logo from '~img/logo.svg';
import './style.scss';

function Header() {
    return (
        <header className="header">
            <div className="main-container">
                <div className="header__inner">
                    <a href="/" className="header__logo-link">
                        <img src={Logo} alt="Pipeline logo" className="header__logo" />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header;
