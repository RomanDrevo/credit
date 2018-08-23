import {observable, action} from 'mobx';

export const MODAL_TYPE = {
    SIMPLE_MODAL: "SIMPLE_MODAL",
    IMAGE_MODAL: "IMAGE_MODAL",
};

export default class ModalManagerUiState {
    @observable shownModal = null;
    @observable modalProps = null;

    @action.bound
    openModal(modalType, modalProps) {
        this.shownModal = modalType;
        this.modalProps = modalProps;
    }

    @action.bound
    closeCurrentModal() {
        this.shownModal = null;
    }
}
