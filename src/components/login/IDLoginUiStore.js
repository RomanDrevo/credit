import {action} from 'mobx';
import IDFormSchema from './IDFormSchema';

export default class IDLoginUiStore {
    constructor(authStore) {
        this._authStore = authStore;
        this.form = new IDFormSchema(this._onSuccess.bind(this));
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
