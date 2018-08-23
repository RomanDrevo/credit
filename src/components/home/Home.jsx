import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import { Col, Grid, Row } from 'react-bootstrap';
import styles from './Home.module.scss';
import Categories from './components/categories/Categories'
import Carousel from './components/carousel/Carousel';
import AuthCard from './components/auth/AuthCard';
import HorizontalList from '../common/horizontal-list/HorizontalList';
import Title from '../common/horizontal-list/Title';
import Promotion from './components/promotions/Promotion';
import Businesses from './components/businesses/Businesses';
import Footer from './components/footer/Footer';
import MyBenefitsStats from './components/my-benefits/MyBenefitsStats';
import Page from "../common/page/Page";
import ResponsiveComponent from '../../framework/components/ResponsiveComponent';
import DesktopSlider from "./components/desktop-slider/DesktopSlider";


@inject('benefitsStore')
@observer
class DesktopSuggestedBenefit extends Component {
    render() {
        const { suggestedBenefit, isFavorite, onFavoriteToggled } = this.props;

        return (
            <Link to={`/benefits/${suggestedBenefit.id}`}>
                <div className="flex suggested-benefit-wrapper mb3">
                    <div className="image-wrapper"
                         style={{ backgroundImage: `url(${suggestedBenefit.coverImg})` }}>
                        {/*<img className="" alt={suggestedBenefit.name} src={suggestedBenefit.coverImg}/>*/}
                    </div>

                    <div className="flex-auto px4">
                        <div className="benefit-name py4">{suggestedBenefit.name}</div>

                        <div className="store-logo pb2 flex items-center justify-between">
                            <img alt={suggestedBenefit.name} src={suggestedBenefit.storeLogoImg}/>

                            <img className="favorite-img"
                                 alt="favorite-icon"
                                 onClick={(e) => {
                                     e.preventDefault();
                                     onFavoriteToggled(suggestedBenefit)
                                 }}
                                 src={require(`../../assets/images/${isFavorite ? 'icon_heart_full.svg' : 'favorite.svg'}`)}/>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

class StatsItem extends Component {
    render() {
        const { totalBenefits, imageName, title, classColorNumber } = this.props;
        return (
            <div className={`flex items-center justify-between stats-item number-${classColorNumber} pr4 pl4`}>

                <img className="stat-icon" alt="stat-icon" src={imageName}/>
                <div className={`stat-number`}>{totalBenefits}</div>
                <div className="flex items-center pr2">
                    <div className="stat-title">
                        {title}
                    </div>
                    <div>
                        <img className="left-arrow" src={require("../../assets/images/arrow_left_white.svg")} alt=""/>
                    </div>
                </div>

            </div>
        );
    }
}

class Stats extends Component {
    render() {
        return (
            <div className="stats-wrapper flex justify-between">
                <StatsItem
                    totalBenefits="4"
                    classColorNumber="1"
                    imageName={require(`../../assets/images/icon-present-ceise.svg`)}
                    title="הטבות למימוש"
                />

                <StatsItem
                    totalBenefits="5"
                    classColorNumber="2"
                    imageName={require(`../../assets/images/icon-paper-present-stats.svg`)}
                    title="נותרו החודש"
                />

                <StatsItem
                    totalBenefits="1"
                    classColorNumber="3"
                    imageName={require(`../../assets/images/icon-crown.svg`)}
                    title="הטבות פרימיום"
                />
            </div>
        )
    }
}

@withRouter
@inject('homeUiState', 'categoriesStore', 'benefitsStore', 'businessesStore', 'promotionsStore', 'videoAdsStore')
@observer
export default class Home extends ResponsiveComponent {
    componentDidMount() {
        this.props.homeUiState.initialize();
    }

    componentWillMount() {
        this.props.businessesStore.loadBusinessesForDesktop();
        this.props.benefitsStore.loadFeaturedBenefits();
        this.props.videoAdsStore.loadVideoAds();
    }

    setSuggestedBenefitRef = ref => {
        console.log('--', ref);
    }

    renderDesktop() {
        const { benefitsStore, promotionsStore, businessesStore } = this.props;



        return (
            <Page>
                <DesktopSlider/>

                <Grid className={styles.home}>
                    <Stats/>

                    <Row className="mt6">
                        <Col xs={12}>
                            <Title title={"מותאם בשבילך"} showAll={true}/>
                        </Col>
                    </Row>
                    <Row className="">
                        {benefitsStore.benefits.map((x) =>
                            <Col key={x.id} md={6} sm={12}>
                                <DesktopSuggestedBenefit ref={this.setSuggestedBenefitRef} key={x.id}
                                                         onFavoriteToggled={benefitsStore.toggleFavorite}
                                                         isFavorite={x.isFavorite}
                                                         suggestedBenefit={x}/>

                            </Col>
                        )}
                    </Row>

                    <Row className="mt6">
                        <Col xs={12}>
                            <Title title={"החמים ביותר"} showAll={true}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <HorizontalList
                                items={benefitsStore.benefits}
                                title="החמים ביותר"/>
                        </Col>
                    </Row>

                    <Row className="mt6">
                        <Col xs={12}>
                            <Title title={"מוצרים"} showAll={true}/>
                        </Col>
                    </Row>

                    <Row>
                        {promotionsStore.promotions.map((promotion) => (
                            <Col xs={6} key={promotion.id}>
                                <Promotion promotion={promotion}/>
                            </Col>

                        ))}
                    </Row>

                    <Row className="mt6">
                        <Col xs={12}>
                            <Title title={"הנצפים ביותר"} showAll={true}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <HorizontalList items={benefitsStore.popularBenefits}/>
                        </Col>
                    </Row>

                    <Row className="mt6">
                        <Col xs={12}>
                            <Title title={"חברות"} showAll={true}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="flex justify-between items-center">
                            {
                                businessesStore.businessesDesktop.map(x =>
                                    <div key={x.id}
                                         className="business-desktop flex items-center justify-center">
                                        <img alt="business-logo" className="business-desktop-logo img-responsive"
                                             src={x.logo}/>
                                    </div>)
                            }
                        </Col>
                    </Row>
                </Grid>
            </Page>);
    }

    renderMobile() {
        const { homeUiState, benefitsStore, categoriesStore, promotionsStore, videoAdsStore } = this.props;

        return (
            <Page title="עמוד ההטבות של ישראכארט">
                <Grid className={styles.home}>
                    <Row>
                        <Col xs={12}>
                            <Categories categories={categoriesStore.categories}/>
                        </Col>
                    </Row>

                    <Row className="mt2 mb5">
                        <Col xs={12}>
                            <h1 className="greeting h5 text-center">{homeUiState.helloMessage}</h1>

                            {benefitsStore.benefits.length > 0 ?
                             <Carousel className="ignores-grid-margins" videoAds={videoAdsStore.videoAds}
                                       benefits={benefitsStore.benefits}/> : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <AuthCard/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="my3">
                            <MyBenefitsStats/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <HorizontalList
                                items={benefitsStore.suggestedBenefits}
                                title="מותאם בשבילך"
                                url="/featured/benefits"
                                showAll={true}
                            />
                        </Col>
                    </Row>

                    <Row className="my4">
                        <Col xs={12}>
                            <HorizontalList
                                items={benefitsStore.popularBenefits}
                                url="/benefits/popular"
                                title="החמים ביותר"
                                showAll={true}
                            />
                        </Col>
                    </Row>

                    {promotionsStore.promotions.map((promotion) => (
                        <Row className="mb4" key={promotion.id}>
                            <Col xs={12}>
                                <Promotion promotion={promotion}/>
                            </Col>
                        </Row>
                    ))}

                    <Row className="mb4">
                        <Col xs={12}>
                            <HorizontalList
                                title="הנצפים ביותר"
                                url="/benefits/most-viewed"
                                items={benefitsStore.mostViewedBenefits}
                                showAll={true}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Businesses/>
                        </Col>
                    </Row>

                    <Row>
                        <Footer/>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
