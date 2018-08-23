const CommonFormFields = [
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
        // rules: 'required|email'
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
        value: "2017-06-01",
        options: {validateOnChange: true}

    },
    {
        name: 'commercialInfo',
        label: 'אישור קבלת הטבות ומבצעים לפני כולם - ',
        type: 'checkbox',
        rules: 'boolean'
    },
    {
        name: 'benefitTerms',
        label: 'תקנון הטבות',
        type: 'checkbox',
        rules: 'boolean|accepted',

    },
    {
        name: 'socialBanking',
        label: 'אישור הצטרפות לקבלת מידע ולביצוע פעולות',
        type: 'checkbox',
        rules: 'boolean|accepted',
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
    }
];

export default CommonFormFields;
