import {observable, action } from 'mobx';

export default class PersonalUiState {
    @observable isImplementedBenefitsModalVisible = false;
    @observable isBenefitsLeftThisMonthModalVisible = false;
    @observable isPremiumBenefitsModalVisible = false;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }


    @action.bound
    open(modal) {
        this[`${modal}`] = true;
    }


    @action.bound
    close(modal) {
        this[`${modal}`] = false;
    }
}
