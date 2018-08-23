import React, {Component} from 'react';
import {Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import styles from './Registration.module.scss';
import IDRegistrationForm from './IDRegistrationForm';
import PassportRegistrationForm from './PassportRegistrationForm';
import Page from "../common/page/Page";
import LoginMan from '../../assets/images/login-man.png'



export const PassportTabs = {
    ISRAEL_PASSPORT: "ISRAEL_PASSPORT",
    FOREIGN_PASSPORT: "FOREIGN_PASSPORT"
};

class Registration extends Component {


    state = {
        activeTab: PassportTabs.ISRAEL_PASSPORT
    };

    render() {
        return (

            <Page title="הרשמה">
                <Grid className={styles.registration}>

                    <Row className="user-icon-wrapper">
                        <Col xs={12} className="text-center">
                            <div className="mt5"><img alt="" src={LoginMan}/></div>
                            <h1 className="title mt5 semibold">התחברות</h1>
                        </Col>
                    </Row>

                    <Tabs activeKey={this.state.activeTab} onSelect={(key) => this.setState({activeTab: key})}
                          id="controlled-tab" className="ignores-grid-margins">
                        <Tab eventKey={PassportTabs.ISRAEL_PASSPORT} title="תעודת זהות"/>
                        <Tab eventKey={PassportTabs.FOREIGN_PASSPORT} title="דרכון"/>
                    </Tabs>

                    <Row>
                        <Col xs={12}>
                            {
                                this.state.activeTab === PassportTabs.ISRAEL_PASSPORT ?
                                <IDRegistrationForm/> :
                                <PassportRegistrationForm/>
                            }

                        </Col>
                    </Row>
                </Grid>
            </Page>
        )
    }
}

export default Registration;
