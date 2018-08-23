import React, {Component} from 'react';
import {Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import styles from './Login.module.scss';
import IDForm from './IDForm';
import PassportForm from './PassportForm';
import Page from "../common/page/Page";
import LoginMan from '../../assets/images/login-man.png'

const LoginTabs = {
    ID: "ID",
    PASSPORT: "PASSPORT"
};

export default class Login extends Component {
    state = {
        activeTab: LoginTabs.ID
    };

    render() {
        return (
            <Page title="התחברות">
                <Grid className={styles.login}>
                    <Row className="header">
                        <Col xs={12} className="text-center">
                            <div className="mt5"><img alt="" src={LoginMan}/></div>
                            <h1 className="title mt5 semibold">התחברות</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="form-section">
                            <Tabs defaultActiveKey={this.state.activeTab}
                                  onSelect={(key) => this.setState({activeTab: key})}
                                  id="controlled-tab" className="ignores-grid-margins">
                                <Tab eventKey={LoginTabs.ID} title="תעודת זהות"><IDForm/></Tab>
                                <Tab eventKey={LoginTabs.PASSPORT} title="דרכון"><PassportForm/></Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }
}
