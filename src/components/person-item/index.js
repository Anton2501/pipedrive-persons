import React from "react";
import './style.scss';

function PersonItem({ name = 'Text', organization = 'Text', userpic = 'fdgf' }) {
    return (
        <li className="person">
            <div className="person__left">
                <span className="person__name">{name}</span>
                <div>   
                    <i className="person__organization-icon"></i>
                    <span className="person__organization">{organization}</span>
                </div>
            </div>
            <div className="person__right">
                <img src={userpic} alt={name} className="person__image" />
            </div>
        </li>
    )
};

export default PersonItem;
