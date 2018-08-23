import BaseForm from '../../framework/forms/BaseForm';
export default class IDFormSchema extends BaseForm {
    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    label: 'מספר תעודת זהות',
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
