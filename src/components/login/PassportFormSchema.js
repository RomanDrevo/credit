import BaseForm from '../../framework/forms/BaseForm';
export default class PassportFormSchema extends BaseForm {
    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    label: 'מספר דרכון',
                    rules: 'required|numeric',
                },
                {
                    name: 'lastDigits',
                    label: 'שש ספרות אחרונות של כרטיס האשראי',
                    rules: 'required|numeric',
                    options: {
                        validateOnChange: true
                    }
                }
            ],
        };
    }
}
