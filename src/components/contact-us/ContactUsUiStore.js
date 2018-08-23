import {action, observable} from 'mobx';
import ContactUsFormSchema from './ContactUsFormSchema';
import {MODAL_TYPE} from "../common/modal/ModalManagerUiState";
import SmsIcon from '../../assets/images/sms-ico.png';
import {DeviceType} from "../appUiState";


export default class ExecutionBenefitUiState {
    constructor(apiGateway, modalManagerUiState, appUiState) {
        this.form = new ContactUsFormSchema(this._onSuccess.bind(this));
        this._apiGateway = apiGateway;
        this._modalManagerUiState = modalManagerUiState;
        this._appUiState = appUiState;
    }
    @observable showSuccessMessageDesktop = false;

    @action.bound
    onSubmitDekstop() {
        this.showSuccessMessageDesktop = false;
    }
    @action.bound
    onSubmit(e) {
        this.form.onSubmit(e);
    }

    @action.bound
    async sendContactInfo() {
        try {
            await this._apiGateway.sendContactInfo(this.form.values());
        }
         catch(error) {
             console.error(`Failed to send contact info. error: ${error}`, error);
         }
    }
    @action
    _onSuccess() {
        if (this._appUiState.deviceType === DeviceType.MOBILE) {
            this._modalManagerUiState.openModal(MODAL_TYPE.IMAGE_MODAL, {
                onHide: () => this._modalManagerUiState.closeCurrentModal(),
                onClick: () => this._modalManagerUiState.closeCurrentModal(),
                imageUrl: SmsIcon,
                sendText: 'חזרה לעמוד להבית',
                bodyText: 'הפנייה נשלחה בהצלחה!',
                imageStyle: {height: '57px', width: '75px'},
            });
        } else {
            this.showSuccessMessageDesktop = true;
        }
        this.sendContactInfo();
        //TODO: How to route back to home page without history?
        console.log('values:', this.form.values());
    }
}
