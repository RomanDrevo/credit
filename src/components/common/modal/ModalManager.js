import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {MODAL_TYPE} from "./ModalManagerUiState";
import ImageModal from "./ImageModal";
import SimpleModal from "./SimpleModal";


@withRouter
@inject('modalManagerUiState')
@observer
export default class ModalManager extends Component {
    render() {
        const {modalManagerUiState} = this.props;
        const {shownModal, modalProps} = modalManagerUiState;

        return <div>
            <SimpleModal isShown={shownModal === MODAL_TYPE.SIMPLE_MODAL}  {...modalProps}/>
            <ImageModal isShown={shownModal === MODAL_TYPE.IMAGE_MODAL}  {...modalProps}/>
        </div>
    }
}
