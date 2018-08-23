import {observable, action } from 'mobx';
import * as _ from "lodash";

export default class SearchUiState {
    @observable keyword = '';

    @observable isSearching = false;

    @observable isSearchingDesktop = false;


    @observable showSearchPage = false;

    @observable showDesktopSearchPage = false;

    constructor({searchedBenefitsStore}){
        this._searchedBenefitsStore = searchedBenefitsStore;
        this._debouncedItemSearch = _.debounce((keyword) => this._itemSearch(keyword), 500);
    }

    @action.bound
    toggleIsSearching(){
        this.isSearching = !this.isSearching;
        this._searchedBenefitsStore.clearSearchResults();
        this.keyword = '';
    }


    @action.bound
    setKeyword(keyword){
        this.keyword = keyword;
        this._debouncedItemSearch(keyword);
    }

    _itemSearch(keyword) {
        this._searchedBenefitsStore.loadSearchedBenefits(keyword);
    }

    @action.bound
    closeShowSearchPage(){
        this.isSearching = false;
        this._searchedBenefitsStore.clearSearchResults();
        this.keyword = '';
    }

    @action.bound
    openShowSearchPage(){
        this.isSearching = true;
        this._searchedBenefitsStore.clearSearchResults();
        this.keyword = '';
    }

    @action.bound
    closeDesktopSearchPage(){
        this.isSearchingDesktop = false;
        this._searchedBenefitsStore.clearSearchResults();
        this.keyword = '';
    }

    @action.bound
    openDesktopSearchPage(){
        this.isSearchingDesktop = true;
        this._searchedBenefitsStore.clearSearchResults();
        this.keyword = '';
    }

}
