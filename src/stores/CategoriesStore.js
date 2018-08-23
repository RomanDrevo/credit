import { action, observable, runInAction } from 'mobx';

export default class CategoriesStore {
    @observable categories = [];
    @observable isLoadingCategories = false;
    @observable loadCategoriesError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadCategories() {
        this.isLoadingCategories = true;

        try {
            const categories = await this._apiGateway.fetchCategories();
            runInAction(() => this.categories = categories);
        }
        catch (error) {
            console.error(`Failed to load categories. error: ${error}`, error);
            runInAction(() => this.loadCategoriesError = error);
        }
        finally {
            runInAction(() => this.isLoadingCategories = false);
        }
    }
}
