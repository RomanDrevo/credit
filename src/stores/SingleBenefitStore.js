import {action, observable, runInAction} from 'mobx';

export default class SingleBenefitStore {

    @observable isLoadingBenefit = false;
    @observable loadBenefitsError = null;

    @observable displayedBenefit = null;
    @observable couponCode = '';


    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadBenefit(benefitId) {
        this.isLoadingBenefit = true;

        try {
            const benefit = await this._apiGateway.fetchBenefit(benefitId);
            runInAction(() => this.displayedBenefit = benefit);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefit = false);
        }
    }

    @action.bound
    async redeemBenefit(quantity, benefitId) {
        try {
            const couponCode = await this._apiGateway.redeemBenefit(quantity, 1, benefitId);
            // TODO
            this.handleCoupon(couponCode)
        }
        catch (error) {
            console.error(`Failed to send contact info. error: ${error}`, error);
        }
    }

    @action.bound
    handleCoupon(coupon){
        this.couponCode = coupon
    }
}
