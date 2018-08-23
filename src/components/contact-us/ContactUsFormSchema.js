import BaseForm from '../../framework/forms/BaseForm';
export default class ContactUsFormSchema extends BaseForm {
    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'שם מלא',
                    rules: 'required|string',
                },
                {
                    name: 'email',
                    label: 'דוא"ל',
                    rules: 'required|email',
                },
                {
                    name: 'tel',
                    label: 'טלפון',
                    rules: ['required', 'regex:/^(\\()?0?(5[02-9])(\\))?-?\\d{7}$/'],
                },
                {
                    name: 'message',
                    placeholder: 'תוכן הפניה',
                    label: 'תוכן פניה',
                    rules: 'required',
                    options: {
                        validateOnChange: true
                    }
                }
            ],
        };
    }
}
