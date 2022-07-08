import PropTypes from 'prop-types';
import React from 'react';
import { Dialog } from '@reach/dialog';
import Button from '~components/button';
import { IconCross } from '~utils/svgIcons';
import '@reach/dialog/styles.css';
import './style.scss';

export function CloseButton({ className, ...rest }) {
    return (
        <Button
            {...rest}
            className={`modal__close${className ? ` ${className}` : ''}`}
        >
            <IconCross color="#757577" />
        </Button>
    );
}

CloseButton.propTypes = {
    className: PropTypes.string,
};

export function ModalHead({ onClose, children }) {
    return (
        <div className="modal__head">
            <span className="modal__title">{children}</span>
            <CloseButton onClick={onClose} />
        </div>
    );
}

ModalHead.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export function ModalContent({ children }) {
    return <div className="modal__content">{children}</div>;
}

ModalContent.propTypes = {
    children: PropTypes.node,
};

export function ModalActions({ children }) {
    return <div className="modal__actions">{children}</div>;
}

ModalActions.propTypes = {
    children: PropTypes.node,
};

export function Modal({ isOpen, onDismiss, children }) {
    return (
        <Dialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            className="modal"
            aria-label="person-data"
        >
            {children}
        </Dialog>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
};

export default Modal;
