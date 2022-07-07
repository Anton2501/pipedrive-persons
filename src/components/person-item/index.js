import React from "react";
import { Modal, ModalHead, ModalContent, ModalActions } from '~components/modal';
import Button from '~components/button';
import "@reach/dialog/styles.css";
import './style.scss';

function PersonItem({ id, name, primary_email, email, phone, onDeletePerson, ...rest }) {
    const [showDialog, setShowDialog] = React.useState(false);
    const onKeyDown = React.useCallback((e) => {
        if (e.keyCode === 13 && showDialog === false) { 
            e.preventDefault();
            setShowDialog(true);
        }
    }, [showDialog, setShowDialog]);
    const openModal = () => setShowDialog(true);
    const closeModal = () => setShowDialog(false);

    const primaryPhone = React.useMemo(() => {
        return Array.isArray(phone) && phone.find(({ primary }) => primary)?.value;
    }, [phone]);

    const primayEmail = React.useMemo(() => {
        if (Array.isArray(email)) return email.find(({ primary }) => primary)?.value;
        if (typeof email === 'string') return email;
        if (typeof primary_email === 'string') return primary_email;
    }, [email, primary_email]);

    return (
        <div id={id} className="person" onClick={openModal} onKeyDown={onKeyDown} tabIndex="0">
            <div className="person__left">
                <span className="person__name">{name}</span>
                <div>   
                    <i className="person__organization-icon"></i>
                    <span className="person__organization">{rest['8d540ebcd6918bb2fe7ac118a4df4a4d61099afe'] || '-'}</span>
                </div>
            </div>
            <div className="person__right">
                {/* where is the field for userpic? */}
                <img src="#" alt={name} className="person__image" />
            </div>

            <Modal isOpen={showDialog} onDismiss={closeModal} onClose={closeModal}>
                <ModalHead onClose={closeModal}>Person Information</ModalHead>
                <ModalContent>
                    <div className="person__inner">
                        <div className="person__img">
                            <img src="#" alt={name} className="person__image" />
                        </div>
                        <span className="person__person-name">{name}</span>
                        <a href={`tel:+${primaryPhone}`} className="person__phone">{primaryPhone}</a>
                    </div>
                    <div className="person__main-data">
                        <div className="person__row">
                            <div className="person__col">Email</div>
                            <div className="person__col">{primayEmail}</div>
                        </div>
                        <div className="person__row">
                            <div className="person__col">Organization</div>
                            <div className="person__col">{rest['8d540ebcd6918bb2fe7ac118a4df4a4d61099afe'] || '-'}</div>
                        </div>
                        <div className="person__row">
                            <div className="person__col">Assistant</div>
                            <div className="person__col">{rest['1dfa3285cdfbcb8dd0b3204d57eb687397542073'] || '-'}</div>
                        </div>
                        <div className="person__row">
                            <div className="person__col">Groups</div>
                            <div className="person__col">{rest['32dedc4f136ef1c0c8d5c437bbf43a2ef331a525'] || '-'}</div>
                        </div>
                        <div className="person__row">
                            <div className="person__col">Location</div>
                            <div className="person__col">{rest['e5f3a4742d5b18f7c86c7009f16956a387cd3f8c'] || '-'}</div>
                        </div>
                    </div>
                </ModalContent>
                <ModalActions>
                    <Button onClick={() => onDeletePerson(id)}>Delete</Button>
                </ModalActions>
            </Modal>
        </div>
    )
};

export default PersonItem;
