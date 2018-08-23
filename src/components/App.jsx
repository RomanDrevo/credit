import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import styles from "./App.module.scss";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Home from "./home/Home";
import Personal from "./personal/Personal";
import Benefit from "./benefit/Benefit";
import FeaturedBenefits from "./featuredbenefits/FeaturedBenefits";
import Faq from "./faq/Faq";
import ContactUs from "./contact-us/ContactUs";
import BenefitRedemption from "./benefit-redemption/BenefitRedemption";
import Business from "./business/Business";
import Companies from "./businesses/Businesses";
import Favorites from "./favorites/Favorites";
import CategoryBenefits from "./categorybenefits/CategoryBenefits";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import ModalManager from "./common/modal/ModalManager";
import Tos from "./TOS/Tos";
import DesktopSearch from "./search/DesktopSearch";


@withRouter
@inject('categoriesStore', 'benefitsStore')
@observer
export default class App extends Component {
    componentDidMount() {
        // things that used everywhere
        this.props.categoriesStore.loadCategories();

        this.props.benefitsStore.loadSuggestedBenefits();
    }

    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/personal" component={Personal}/>
                        <Route exact path="/benefits/:benefitId" component={Benefit}/>
                        <Route exact path="/featured/benefits"
                               component={() => <FeaturedBenefits benefits={this.props.benefitsStore.suggestedBenefits}
                                                                  title="מותאם בשבילך"/>}/>
                        <Route exact path="/faq" component={Faq}/>
                        <Route exact path="/contact-us" component={ContactUs}/>
                        <Route exact path="/redeem/:benefitId" component={BenefitRedemption}/>
                        <Route exact path="/businesses/:businessId" component={Business}/>
                        <Route exact path="/businesses" component={Companies}/>
                        <Route exact path="/favorites" component={Favorites}/>
                        <Route exact path="/category-benefits/:categoryId" component={() => <CategoryBenefits/>}/>
                        <Route exact path="/registration" component={Registration}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/tos" component={Tos}/>
                        <Route exact path="/search" component={DesktopSearch}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>

                <ModalManager/>
            </div>
        );
    }
}
