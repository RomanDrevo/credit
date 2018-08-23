import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Col, Grid, Row, Tab, Tabs} from "react-bootstrap";
import styles from "./Personal.module.scss";
import ActionButton from "../../components/common/actionbutton/ActionButton";
import FavoriteIcon from "../../components/common/favoriteicon/FavoriteIcon";
import EditIcon from "../../assets/images/edit-icon.svg";
import moment from "moment";
import Page from "../common/page/Page";
import PersonalStats from "./PersonalStats";
import ResponsiveComponent from '../../framework/components/ResponsiveComponent';
import Faq from "../faq/Faq";
import Title from "../common/horizontal-list/Title";


const GreetingText = {
    REDEEMED: () => <span className="greetings-text">היי ישראל, אלה ההטבות שמימשת  <br/> מקווים שנהנת!</span>,
    NOT_REDEEMED: () => <span className="greetings-text"> היי ישראל, מהר לנצל את ההטבות <br/> לפני שיפוג תוקפם!</span>,
    DEFAULT: () => <div className="default-greetings-text flex justify-between items-center">
        <div className="flex flex-column line-height-3">
            <span className="semibold font-size-17">שלום ישראל ישראלי</span>
            <span className="normal-weight">איך ניתן לעזור לך היום?</span>
        </div>
        <a className="update-personal-details semibold"><img src={EditIcon} alt="עריכה"
                                                             className="personal-details-edit-button ml1"/>עדכון
            פרטים</a>
    </div>,
};

class Greeting extends Component {
    render() {

        const GreetingTextComponent = GreetingText["DEFAULT"];
        return <div className="text-center">
            <h1 className="h5 semibold"><GreetingTextComponent/></h1>
        </div>
    }
}

@withRouter
@inject('benefitsStore')
@observer
class PersonalBenefit extends Component {
    render() {

        let {singleBenefit, benefitsStore} = this.props;

        return (
            <div
                className="flex my-benefits-wrapper mb2">
                <div className="col-6">
                    <div
                        style={{backgroundImage: `url(${singleBenefit.coverImg})`}}
                        className="benefit-cover-img">
                        <FavoriteIcon
                            isFavorite={singleBenefit.isFavorite}
                            className={'is-favorite'}
                            onFavoriteToggled={() => benefitsStore.toggleFavorite(singleBenefit)}
                        />
                    </div>
                </div>
                <div className="col-6 flex flex-column">
                    <img alt="logo"
                         className="store-logo-wrapper py1 block mx-auto"
                         src={singleBenefit.storeLogoImg}/>

                    <div className="mb2 px1 text-center flex-auto">
                        {singleBenefit.name}
                    </div>

                    <div className="mb2 flex items-center justify-center">
                        {!singleBenefit.isRedeemed ?
                         <div className="actions flex justify-around items-center">
                             <a href="" className="restore-or-remove-button pr1">שחזור/ביטול</a>
                             <ActionButton className="benefit-details-button">לפרטים</ActionButton>
                         </div> :
                         <div className="purchase-date semibold mb1"> תאריך
                             רכישה: {moment(singleBenefit.redemptionDate).format("DD.MM.YYYY")}</div>}
                    </div>
                </div>
            </div>
        )
    }
}


const PersonalTabs = {
    NOT_REDEEMED: "NOT_REDEEMED",
    REDEEMED: "REDEEMED"
};

@withRouter
@inject('myBenefitsStore', 'personalUiState', 'authStore', 'faqStore')
@observer
export default class Personal extends ResponsiveComponent {

    state = {
        activeTab: PersonalTabs.NOT_REDEEMED
    };


    componentWillMount() {
        const {myBenefitsStore, authStore} = this.props;

        myBenefitsStore.loadBenefits();
        authStore.fetchUser();
    }


    renderDesktop() {

        return (
            <Page>
                <Grid className={styles.personal}>
                    <Row>
                        <Col xsOffset={1} xs={7} className="desktop-personal-wrapper mt5">
                            <Col xs={12}>
                                <Title title="שאלות נפוצות" />
                            </Col>
                            <Faq/>
                        </Col>
                    </Row>

                    {/*<Row>*/}
                        {/*<Col xsOffset={1} xs={7} className="desktop-personal-wrapper mt5">*/}
                            {/*<Col xs={12}>*/}
                                {/*<Title title="תקנון" />*/}
                            {/*</Col>*/}

                        {/*</Col>*/}
                    щ{/*</Row>*/}

                </Grid>
            </Page>
        )
    }

    renderMobile() {

        const {myBenefitsStore, authStore} = this.props;
        let benefits = myBenefitsStore.displayedBenefits;


        // console.log("-+-", benefits);

        if (!benefits) {
            return <div>Loading</div>;
        }

        const filteredBenefits = this.state.activeTab === PersonalTabs.NOT_REDEEMED ?
                                 benefits.filter(x => !x.isRedeemed) :
                                 benefits.filter(x => x.isRedeemed);


        return (
            <Page title="איזור אישי">
                <Grid className={styles.personal}>
                    <Row>
                        <Col xs={12}>
                            <Greeting/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="my-benefits-stats-wrapper">
                            <PersonalStats user={authStore.user[0]}/>
                        </Col>
                    </Row>

                    <Tabs activeKey={this.state.activeTab} onSelect={(key) => this.setState({activeTab: key})}
                          id="controlled-tab" className="ignores-grid-margins">
                        <Tab eventKey={PersonalTabs.NOT_REDEEMED} title="הטבות שלא מומשו"/>
                        <Tab eventKey={PersonalTabs.REDEEMED} title="הטבות שמומשו"/>
                    </Tabs>

                    <Row>
                        <Col xs={12}>
                            {filteredBenefits.map((singleBenefit, index) => <PersonalBenefit
                                singleBenefit={singleBenefit}
                                key={index}/>)}
                        </Col>
                    </Row>


                </Grid>
            </Page>
        );
    }
}
