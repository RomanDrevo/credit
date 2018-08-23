import React, {Component} from "react";
import {Row, Grid} from "react-bootstrap";
import BenefitGrid from "../common/benefit-grid/BenefitGrid";
import Page from "../common/page/Page";
import styles from "./FeaturedBenefit.module.scss";
import classnames from "classnames";
import {inject} from "mobx-react";
//import InfiniteScroll from "react-infinite-scroller";


@inject('benefitsStore')
export default class FeaturedBenefits extends Component {

    render() {
        const {benefits, title} = this.props;

        let benefitsArr = [];
        if (!benefits) {
            benefitsArr = this.props.benefitsStore.loadSuggestedBenefits();
        }

        return (
            <Page tite={title} className={classnames(styles['featured-benefits-page-wrapper'])}>
                <Grid>
                    <Row>
                        {/*<InfiniteScroll pageStart={0}*/}
                                        {/*loadMore={() => this._loadMoreBenefits()}*/}
                                        {/*hasMore={true}*/}
                                        {/*loader={<div className="loader">Loading ...</div>}*/}
                                        {/*threshold={250}*/}
                                        {/*useWindow={true}>*/}
                            {/*<BenefitGrid*/}
                                {/*benefits={benefits || benefitsArr}*/}
                                {/*onFavoriteToggled={(id) => console.log(id)}*/}
                            {/*/>*/}
                        {/*</InfiniteScroll>*/}

                        <BenefitGrid
                            benefits={benefits || benefitsArr}
                            onFavoriteToggled={(id) => console.log(id)}
                        />

                    </Row>
                </Grid>
            </Page>

        );
    }

    _loadMoreBenefits() {
        console.log('got here');
    }
}
