import React from "react";
import './style.scss';

export function Button({ type = "button", onClick, className, children, ...rest }) {
    return (
        <button type={type} className={`button${className ? ` ${className}` : ''}`} onClick={onClick} {...rest}>
            {children}
        </button>
    );
}

export default Button;
