import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {inject, observer} from 'mobx-react';
import styles from './Favorites.module.scss';
import BenefitGrid from '../common/benefit-grid/BenefitGrid';
import Page from "../common/page/Page";

@withRouter
@inject('myFavoriteStore')
@observer
export default class Favorites extends Component {
    componentDidMount() {
        const {myFavoriteStore} = this.props;
        myFavoriteStore.loadBenefits();
    }

    render() {
        const {myFavoriteStore} = this.props;
        const benefits = myFavoriteStore.displayedBenefits;
        if (!benefits) {
            return <div>Loading...</div>
        }

        return (
            <Page title="מועדפים">
                <Grid className={styles.favorites}>
                    <Row>
                        <BenefitGrid
                            benefits={benefits}
                            onClick={() => myFavoriteStore.removeFavorite()}
                        />
                    </Row>
                </Grid>
            </Page>
        );
    }
}
