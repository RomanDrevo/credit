import {action, observable, runInAction} from 'mobx';

export default class SingleBusinessStore {

    @observable isLoadingBusiness = false;
    @observable loadBusinessError = null;

    @observable displayedBusiness = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadBusiness(businessId) {
        this.isLoadingBusiness = true;

        try {
            const business = await this._apiGateway.fetchBusiness(businessId);

            runInAction(() => this.displayedBusiness = business);
        }
        catch (error) {
            console.error(`Failed to load business. error: ${error}`, error);
            runInAction(() => this.loadBusinessError = error);
        }
        finally {
            runInAction(() => this.isLoadingBusiness = false);
        }
    }
}
