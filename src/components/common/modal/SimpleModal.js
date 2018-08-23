import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './SimpleModal.module.scss';
import ActionButton from '../../common/actionbutton/ActionButton';


const SimpleModal = ({isShown, onHide, onClick, sendText, bodyText, titleText}) => {
    return (
        <Modal bsSize="small" show={isShown} onHide={onHide} className={styles['modal-wrapper']}
               aria-labelledby="contained-modal-title-sm">
            <Modal.Body className={'text-center'}>
                <h4 className="semibold pb2">{titleText}</h4>
                <p>{bodyText}</p>
                <div className="action-button-container flex justify-center">
                    <ActionButton onClick={onClick}>{sendText}</ActionButton>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SimpleModal;
