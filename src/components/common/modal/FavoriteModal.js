import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './SimpleModal.module.scss';
import ActionButton from '../../common/actionbutton/ActionButton';


const FavoriteModal = ({isShown, onHide, onClick, sendText, bodyText}) => {
    return (
        <Modal bsSize="small" show={isShown} onHide={onHide} className={styles['modal-wrapper']}
               aria-labelledby="contained-modal-title-sm">
            <Modal.Body>
                <div className="text-center">{bodyText}</div>
                <div className="action-button-container flex justify-center">
                    <ActionButton onClick={onClick}>{sendText}</ActionButton>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default FavoriteModal;
