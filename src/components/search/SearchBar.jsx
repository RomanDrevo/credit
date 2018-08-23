import React from 'react';
import CloseIcon from '../../assets/images/icon_close.svg'
import ResponsiveComponent from '../../framework/components/ResponsiveComponent';
import {inject, observer} from 'mobx-react';
import styles from './SearchBar.module.scss';
import SearchIcon from "../../assets/images/search-dark.svg";
import {withRouter} from "react-router";


@withRouter
@inject('searchedBenefitsStore', 'searchUiState')
@observer
class SearchBar extends ResponsiveComponent {

    componentDidMount() {
        const {searchedBenefitsStore} = this.props;
        searchedBenefitsStore.loadHotBenefits();
    }

    // constructSearchResultLine(result) {
    //
    //     let {searchUiState} = this.props;
    //
    //     let keyword = searchUiState.keyword;
    //
    //     let element = () => <span>{result}</span>;
    //     const queryIndex = result.toLowerCase().indexOf(keyword);
    //
    //     if (queryIndex !== -1) {
    //         const before = result.substring(0, queryIndex);
    //         const foundQueryString = result.substring(queryIndex, queryIndex + keyword.length);
    //         const after = result.substring(queryIndex + keyword.length, result.length);
    //         element = ()=> <span>{before}<strong>{foundQueryString}</strong>{after}</span>;
    //     }
    //
    //     return element;
    // }

    renderDesktop() {

        const {searchedBenefitsStore, history, searchUiState} = this.props;

        // let SearchLine = this.constructSearchResultLine(searchedBenefit.name);



        return (
            <div className={`${styles.searchBar} mx1`}>
                <div className="flex items-center">
                    <img alt="search" className="search-icon" src={SearchIcon}/>

                    <input onChange={(event) => searchUiState.setKeyword(event.target.value)}
                           onClick={() => searchUiState.openDesktopSearchPage()}
                           onKeyPress={(e) => {
                               e.key === 'Enter' ? (history.push("/search?query=" + e.target.value), searchUiState.closeDesktopSearchPage()) : console.log('Nope...')
                           }}
                           className={!searchUiState.isSearchingDesktop ? "search-input form-control" : "search-input-active form-control"} id="search-input"/>
                    <div className="cursor-pointer search-clear-button" onClick={() => {
                        searchUiState.closeDesktopSearchPage();
                    }}>
                        <img alt="close-button" className="search-clear-img" src={CloseIcon}/>
                    </div>
                </div>

                {

                    searchUiState.isSearchingDesktop ?
                    ( searchUiState.keyword.length > 0 ?
                      <ul className="search-results-list">
                          {searchedBenefitsStore.displayedBenefits.map((item, index) => <li
                              onClick={() => {
                                  history.push("/benefits/" + item.id);
                                  searchUiState.closeDesktopSearchPage()
                              }}
                              className="search-item" key={index}>{item.name}</li>)}
                      </ul>

                            :

                      (
                          searchedBenefitsStore.lastStoredBenefits.length > 0 ?
                          <ul className="search-results-list">
                              {searchedBenefitsStore.lastStoredBenefits.map((item, index) => <li
                                  onClick={() => {
                                      history.push("/benefits/" + item.id);
                                      searchUiState.closeDesktopSearchPage()
                                  }}
                                  className="search-item" key={index}>{item.name}</li>)}
                          </ul>
                              :

                          <ul className="search-results-list">
                              {searchedBenefitsStore.hotBenefits.map((item, index) => <li
                                  onClick={() => {
                                      history.push("/benefits/" + item.id);
                                      searchUiState.closeDesktopSearchPage()
                                  }}
                                  className="search-item" key={index}>{item.name}</li>)}
                          </ul>
                      )


                    )


                        :

                    null

                }

            </div>
        )
    }

    renderMobile() {
        const {searchUiState} = this.props;

        return (
            <div className="btn-group has-feedback search-form-group mx1 dropdown">
                <input onChange={(event) => searchUiState.setKeyword(event.target.value)}
                       className="search-input form-control" id="search-input"/>
                <div className="cursor-pointer search-clear-button">
                    <img alt="close-button" className="search-clear-img"
                         onClick={() => {
                             searchUiState.toggleIsSearching();
                         }} src={CloseIcon}/>
                </div>
            </div>
        )
    }
}

export default SearchBar;
