import {action, observable, runInAction} from 'mobx';

export default class FaqStore {
    @observable faqs = [];
    @observable isLoadingFaqs = false;
    @observable loadFaqsError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadFaqs() {
        this.isLoadingFaqs = true;

        try {
            const faqs = await this._apiGateway.fetchFaqList();

            runInAction(() => this.faqs = faqs);
        }
        catch (error) {
            console.error(`Failed to load faqs. error: ${error}`, error);
            runInAction(() => this.loadFaqsError = error);
        }
        finally {
            runInAction(() => this.isLoadingFaqs = false);
        }
    }
}

