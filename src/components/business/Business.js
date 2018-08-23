import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import styles from './Business.module.scss';
import {Grid, Row, Col} from 'react-bootstrap';
import BenefitGrid from '../common/benefit-grid/BenefitGrid'
import Page from "../common/page/Page";

@withRouter
@inject('singleBusinessStore')
@observer
export default class Business extends Component {

    componentDidMount() {
        const {singleBusinessStore, match} = this.props;
        const {businessId} = match.params;
        singleBusinessStore.loadBusiness(businessId);
    }

    render() {
        const {singleBusinessStore} = this.props;
        const company = singleBusinessStore.displayedBusiness;
        if (!company) {
            return <div>Loading</div>;
        }
        return (
            <Page title={company.name}>
                <Grid className={styles.business}>
                    <Row>
                        <Col xs={12} className="header pt1 flex">
                            <div className="flex items-center">
                                <img alt={company.name} src={company.logo}/>
                                <h1 className="mr3">ההטבות של {company.name}</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <BenefitGrid  benefits={company.benefits}/>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
