import { action, observable, runInAction } from 'mobx';

export default class CategoryBenefitsStore {
    @observable categoryBenefits = [];
    @observable isLoadingCategoryBenefits = false;
    @observable loadCategoryBenefitsError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadCategoryBenefits(categoryId) {
        this.isLoadingCategoryBenefits = true;

        try {
            const categoryBenefits = await this._apiGateway.fetchCategoryBenefits(categoryId);
            runInAction(() => this.categoryBenefits = categoryBenefits);
        }
        catch (error) {
            console.error(`Failed to load categoryBenefits. error: ${error}`, error);
            runInAction(() => this.loadCategoryBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingCategoryBenefits = false);
        }
    }
}
