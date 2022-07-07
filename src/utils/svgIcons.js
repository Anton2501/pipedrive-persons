import React from 'react';

export const IconCross = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <path
            className="color"
            fill={color || "#000"}
            fillRule="evenodd"
            d="M5 3.585L1.465.05.051 1.464 3.586 5 .051 8.536 1.465 9.95 5 6.414 8.536 9.95 9.95 8.536 6.415 5 9.95 1.464 8.536.05z"
        />
    </svg>
);
