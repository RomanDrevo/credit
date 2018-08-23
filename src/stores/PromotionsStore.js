import { action, observable, runInAction } from 'mobx';

export default class PromotionsStore {
    @observable promotions = [];
    @observable isLoadingPromotions = false;
    @observable loadPromotionsError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadPromotions() {
        this.isLoadingPromotions = true;

        try {
            const promotions = await this._apiGateway.fetchPromotions();
            runInAction(() => this.promotions = promotions);
        }
        catch (error) {
            console.error(`Failed to load promotions. error: ${error}`, error);
            runInAction(() => this.loadPromotionsError = error);
        }
        finally {
            runInAction(() => this.isLoadingPromotions = false);
        }
    }
}
