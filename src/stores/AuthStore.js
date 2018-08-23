import {action, observable, runInAction} from 'mobx';

export default class AuthStore {
    @observable user = [];

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action.bound
    async login(values) {
        try {
             await this._apiGateway.login(values);
        }
        catch (error) {
            console.error(`Failed to login. error: ${error}`, error);
        }
    }

    @action.bound
    async fetchUser() {
        try {
            const resp = await this._apiGateway.fetchUser();
            runInAction(() => this.user = resp);
        }
        catch (error) {
            console.error(`Failed to fetch user. error: ${error}`, error);
        }
    }
}
