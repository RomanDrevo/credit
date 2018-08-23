import {observable, action } from 'mobx';

export default class HomeUiState {
    @observable helloMessage = 'בוקר טוב ישראל ישראלי';
    @observable errorMessage = "";

    constructor({benefitsStore, promotionsStore}) {
        this._benefitsStore = benefitsStore;
        this._promotionsStore = promotionsStore;
    }

    @action.bound
    initialize() {
        this._benefitsStore.loadBenefits();
        this._benefitsStore.loadSuggestedBenefits();
        this._benefitsStore.loadMostViewedBenefits();
        this._benefitsStore.loadPopularBenefits();
        this._promotionsStore.loadPromotions();
    }

}
