import {action, observable, runInAction} from 'mobx';

export default class CreditCardTypesStore {
    @observable creditCardTypes = [];
    @observable isLoadingCreditCardTypes = false;
    @observable loadCreditCardTypesError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadCreditCardTypes() {
        this.isLoadingCreditCardTypes = true;

        try {
            const creditCardTypes = await this._apiGateway.fetchCreditCardTypes();
            runInAction(() => this.creditCardTypes = creditCardTypes);
        }
        catch (error) {
            console.error(`Failed to load CreditCardTypes. error: ${error}`, error);
            runInAction(() => this.loadCreditCardTypesError = error);
        }
        finally {
            runInAction(() => this.isLoadingCreditCardTypes = false);
        }
    }
}

