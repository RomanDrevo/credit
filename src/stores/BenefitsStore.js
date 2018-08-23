import {action, observable, runInAction} from 'mobx';

export default class BenefitsStore {
    @observable benefits = [];
    @observable suggestedBenefits = [];
    @observable mostViewedBenefits = [];
    @observable popularBenefits = [];
    @observable featuredBenefits = [];
    @observable isLoadingBenefits = false;
    @observable loadBenefitsError = null;

    constructor(apiGateway, myFavoriteStore) {
        this._apiGateway = apiGateway;
        this._myFavoriteStore = myFavoriteStore
    }


    @action.bound
    async toggleFavorite(benefit) {
        try {
            if (benefit.isFavorite) {
                await  this._apiGateway.removeFavorite(benefit.id);
                await this._myFavoriteStore.removeFavorite(benefit.id)
            }
            else {
                await this._apiGateway.addFavorite(benefit.id)
            }
            runInAction(() => benefit.isFavorite = !benefit.isFavorite);

        }
        catch (error) {
            console.error(`Failed to toggle isFavorite. error: ${error}`, error);
        }
    }

    @action
    async loadBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchFeaturedBenefits();
            runInAction(() => this.benefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }


    @action
    async loadSuggestedBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchSuggestedBenefits();
            runInAction(() => this.suggestedBenefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }

    @action
    async loadMostViewedBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchMostViewedBenefits();
            runInAction(() => this.mostViewedBenefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }

    @action
    async loadPopularBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchPopularBenefits();
            runInAction(() => this.popularBenefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }

    @action
    async loadFeaturedBenefits() {
        this.isLoadingBenefits = true;

        try {
            const benefits = await this._apiGateway.fetchFeaturedBenefits();
            runInAction(() => this.featuredBenefits = benefits);
        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isLoadingBenefits = false);
        }
    }

}
