import { action, observable, runInAction } from 'mobx';

export default class BusinessesStore {
    @observable businesses = [];
    @observable businessesDesktop = [];
    @observable isLoadingBusinesses = false;
    @observable loadBusinessesError = null;

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadBusinesses() {
        this.isLoadingBusinesses = true;

        try {
            const businesses = await this._apiGateway.fetchBusinesses();
            runInAction(() => this.businesses = businesses);
        }
        catch (error) {
            console.error(`Failed to load companies. error: ${error}`, error);
            runInAction(() => this.loadBusinessesError = error);
        }
        finally {
            runInAction(() => this.isLoadingBusinesses = false);
        }
    }

    @action
    async loadBusinessesForDesktop() {
        this.isLoadingBusinesses = true;

        try {
            const businesses = await this._apiGateway.fetchBusinesses();
            runInAction(() => this.businessesDesktop = businesses.slice(0, 5));

        }
        catch (error) {
            console.error(`Failed to load companies. error: ${error}`, error);
            runInAction(() => this.loadBusinessesError = error);
        }
        finally {
            runInAction(() => this.isLoadingBusinesses = false);
        }
    }


}
