import React from "react";
import styles from "./ContactUs.module.scss";
import {Col, Grid, Row} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import {withRouter, Link} from "react-router-dom";
import ContactUsForm from "./ContactUsForm";
import Page from "../common/page/Page";
import ResponsiveComponent from "../../framework/components/ResponsiveComponent";
import speechBubble from '../../assets/images/speech-bubble.svg';
import DesktopSidebar from "../common/desktop-sidebar/DesktopSidebar";

@withRouter
@inject('contactUsUiStore', 'modalManagerUiState')
@observer
export default class ContactUs extends ResponsiveComponent {
    componentWillMount() {
        const {contactUsUiStore} = this.props;
        contactUsUiStore.onSubmitDekstop();
    }
    renderDesktop() {
        const {contactUsUiStore, match} = this.props;

        return (
            <Page title='צור קשר'>
                <Grid className={styles['contact-us-desktop']}>
                    <Row className="mt5 wrapper">
                        <Col xs={3}>
                            <ul className="links-container">
                                <Link to="/faq">
                                    <li className={match.path === "/faq" ? "active-link" : ""}>שאלות נפוצות</li>
                                </Link>
                                <a>
                                    <li>תקנון</li>
                                </a>
                                <Link to="/contact-us" >
                                    <li className={match.path === "/contact-us" ? "active-link" : ""}>צור קשר</li>
                                </Link>
                            </ul>
                        </Col>
                        {
                            !contactUsUiStore.showSuccessMessageDesktop  && <Col xs={6} className="form-container">
                                <div className="text-center">
                                    <h1 className="title semibold">נשמח לשמוע ממך!</h1>
                                    <img alt=""
                                         src={speechBubble}/>
                                </div>

                                <ContactUsForm/>
                            </Col>
                        }

                        {
                            contactUsUiStore.showSuccessMessageDesktop &&
                            <Col xs={6} className="success-message semibold text-center">
                                <img alt=""
                                     src={require('../../assets/images/sms-ico.png')}/>
                                <p>הפניה נשלחה בהצלחה!</p>
                            </Col>
                        }
                    </Row>
                </Grid>
            </Page>
        );
    }

    renderMobile() {

        return (
            <Page title='צור קשר'>
                <Grid className={styles['contact-us-mobile']}>
                    <Row className="header">
                        <Col xs={12} className="text-center">
                            <h1 className="title mt5">נשמח לשמוע ממך!</h1>
                            <div className="mt5"><img alt=""
                                                      src={require('../../assets/images/blue-phone-icon.svg')}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="form-section">
                            <ContactUsForm/>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
