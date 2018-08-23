import React from 'react';
import Page from "../common/page/Page";
import {Col, Grid, Row} from "react-bootstrap";
import styles from './Tos.module.scss'

const Tos = () => {
    return (
        <Page title="תקנון">
            <Grid className={styles.tos}>
                <Row>
                    <Col xs={12}>
                        <div className="white-box flex justify-center items-center">
                            <h1>פרטי התקנון</h1>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </Page>
    );
};

export default Tos;
