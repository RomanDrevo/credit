import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import HorizontalList from '../common/horizontal-list/HorizontalList'
import {withRouter} from "react-router-dom";
import {inject, observer} from 'mobx-react';
import Page from "../common/page/Page";
import BenefitHeaderBar from "../benefit/BenefitHeaderBar";

@withRouter
@inject('benefitsStore', 'executionBenefitUiState', 'singleBenefitStore')
@observer
export default class Coupon extends Component {
    componentDidMount() {
        this.props.benefitsStore.loadSuggestedBenefits();
    }

    state = {};

    render() {
        const {fullName, benefitsStore, singleBenefitStore} = this.props;
        return (
            <Page customHeader={<BenefitHeaderBar benefitName={singleBenefitStore.displayedBenefit.name}/>}>
                <Grid className="coupon-section">
                    <Row>
                        <Col xs={12}>
                            <h1 className="bold text-center my6">שלום, {fullName}<br/>
                                קוד הקופון שלך הוא:</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center mt2 mb2">{singleBenefitStore.couponCode}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p className="text-center mt6 mb2 description">
                                יש לגשת לקופות הראשיות באיזור
                                של האולם הראשי, להביא את הקוד שנשלח אליך
                                בהודעה ישירות לקופאים בכדי לקבל את ההנחה
                            </p>
                        </Col>
                    </Row>
                    <Row className="mt6 suggested-benefits">
                        <HorizontalList
                            items={benefitsStore.suggestedBenefits}
                            title="הטבות נוספות שיעניינו אותך:"
                            showAll={false}
                        />
                    </Row>
                </Grid>
            </Page>
        );
    }
}
