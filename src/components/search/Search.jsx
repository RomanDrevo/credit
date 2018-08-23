import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import styles from './Search.module.scss';
import {withRouter} from "react-router-dom";
import {inject, observer} from 'mobx-react';
import NoResultsIcon from '../../assets/images/search-icon-no-results.svg';
import ActionButton from '../../components/common/actionbutton/ActionButton';




class SearchedBenefitDetails extends Component {


    constructSearchResultLine(result) {

        let {searchUiState} = this.props;

        let keyword = searchUiState.keyword;

        let element = () => <span>{result}</span>;
        const queryIndex = result.toLowerCase().indexOf(keyword);

        if (queryIndex !== -1) {
            const before = result.substring(0, queryIndex);
            const foundQueryString = result.substring(queryIndex, queryIndex + keyword.length);
            const after = result.substring(queryIndex + keyword.length, result.length);
            element = ()=> <span>{before}<strong>{foundQueryString}</strong>{after}</span>;
        }

        return element;
    }


    render(){

        let {searchedBenefit, history, searchUiState} = this.props;

        let SearchLine = this.constructSearchResultLine(searchedBenefit.name);

        return(
            <li onClick={() => {
                history.push("/benefits/" + searchedBenefit.id);
                searchUiState.toggleIsSearching()
            }} className="last-search">
                <a><SearchLine /></a>
            </li>
        )
    }
}

const StoredSearches = ({history, searchUiState, storedSearch}) => (
    <li className="last-search" onClick={() => {
        history.push(storedSearch.url);
        searchUiState.toggleIsSearching()
    }}>
        <a>{storedSearch.name}</a>
    </li>
);


class NoResult extends Component{

    render(){
        return(
            <div className="no-results text-center flex flex-column items-center">
                <img alt="no results" className="cactus-img" src={NoResultsIcon}/>
                <p className="bold big">אין תוצאות</p>
                <p>בוא לראות את מה שיש לנו להציע לך</p>
                <ActionButton className="hot-benefits-button mt5">החמים ביותר</ActionButton>
            </div>
        )
    }
}

class HotBenefits extends Component{

    render(){
        const {hotBenefit, history, searchUiState} = this.props;

        return(
            <li className="last-search" onClick={() => {
                history.push("/benefits/" + hotBenefit.id);
                searchUiState.toggleIsSearching()
            }}>
                <a href={hotBenefit.url}>{hotBenefit.name}</a>
            </li>
        )
    }
}

class SearchSuggestions extends Component{

    render(){
        const {lastSearchedBenefits, hotBenefits, history, searchUiState} = this.props;
        return(
            <div className="last-searches text-center">
                {
                    !lastSearchedBenefits.length ? null :
                    <ul className="p0">
                        <li className="bold bigger mb2">חיפושים אחרונים:</li>
                        {lastSearchedBenefits.map((storedSearch, index) => <StoredSearches key={index}
                                                                                           history={history}
                                                                                           searchUiState={searchUiState}
                                                                                           storedSearch={storedSearch}/>)}
                    </ul>
                }

                {
                    !hotBenefits.length ? null :
                    <ul className="p0">
                        <li className="bold bigger mb2">החמות ביותר:</li>
                        {hotBenefits.map((hotBenefit, index) => <HotBenefits key={index}
                                                                             history={history}
                                                                             searchUiState={searchUiState}
                                                                             hotBenefit={hotBenefit}/>)}
                    </ul>
                }

            </div>
        )
    }
}

class SearchResults extends Component{

    render(){

        const {searchedBenefits, searchedBenefitsStore, history, searchUiState} = this.props;

        return(
            <div className="last-searches text-center">
                <ul className="p0">
                    <li className="bold bigger mb2">תוצאות חיפוש:</li>
                    {searchedBenefits.map((item, index) => <SearchedBenefitDetails key={index}
                                                                                   history={history}
                                                                                   searchUiState={searchUiState}
                                                                                   searchedBenefitsStore={searchedBenefitsStore}
                                                                                   searchedBenefit={item}/>)}
                </ul>
            </div>
        )
    }
}

@withRouter
@inject('searchedBenefitsStore', 'searchUiState')
@observer
class Search extends Component {
    componentDidMount() {
        const {searchedBenefitsStore} = this.props;
        searchedBenefitsStore.loadHotBenefits();
    }

    render() {
        const {searchedBenefitsStore, searchUiState, history} = this.props;

        const searchedBenefits = searchedBenefitsStore.displayedBenefits;
        const lastSearchedBenefits = searchedBenefitsStore.getLastSearches();
        const hotBenefits = searchedBenefitsStore.hotBenefits;
        const keyword = searchUiState.keyword;

        return (
            <div className={styles.search}>
                <Grid className="pt4">
                    <Row>
                        <Col xs={12}>
                            {
                                keyword.length > 0 ?
                                (
                                    searchedBenefits.length ?
                                    <SearchResults searchedBenefits={searchedBenefits}
                                                   searchedBenefitsStore={searchedBenefitsStore}
                                                   searchUiState={searchUiState}
                                                   history={history}
                                    /> :
                                    <NoResult />
                                ) :
                                <SearchSuggestions lastSearchedBenefits={lastSearchedBenefits}
                                                   hotBenefits={hotBenefits}
                                                   history={history}
                                                   searchUiState={searchUiState}
                                />
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }


}

export default Search;
