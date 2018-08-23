import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import styles from './Search.module.scss';
import HorizontalList from "../common/horizontal-list/HorizontalList";
import NoResultsIcon from '../../assets/images/search-icon-no-results.svg';
import FooterDesktop from "../common/footerdesktop/FooterDesktop";
import Page from "../common/page/Page";
import QS from 'query-string';

// class SearchedBenefitDetails extends Component {
//
//
//
//     render() {
//         let {searchedBenefit, history, searchUiState} = this.props;
//
//         let SearchLine = this.constructSearchResultLine(searchedBenefit.name);
//
//         return (
//             <li onClick={() => {
//                 history.push("/benefits/" + searchedBenefit.id);
//                 searchUiState.toggleIsSearching()
//             }} className="last-search">
//                 <a><SearchLine/></a>
//             </li>
//         )
//     }
//
// }
//
// const StoredSearches = ({history, searchUiState, storedSearch}) => (
//     <li className="last-search" onClick={() => {
//         history.push(storedSearch.url);
//         searchUiState.toggleIsSearching()
//     }}>
//         <a>{storedSearch.name}</a>
//     </li>
// );


class NoResult extends Component {

    render() {
        const {hotBenefits} = this.props;
        return (
            <div className="no-results text-center flex flex-column items-center">
                <img alt="no results" className="magnifying-glass-desktop" src={NoResultsIcon}/>
                <p className="bold no-result-title">אין תוצאות</p>
                <p className="no-result-text">בוא לראות את מה שיש לנו להציע לך</p>


                <HorizontalList items={hotBenefits} title="החמים ביותר"/>

            </div>
        )
    }
}

// class HotBenefits extends Component {
//     render() {
//         const {hotBenefit, history, searchUiState} = this.props;
//
//         return (
//             <div className="last-search" onClick={() => {
//                 history.push("/benefits/" + hotBenefit.id);
//                 searchUiState.closeShowSearchPage()
//             }}>
//                 xxxx
//             </div>
//
//
//         )
//     }
//
// }

// class SearchSuggestions extends Component {
//     render() {
//         const {lastSearchedBenefits, hotBenefits, history, searchUiState} = this.props;
//
//         return (
//             <div className="last-searches desktop text-center">
//                 {
//                     !lastSearchedBenefits.length ? null :
//                     <ul className="p0">
//                         <li className="bold bigger mb2">חיפושים אחרונים:</li>
//                         {lastSearchedBenefits.map((storedSearch, index) => <StoredSearches key={index}
//                                                                                            history={history}
//                                                                                            searchUiState={searchUiState}
//                                                                                            storedSearch={storedSearch}/>)}
//                     </ul>
//                 }
//
//                 {
//                     !hotBenefits.length ? null :
//                     <HorizontalList items={hotBenefits} title="החמים ביותר"/>
//                 }
//
//             </div>
//         )
//     }
//
// }
//
// class SearchResults extends Component {
//     render() {
//
//         const {searchedBenefits, searchedBenefitsStore, history, searchUiState} = this.props;
//
//         return (
//             <div className="last-searches text-center">
//                 <ul className="p0">
//                     <li className="bold bigger mb2">תוצאות חיפוש:</li>
//                     {searchedBenefits.map((item, index) => <SearchedBenefitDetails key={index}
//                                                                                    history={history}
//                                                                                    searchUiState={searchUiState}
//                                                                                    searchedBenefitsStore={searchedBenefitsStore}
//                                                                                    searchedBenefit={item}/>)}
//                 </ul>
//             </div>
//         )
//     }
//
// }

@withRouter
@inject('searchedBenefitsStore', 'searchUiState')
@observer
class DesktopSearch extends Component {

    componentDidMount() {
        const {searchedBenefitsStore, searchUiState, location} = this.props;
        searchedBenefitsStore.loadHotBenefits();

        const parsed = QS.parse(location.search);

        const keyword = parsed.query;

        searchUiState.setKeyword(keyword);
    }

    render() {

        const {searchedBenefitsStore, searchUiState} = this.props;

        const searchedBenefits = searchedBenefitsStore.displayedBenefits;
        // const lastSearchedBenefits = searchedBenefitsStore.getLastSearches();
        const hotBenefits = searchedBenefitsStore.hotBenefits;



        return (
            <Page>
                <div className={`${styles.desktopSearch} desktop-search-wrapper flex flex-column justify-between`}>
                    <Grid className="">

                        <Row>
                            <Col xs={12}>
                                <div className="keyword py3 mb5">{searchUiState.keyword}</div>
                            </Col>
                        </Row>

                        <Row>

                            <Col xs={12}>
                                {
                                    searchedBenefits.length ?
                                        <HorizontalList items={searchedBenefits} />

                                        :

                                        <NoResult hotBenefits={hotBenefits}/>

                                }
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </Page>
        )
    }
}

export default DesktopSearch;
