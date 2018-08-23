// import BaseForm from '../../framework/forms/BaseForm';
// import moment from "moment";
// export default class RegistrationFormSchema extends BaseForm {
//     setup() {
//         return {
//             fields: [
//                 {
//                     name: 'foreign-pass-num',
//                     label: 'מספר דרכון',
//                     rules: 'required'
//                 },
//                 {
//                     name: 'credit-last-digits',
//                     label: 'ספרות אחרונות של כרטיס אשראי',
//                     rules: 'required|digits:6'
//                 },
//                 {
//                     name: 'email',
//                     label: 'אימייל',
//                     rules: 'required|email'
//                 },
//                 {
//                     name: 'tel',
//                     label: 'טלפון',
//                     rules: ['required', 'regex:/^(\\()?0?(5[02-9])(\\))?-?\\d{7}$/'],
//                 },
//                 {
//                     name: 'bank-account',
//                     label: 'חשבון בנק',
//                     rules: 'required|integer',
//                 },
//                 {
//                     name: 'birthday',
//                     label: 'תאריך לידה',
//                     value: moment().format(),
//                     options: {validateOnChange:true}
//                 }
//             ]
//         };
//     }
// }
