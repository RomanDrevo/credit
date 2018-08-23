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
            const benefits = await this._apiGateway.fetchMyFavoriteBenefits();

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

    @action
    async removeFavorite(benefitId) {
        try {
            this.displayedBenefits = this.displayedBenefits.filter(x => x.id !== benefitId);
        }
        catch (error) {
            console.error(`Failed to delete favorite benefits. error: ${error}`, error);
        }
    }
}
