import {action, observable, runInAction} from 'mobx';

export default class MyBenefitsStore {

    @observable isLoadingBenefits = false;
    @observable loadBenefitsError = null;

    @observable displayedBenefits = [];

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchMyBenefits();

            runInAction(() => this.displayedBenefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }
}
