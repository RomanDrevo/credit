import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Col, Grid, Row } from "react-bootstrap";
import styles from "./Benefit.module.scss";
import BenefitGrid from "../common/benefit-grid/BenefitGrid";
import HorizontalList from "../common/horizontal-list/HorizontalList";
import Footer from "../home/components/footer/Footer";
import FooterDesktop from "../common/footerdesktop/FooterDesktop";
import RatingStars from "./RatingStars";
import RatingPoints from "./RatingPoints";
import Business from "./Business";
import BenefitHeader from "./BenefitHeader";
import RedemptionAddresses from "./RedemptionAddresses";
import SectionCollapse from "./SectionCollapse";
import CustomerReviews from "./CustomerReviews";
import moment from "moment";
import ActionButton from "../../components/common/actionbutton/ActionButton";
import BenefitBottomBar from "./BenefitBottomBar";
import BenefitHeaderBar from "./BenefitHeaderBar";
import Page from "../common/page/Page";
import ResponsiveComponent from "../../framework/components/ResponsiveComponent";
import locationIcon from "../../assets/images/locaion-icon.svg";
import arrowLeft from "../../assets/images/arrow_left.svg";
import CreditCardList from "../benefit-redemption/CreditCardList";
import * as numeral from 'numeral';


class ExpirationTimer extends Component {
    state = {
        remainingDuration: moment.duration(0)
    };

    componentDidMount() {
        this._interval = setInterval(() => this._recalcRemainingDuration(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const { remainingDuration } = this.state;
        return <div>
            <span>{this._formatDigits(remainingDuration.days())}</span>:
            <span>{this._formatDigits(remainingDuration.hours())}</span>:
            <span>{this._formatDigits(remainingDuration.minutes())}</span>:
            <span>{this._formatDigits(remainingDuration.seconds())}</span>
        </div>
    }

    _formatDigits(value) {
        return numeral(value).format('00');
    }

    _recalcRemainingDuration() {
        const { expireAt } = this.props;
        const delta = expireAt - new Date();
        this.setState({ remainingDuration: moment.duration(delta > 0 ? delta : 0) });
    }
}

class PurchasedBenefitControls extends Component {

    render() {

        const { benefit } = this.props;

        return (
            <div className="benefit-controls-wrapper">
                <div className="py2 flex justify-center">
                    <span className="expired ml2">תוקף ההטבה</span>
                    <div className="mr2 px1">
                        <ExpirationTimer expireAt={benefit.expireAt}/>
                    </div>
                </div>

                <div className="flex justify-around purchased-buttons-wrapper">
                    <ActionButton>שלח קוד הטבה</ActionButton>
                    <ActionButton>בטל הטבה</ActionButton>
                </div>
            </div>

        )
    }
}

const BenefitDetails = ({ benefit }) => (
    <div className="flex flex-auto py2">

        <div className="col-4 border-left">
            {benefit.premiumPoints}
            <h1>פרמיום</h1>
        </div>

        <div className="col-4 border-left">
            {benefit.viewersCount}
            <h1>צופים</h1>
        </div>

        <div className="col-4">
            <ExpirationTimer expireAt={benefit.expireAt}/>
            <h1 className="h5">לסיום ההטבה</h1>
        </div>
    </div>
);


@withRouter
@inject('singleBenefitStore', 'creditCardTypesStore')
@observer
export default class Benefit extends ResponsiveComponent {
    componentDidMount() {
        const {singleBenefitStore, match, creditCardTypesStore} = this.props;
        const {benefitId} = match.params;
        singleBenefitStore.loadBenefit(benefitId);
        creditCardTypesStore.loadCreditCardTypes();
    }

    state = {
        isGoingToPurchase: false,
        quantity: 0
    }

    _onPurchaseBenefitStep1() {
        this.setState({isGoingToPurchase: !this.state.isGoingToPurchase})
    }

    _addQuantity() {
        const benefit = this.props.singleBenefitStore.displayedBenefit;
        if (this.state.quantity < benefit.maxQuantity) {
            const quantity = this.state.quantity + 1;
            this.setState({quantity})
        }
    }

    _reduceQuantity() {
        if (this.state.quantity > 0) {
            const quantity = this.state.quantity - 1;
            this.setState({quantity})
        }
    }


    renderDesktop() {
        const {singleBenefitStore, creditCardTypesStore} = this.props;
        const {quantity, isGoingToPurchase} = this.state;
        let benefit = singleBenefitStore.displayedBenefit;
        if (!benefit) {
            return <div>Loading</div>;
        }

        return (
            <Page className={styles['benefit-desktop']} customBottomBar={null}>
                <Grid className={`desktop pt5`}>
                    <Row className="flex">
                        <Col xs={6}>
                            <div className="benefits-desktop-cover-img mb5"
                                 style={{ backgroundImage: `url(${benefit.coverImg})` }} />

                            <div className={`flex flex-column benefit-description mb5`}>
                                <p className="size-and-weight">כרטיסים החל מ- {benefit.price}</p>
                                <p>{benefit.description}</p>
                            </div>

                            <div className="mb5">
                                <p className="p-size-color">לקוחות מספרים</p>
                                <div className={`flex flex-column benefit-review-wrapper`}>
                                    <div className="flex">
                                        <RatingStars ratingPoints={this._calcReviewsAvg(benefit.reviews)}/> <p
                                        className="pr2 bold h5">{this._calcReviewsAvg(benefit.reviews)}</p>
                                    </div>
                                    {
                                        benefit.reviews.map((review) => {
                                            return (<div className="review-content" key={review.customerName}>
                                                <div className="flex justify-between">
                                                    <p className="benefit-review-label">{review.label}</p>
                                                    <span>{moment(review.created).format("MMMM, DD, YYYY")}</span>
                                                </div>
                                                <RatingStars className="individual-benefit-rating"
                                                             ratingPoints={review.rating}/>
                                                <p className="py1">{review.reviewText}</p>
                                                <p>הביקורת ניתנה על ידי - {review.customerName}</p>
                                            </div>);
                                        })
                                    }
                                    <p className="items-center mx-auto semibold pt3 mb0">הצג עוד ביקורות</p>
                                </div>
                            </div>

                            <div className="mb5">
                                <p className="p-size-color">איפה מממשים</p>
                                <div className={`flex flex-column redemption-address-wrapper`}>
                                    {
                                        benefit.redemptionAddresses.map((redemptionAddress) => {
                                            return (<div key={redemptionAddress.address}
                                                         className="flex redemption-address-content">
                                                <div className="ml2"><img alt="location" className="location-icon"
                                                                          src={locationIcon}/></div>
                                                <div className="col-5 flex-auto">{redemptionAddress.address}</div>
                                                <div className="col-3 bold">{!redemptionAddress.isOpen && 'סגור'}</div>
                                                <div className="col-2">{redemptionAddress.distanceKm} ק"מ</div>
                                                <div className="col-2 h5 pr1"><a className="google-nav" href="">
                                                    נווט<img
                                                    alt="arrow-left" className="arrow-left" src={arrowLeft}/></a></div>
                                            </div>);
                                        })
                                    }
                                </div>
                            </div>

                            <div className="mb5">
                                <p className="p-size-color">בית העסק</p>
                                <div className="business-details-wrapper">
                                    <h1 className="bold">{benefit.business.name}</h1>

                                    <div className="contact semibold py4 flex justify-between">
                                        <div className="flex flex-column size-and-weight">
                                            <p className="py3">טלפון: {benefit.business.phoneNumber} </p>
                                            <p className="py3">שרות
                                                לקוחות: {benefit.business.customerServicePhoneNumber} </p>
                                        </div>
                                        <div className="col-2 flex items-center justify-center">
                                            <img alt="logo" className="img-responsive" src={benefit.storeLogoImg}/>
                                        </div>
                                    </div>

                                    <h1 className="h4 flex items-center"><a className="pl1"
                                                                            href={benefit.business.siteUrl}>לאתר
                                        החברה</a><img
                                        alt="arrow-left" className="arrow-left" src={arrowLeft}/></h1>
                                </div>
                            </div>

                            <div className="mb5">
                                <p className="p-size-color">תנאים משפטיים</p>
                                <div className="terms-and-conditions-wrapper">
                                    <p>{benefit.termsAndConditions}</p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={6}>
                            <div className="flex flex-column benefit-general-info">
                                <p className="benefit-name-font-size pb4">{benefit.name}</p>
                                <div className="div-border-bottom flex justify-between">
                                    <div className="flex flex-column">
                                        <div className="flex flex-column mb3">
                                            <p className="text-title mb0">תוקף ההטבה</p>
                                            <span>{moment(benefit.expireAt).format("DD/MM/YY")}</span>
                                        </div>
                                        <div className="flex flex-column">
                                            <p className="text-title mb0">צופים</p>
                                            <span>{benefit.viewersCount}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={benefit.storeLogoImg} alt="חנות לוגו"
                                             className="store-logo"/>
                                    </div>
                                </div>
                                { isGoingToPurchase ? <div className="purchase-benefit-process">
                                                         <div
                                                             className="flex-auto flex justify-between items-center quantity py6">
                                                             <span className="semibold">כמות</span>
                                                             <div className="flex items-center justify-center">
                                                                 <img
                                                                     alt=""
                                                                     src={require('../../assets/images/Plus-desktop.svg')}
                                                                     onClick={() => this._addQuantity()}
                                                                     className="icon-plus cursor-pointer"
                                                                 />
                                                                 <span className="px4">{quantity}</span>
                                                                 <img
                                                                     alt=""
                                                                     src={require('../../assets/images/Minus-desktop.svg')}
                                                                     onClick={() => this._reduceQuantity()}
                                                                     className="icon-minus cursor-pointer"
                                                                 />
                                                             </div>
                                                         </div>
                                                         <div className="credit-card-swiper py5">
                                                             <CreditCardList
                                                                 cardTypes={creditCardTypesStore.creditCardTypes}
                                                                 cards={[
                                                                     {
                                                                         id: 1,
                                                                         type: "life_style",
                                                                         expirationDate: '23/04',
                                                                         lastDigits: '1234',
                                                                         isCardValidForBenefit: false
                                                                     },
                                                                     {
                                                                         id: 2,
                                                                         type: "visa",
                                                                         expirationDate: '21/02',
                                                                         lastDigits: '4321',
                                                                         isCardValidForBenefit: true
                                                                     },
                                                                     {
                                                                         id: 3,
                                                                         type: "mastercard",
                                                                         expirationDate: '17/01',
                                                                         lastDigits: '6487',
                                                                         isCardValidForBenefit: true
                                                                     }
                                                                 ]}
                                                             />
                                                         </div>
                                                         <div className="flex flex-column pt5">
                                                             <div className="flex justify-between cost">
                                                                 <span>עלות</span>
                                                                 <span>{benefit.price} שח</span>
                                                             </div>
                                                             <div className="flex justify-between total">
                                                                 <span>סה”כ</span>
                                                                 <span>{benefit.price * quantity} שח</span>
                                                             </div>
                                                         </div>
                                                         <div className="pt3">
                                                             <ActionButton className="action-button-desktop"
                                                                           onClick={() => this._onPurchaseBenefitStep1()}>לרכישת
                                                                 הטבה</ActionButton>
                                                         </div>

                                                     </div> :
                                  <div className="pt5">
                                      <ActionButton className="action-button-desktop"
                                                    onClick={() => this._onPurchaseBenefitStep1()}>לרכישת
                                          הטבה</ActionButton>
                                      <div className="flex justify-center mt4">
                                          <img src={require('../../assets/images/Facebook.svg')} alt="לב"/>
                                          <img src={require('../../assets/images/Favorites1.svg')} className="px5"
                                               alt="לב"/>
                                          <img src={require('../../assets/images/email.svg')} alt="לב"/>
                                      </div>
                                  </div>}
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="my5">
                            <Row className="p-size-color">הטבות נוספות שיעניינו אותך</Row>
                            <Row className="suggested-benefits-wrapper">
                                <HorizontalList items={benefit.suggestedBenefits}/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }


    _calcReviewsAvg(reviews) {
        let total = 0;
        for (let i = 0; i < reviews.length; i++) {
            total += reviews[i].rating;
        }
        return total / reviews.length;
    }


    renderMobile() {
        const { singleBenefitStore } = this.props;
        let benefit = singleBenefitStore.displayedBenefit;

        if (!benefit) {
            return <div>Loading</div>;
        }

        return (
            <Page className={styles['benefit-mobile']} customHeader={<BenefitHeaderBar benefitName={benefit.name}/>}
                  customBottomBar={ !benefit.wasPurchased && <BenefitBottomBar benefit={benefit}/> }>
                <Grid className={`mobile flex flex-column`}>
                    <Row>
                        <BenefitHeader benefit={benefit}/>

                        <Col xs={12} className="benefit-name flex justify-center items-center py3">
                            <h1 className="text-center px6">{benefit.name}</h1>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs={12} className="benefit-details">

                            {
                                benefit.wasPurchased ?
                                <PurchasedBenefitControls benefit={benefit}/> :
                                <BenefitDetails benefit={benefit}/>
                            }


                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="benefit-description pt5">
                            <p className="benefit-description">
                                {benefit.description}
                            </p>
                        </Col>
                    </Row>

                    {benefit.wasPurchased &&
                     <Row>
                         <Col xs={12} className="">
                             <SectionCollapse className="mt2" headerText="איך מממשים">
                                 <div>{benefit.howToRedeem}</div>
                             </SectionCollapse>
                         </Col>
                     </Row>
                    }


                    <Row>
                        <Col xs={12}>
                            <SectionCollapse headerText="איפה מממשים">
                                <RedemptionAddresses addresses={benefit.redemptionAddresses}/>
                            </SectionCollapse>
                        </Col>
                    </Row>

                    {!benefit.wasPurchased &&
                     <Row>
                         <Col xs={12}>
                             <SectionCollapse headerText="לקוחות מספרים" ratingPoints={<RatingPoints ratingPoints={2}/>}
                                              ratingStars={<RatingStars ratingPoints={2}/>}>
                                 <div className="">
                                     <CustomerReviews benefit={benefit}/>
                                 </div>
                             </SectionCollapse>
                         </Col>
                     </Row>

                    }


                    <Row>
                        <Col xs={12}>
                            <SectionCollapse headerText="בית העסק">
                                <Business benefit={benefit}/>
                            </SectionCollapse>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <SectionCollapse headerText="תנאים משפטיים">
                                {benefit.termsAndConditions}
                            </SectionCollapse>
                        </Col>
                    </Row>

                    {!benefit.wasPurchased &&
                     <Row>
                         <Col xs={12}>
                             <div className="flex flex-wrap">
                                 <div className="col-12 pt4 pb2">
                                     <h1 className="h5 bold">הטבות נוספות שיעניינו אותך:</h1>
                                 </div>
                                 <Row>
                                     <BenefitGrid
                                         benefits={benefit.suggestedBenefits}
                                         onFavoriteToggled={(id) => console.log(id)}
                                     />
                                 </Row>
                             </div>
                         </Col>
                     </Row>
                    }

                    <Row>
                        <Footer benefitFooter={"footer"}/>
                    </Row>
                </Grid>
            </Page>
        );
    }
}

