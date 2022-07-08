import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

export function Button({
    type = 'button',
    onClick,
    className,
    children,
    ...rest
}) {
    return (
        <button
            type={type}
            className={`button${className ? ` ${className}` : ''}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};

export default Button;
