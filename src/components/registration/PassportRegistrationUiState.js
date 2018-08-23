import {action, observable} from 'mobx';

import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
const plugins = {dvr: validatorjs};

const fields = [
    {
        name: 'foreignPassNum',
        label: 'דרכון',
        rules: 'required|numeric',
        options: {validateOnChange: true}
    },
    {
        name: 'creditLastDigits',
        label: 'שש ספרות אחרונות של כרטיס אשראי',
        rules: 'required|digits:6',
        options: {validateOnChange: true}
    },
    {
        name: 'email',
        label: 'אימייל',
        rules: 'required|email',
        options: {validateOnChange: true}
    },
    {
        name: 'tel',
        label: 'טלפון',
        rules: ['required', 'regex:/^(\\()?0?(5[02-9])(\\))?-?\\d{7}$/'],
        options: {validateOnChange: true}
    },
    {
        name: 'bankAccount',
        label: 'חשבון בנק',
        rules: 'required|numeric',
        options: {validateOnChange: true}
    },
    {
        name: 'birthday',
        label: 'תאריך לידה',
        type: 'date',
        value: "2017-06-01",
        // options: {validateOnChange: true}

    },
    {
        name: 'commercialInfo',
        label: 'אישור קבלת הטבות ומבצעים לפני כולם - ',
        type: 'checkbox',
        rules: 'boolean',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'benefitTerms',
        label: 'תקנון הטבות',
        type: 'checkbox',
        rules: 'boolean|accepted',
        options: {
            validateOnChange: true
        }

    },
    {
        name: 'socialBanking',
        label: 'אישור הצטרפות לקבלת מידע ולביצוע פעולות',
        type: 'checkbox',
        rules: 'boolean|accepted',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'rememberMe',
        label: 'זכור אותי',
        type: 'checkbox',
        rules: 'boolean',
        options: {
            validateOnChange: true
        }
    },
    {
        name: 'emailChannel',
        label: 'אימייל',
        type: 'checkbox',
        rules: 'boolean'
    },
    {
        name: 'smsChannel',
        label: 'SMS',
        type: 'checkbox',
        rules: 'boolean'
    },
    {
        name: 'voiceChannel',
        label: 'מענה קולי',
        type: 'checkbox',
        rules: 'boolean'
    },
    {
        name: 'americanExpress',
        label: 'נא לעדכן את הסכמותיי הנ”ל גם לכרטיס/י מסוג',
        type: 'checkbox',
        rules: 'boolean|accepted',
        options: {
            validateOnChange: true
        }
    }

];


export default class ExecutionBenefitUiState {
    constructor(apiGateway) {

        let sendUserInfo = this._sendUserInfo;

        const hooks = {
            onSubmit(form) {
                // alert('Form is submitted! YES!');
                sendUserInfo();
            },
            onSuccess(form) {
                // get field values
                console.log('Form Values!', form.values());
            },
            onError(form) {
                alert('Form has errors!');
                // get all form errors
                console.log('All form errors', form.errors());
            }
        };

        this.form = new MobxReactForm({fields}, {plugins, hooks});
        this._apiGateway = apiGateway;
    }

    @observable showModal = false;

    @action.bound
    closeImageModal() {
        this.showModal = false;
    }

    @action.bound
    async _sendUserInfo() {
        try {
            await this._apiGateway.sendUserInfo(this.form.values());
        }
        catch(error) {
            console.error(`Failed to send contact info. error: ${error}`, error);
        }
    }

    @action
    _onSuccess() {
        this.showModal = true;
        console.log('values:', this.form.values());
    }
}
