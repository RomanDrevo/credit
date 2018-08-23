import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './ImageModal.module.scss';
import ActionButton from '../../common/actionbutton/ActionButton';


const ImageModal = ({ isShown, onHide, onClick, sendText, bodyText, titleText, imageUrl, imageStyle, BodyTextStyle }) => {
    return (
        <Modal bsSize="small" show={isShown} onHide={onHide} className={styles['modal-wrapper']}
               aria-labelledby="contained-modal-title-sm">
            <Modal.Body bsClass='modal-body flex flex-column items-center text-center'>
                <img alt="" src={(`${imageUrl}`)} className="main-image mb4" style={imageStyle}/>

                <h4 className="semibold pb2">{titleText}</h4>

                <div style={BodyTextStyle} className="semibold">{bodyText}</div>

                <div className="action-button-container flex justify-center">
                    <ActionButton onClick={onClick}>{sendText}</ActionButton>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ImageModal;
