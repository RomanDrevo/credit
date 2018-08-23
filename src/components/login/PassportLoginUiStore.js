import {action} from 'mobx';
import PassportFormSchema from './PassportFormSchema';

export default class PassportLoginUiStore {
    constructor(authStore) {
        this._authStore = authStore;
        this.form = new PassportFormSchema(this._onSuccess.bind(this));
    }

    @action.bound
    onSubmit(e) {
        this.form.onSubmit(e);
    }

    @action
    _onSuccess() {
        this._authStore.login(this.form.values());
    }
}
