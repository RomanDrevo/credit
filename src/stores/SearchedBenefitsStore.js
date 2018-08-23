import {action, observable, runInAction} from 'mobx';

const SEARCHES_TO_KEEP = 10;
const LAST_SEARCH_CUTOFF_DAYS = 14;

export default class SearchedBenefitsStore {

    @observable isSearching = false;
    @observable loadBenefitsError = null;

    @observable displayedBenefits = [];

    @observable lastStoredBenefits = [];

    @observable hotBenefits = [];

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }


    @action
    async loadHotBenefits() {
        this.isSearching = true;

        try {
            const hotBenefits = await this._apiGateway.fetchHotBenefits();

            runInAction(() => this.hotBenefits = hotBenefits);

        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isSearching = false);
        }
    }

    @action
    async loadSearchedBenefits(keyword) {
        this.isSearching = true;

        try {
            const searchedBenefits = await this._apiGateway.searchedBenefits(keyword);

            runInAction(() => this.displayedBenefits = searchedBenefits.filter(x => x.name.indexOf(keyword) !== -1));

        }
        catch (error) {
            console.error(`Failed to load benefits. error: ${error}`, error);
            runInAction(() => this.loadBenefitsError = error);
        }
        finally {
            runInAction(() => this.isSearching = false);
        }
    }

    getLastSearches() {
        let storedSearches = (localStorage.lastSearches && JSON.parse(localStorage.lastSearches)) || [];

        let cutOff = new Date();
        cutOff.setDate(cutOff.getDate() - LAST_SEARCH_CUTOFF_DAYS);

        return storedSearches.map(x => ({...x,  date : new Date(x.date)}))
                             .filter(x => x.date > cutOff);
    }

    @action
    storeLastSearch(searchResult) {
        const storedSearches = this.getLastSearches();

        if (storedSearches.length) {
            const termAlreadyExists = storedSearches.map(x => x.name).indexOf(searchResult.name) !== -1;

            if (termAlreadyExists) {
                return;
            }
        }

        // add date
        searchResult = {
            url: "/benefits/" + searchResult.id,
            name: searchResult.name,
            date: new Date()
        };
        storedSearches.push(searchResult);

        localStorage.lastSearches = JSON.stringify(storedSearches.slice(0, SEARCHES_TO_KEEP));
        console.log("last searches", localStorage.lastSearches)
    }



    @action
    clearSearchResults(){
        this.displayedBenefits = [];
    }
}
