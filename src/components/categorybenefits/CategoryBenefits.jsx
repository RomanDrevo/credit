import React from "react";
import {inject, observer} from "mobx-react";
import {withRouter, Link} from "react-router-dom";
import {Button, Col, Grid, Row} from "react-bootstrap";
import Categories from "../home/components/categories/Categories";
import Footer from "../home/components/footer/Footer";
import styles from "./CategoryBenefits.module.scss";
import BenefitGrid from "../common/benefit-grid/BenefitGrid";
import Page from "../common/page/Page";
import * as _ from "lodash";
import ResponsiveComponent from "../../framework/components/ResponsiveComponent";


const Filters = () => {
    return (
        <div className="flex justify-center filters-wrapper">
            <Button bsStyle="link" className="margin-left">באיזור שלך</Button>
            |
            <Button bsStyle="link" className="margin-x">החמים ביותר</Button>
            |
            <Button bsStyle="link" className="margin-right">עומדים להסתיים</Button>
        </div>
    );
};


@withRouter
@inject('categoryBenefitsUiState', 'categoryBenefitsStore', 'categoriesStore')
@observer
export default class CategoryBenefits extends ResponsiveComponent {
    componentWillMount() {
        const {categoryBenefitsUiState, match} = this.props;
        const {categoryId} = match.params;
        categoryBenefitsUiState.loadBenefits(categoryId);
    }


    renderDesktop() {
        const {categoryBenefitsStore, categoriesStore, match} = this.props;

        const {categoryId} = match.params;
        const categories = categoriesStore.categories;
        const category = _.find(categories, (category) => category.id === parseInt(categoryId));

        if (!category) {
            return <div>Loading...</div>;
        }

        return (
            <Page title={category.name} className={`${styles['category-benefits-wrapper-desktop']}`}>
                <Row>
                    <Col xs={12} className="image-and-title-container">
                        <img className="img-responsive" src={require("../../assets/images/top-image-1.jpg")} alt=""
                             width="100%"/>
                        <div className="container">
                            <h1 className="category-title bold">{category.name}</h1>
                        </div>

                    </Col>
                </Row>
                <Grid>
                    <Row className="mt5 mb4 flex flex-wrap">
                        <Col xs={3} className="categories-links-container">
                            <ul>
                                <li className="title">קטגוריות:</li>
                                {categoriesStore.categories.map(x => <Link key={x.id} to={`/category-benefits/${x.id}`}>
                                    <li className={x.id === category.id ? "active-link" : ""}>{x.name}</li>
                                </Link>)}
                            </ul>

                            <ul>
                                <li className="title">סנן לפי:</li>
                                <li><input type="checkbox" name="popluar" value="popular"/> החמים ביותר</li>
                                <li><input type="checkbox" name="almostEnded" value="almostEnded"/> עומדים להסתיים
                                </li>
                            </ul>
                        </Col>

                        <Col xs={9}>
                            <BenefitGrid benefits={categoryBenefitsStore.categoryBenefits}/>
                        </Col>
                    </Row>
                </Grid>


                <Row>
                    <Footer/>
                </Row>
            </Page>
        );
    }

    renderMobile() {
        const {categoryBenefitsStore, categoriesStore, match} = this.props;

        const {categoryId} = match.params;
        const categories = categoriesStore.categories;
        const category = _.find(categories, (category) => category.id === parseInt(categoryId));

        if (!category) {
            return <div>Loading...</div>;
        }

        return (
            <Page title={category.name} className={`${styles['category-benefits-wrapper-mobile']}`}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Categories categories={categoriesStore.categories}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Filters/>
                        </Col>
                    </Row>

                    <Row className="margin-b">
                        <BenefitGrid benefits={categoryBenefitsStore.categoryBenefits}/>
                    </Row>

                    <Row>
                        <Footer/>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
