import {observable, action } from 'mobx';

export default class CategoryBenefitsUiState {
    @observable errorMessage = "";

    constructor({categoryBenefitsStore}) {
        this._categoryBenefitsStore = categoryBenefitsStore
    }

    @action.bound
    loadBenefits(categoryId) {
        this._categoryBenefitsStore.loadCategoryBenefits(categoryId);
    }
}
