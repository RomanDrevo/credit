import {Form} from 'mobx-react-form';
import validatorjs from 'validatorjs';

export default class BaseForm extends Form {
    constructor(onSuccess) {
        super();
        this._onSuccess = onSuccess;
    }

    plugins() {
        return {
            dvr: {
                package: validatorjs,
                extend: ($validator) => {
                    let messages = $validator.getMessages('en');
                    messages.required = '*יש להזין :attribute';
                    messages.accepted = '*עליך לאשר :attribute';
                    messages.email = '*כתובת מייל שגויה';
                    messages.digits = '*יש להזין מספר תקין בעל 6 ספרות';
                    messages.regex = '*מספר ה:attribute שגוי';
                    messages.numeric = ':attribute חייבות להיות מספר*';
                    messages.integer = ':attribute חייבות להיות מספר*';
                    $validator.setMessages('en', messages);
                },
            }
        };
    }

    setup() {
        return {
            fields: [
                // {
                //     name: 'israPassNum',
                //     label: 'מספר תעודת זהות',
                //     rules: 'required'
                // },
                {
                    name: 'creditLastDigits',
                    label: 'ספרות אחרונות של כרטיס אשראי',
                    rules: 'required|digits:6'
                },
                {
                    name: 'email',
                    label: 'אימייל',
                    rules: 'required|email'
                },
                {
                    name: 'tel',
                    label: 'טלפון',
                    rules: ['required',]//todo: put me back 'regex:/^(\\()?0?(5[02-9])(\\))?-?\\d{7}$/'],
                },
                {
                    name: 'bankAccount',
                    label: 'חשבון בנק',
                    rules: 'required|integer'
                },
                {
                    name: 'birthday',
                    label: 'תאריך לידה',
                    type: 'date',
                    value: "2017-06-01"
                    // options: {validateOnChange: true}

                },
                {
                    name: 'commercialInfo',
                    label: 'מידע פירסומי',
                    type: 'checkbox',
                    rules: 'boolean'
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
                    label: 'בנקאות בתקשורת',
                    type: 'checkbox',
                    rules: 'boolean|accepted',
                },
                {
                    name: 'rememberMe',
                    label: 'זכור אותי',
                    type: 'checkbox',
                    rules: 'boolean'
                }
            ],
        };
    }

    hooks() {
        return {
            onSuccess: this._onSuccess,
            onError(form) {
                console.log('errors:', form.errors());
            }
        };
    }
}
