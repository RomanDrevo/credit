import React, { Component } from 'react';
import styles from './Businesses.module.scss';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router-dom";
import { Col, Grid, Row } from 'react-bootstrap';
import BusinessBox from '../../components/common/business-box/BusinessBox'
import Categories from '../home/components/categories/Categories';
import Page from "../common/page/Page";

@withRouter
@inject('businessesStore', 'categoriesStore')
@observer
export default class Companies extends Component {
    componentDidMount() {
        const { businessesStore, categoriesStore } = this.props;
        businessesStore.loadBusinesses();
        categoriesStore.loadCategories();
    }

    render() {
        const { businessesStore, categoriesStore } = this.props;
        const { businesses } = businessesStore;

        if (!businesses) {
            return <div>Loading</div>;
        }

        return (
            <Page title='חברות'>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Categories categories={categoriesStore.categories}/>
                        </Col>
                    </Row>
                </Grid>

                <div className={`${styles.businesses} mt1 flex flex-wrap`}>
                    {businesses.map((business) =>
                        <div className="item mt2" key={business.id}>
                            <BusinessBox business={business}/>
                        </div>
                    )}
                </div>
            </Page>

        );
    }
}
