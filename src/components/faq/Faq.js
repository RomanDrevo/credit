import React, {Component} from 'react';
import {Accordion, Col, Grid, Panel, Row} from 'react-bootstrap';
import styles from './Faq.module.scss';
import {inject, observer} from 'mobx-react';
import Page from "../common/page/Page";
import FaqHeader from "./FaqHeader";
import ResponsiveComponent from '../../framework/components/ResponsiveComponent';
import DesktopSidebar from "../common/desktop-sidebar/DesktopSidebar";
import withRouter from "react-router-dom/es/withRouter";
import {Link} from "react-router-dom";


class StatsItem extends Component {
    render() {
        const {totalBenefits, imageName, title, classColorNumber} = this.props;
        return (
            <div className="flex items-center stats-item pr4 pl4">
                <div className="flex items-center ml4">
                    <img className="stat-icon ml2" alt="stat-icon" src={imageName}/>

                    <div className={`stat-number number-${classColorNumber}`}>{totalBenefits}</div>
                </div>

                <div className="flex-auto flex items-center pr2">
                    <div className="stat-title">
                        {title}
                    </div>
                </div>

            </div>
        );
    }
}

class Stats extends Component {
    render() {
        return (


            <ul className='links-container'>
                <Link to="/faq">
                    <li>
                        <StatsItem
                            totalBenefits="4"
                            classColorNumber="1"
                            imageName={require(`../../assets/images/icon-present-ceise-red.svg`)}
                            title="הטבות למימוש"
                        />
                    </li>
                </Link>
                <a>
                    <li>
                        <StatsItem
                            totalBenefits="5"
                            classColorNumber="2"
                            imageName={require(`../../assets/images/icon-paper-present-blue.svg`)}
                            title="נותרו החודש"
                        />
                    </li>
                </a>
                <Link to="/contact-us">
                    <li>
                        <StatsItem
                            totalBenefits="1"
                            classColorNumber="3"
                            imageName={require(`../../assets/images/icon-crown-purple.svg`)}
                            title="הטבות פרימיום"
                        />
                    </li>
                </Link>
            </ul>

            //
            // <div className="stats-wrapper">
            //     <StatsItem
            //         totalBenefits="4"
            //         classColorNumber="1"
            //         imageName={require(`../../assets/images/icon-present-ceise-red.svg`)}
            //         title="הטבות למימוש"
            //     />
            //
            //     <StatsItem
            //         totalBenefits="5"
            //         classColorNumber="2"
            //         imageName={require(`../../assets/images/icon-paper-present-blue.svg`)}
            //         title="נותרו החודש"
            //     />
            //
            //     <StatsItem
            //         totalBenefits="1"
            //         classColorNumber="3"
            //         imageName={require(`../../assets/images/icon-crown-purple.svg`)}
            //         title="הטבות פרימיום"
            //     />
            // </div>
        )
    }
}

@withRouter
@inject('faqStore')
@observer
export default class Faq extends ResponsiveComponent {
    state = {
        faqNumberOpened: null
    };

    componentDidMount() {
        this.props.faqStore.loadFaqs();
    }

    renderDesktop() {
        const {faqStore} = this.props;
        const {faqNumberOpened} = this.state;
        const {match} = this.props;

        return (
            <Page title={'שאלות נפוצות'} className={styles.faq}>
                <Row>
                    <Col xs={12} className="image-and-title-container">
                        <img className="img-responsive" src={require("../../assets/images/top-image-1.jpg")} alt=""
                             width="100%"/>
                        <div className="container">
                            <h1 className="category-title bold">שאלות נפוצות</h1>
                        </div>

                    </Col>
                </Row>

                <Grid className="mt4">

                    <Row>
                        <Col xs={3}>
                            <DesktopSidebar match={match}/>

                            <Stats/>

                        </Col>

                        <Col xs={7} className={styles.faq}>
                            <div className="desktop-faq-wrapper cursor-pointer">
                                <Accordion bsClass="faq-list">
                                    {faqStore.faqs.map((faq, index) =>
                                                           <Panel key={index} bsClass="answer" bsStyle={null}
                                                                  onEntered={() => this.setState({faqNumberOpened: index + 1})}
                                                                  onExited={() => this.setState({faqNumberOpened: faqNumberOpened === index + 1 ? null : faqNumberOpened})}
                                                                  expanded={faqNumberOpened === index - 1}
                                                                  header={<div><FaqHeader question={faq.question}
                                                                                          faqNumberOpened={faqNumberOpened}
                                                                                          faqNumber={index + 1}/></div>}
                                                                  eventKey={index}>
                                                               <div className={"p2 px7"}>{faq.answer}</div>
                                                           </Panel>
                                    )}
                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    }

    renderMobile() {
        const {faqStore} = this.props;
        const {faqNumberOpened} = this.state;
        console.log(faqNumberOpened);
        return (
            <Page title="שאלות נפוצות">
                <Grid className={styles.faq}>
                    <Row>
                        <Col xs={12}>
                            <Accordion bsClass="faq-list">
                                {faqStore.faqs.map((faq, index) =>
                                                       <Panel
                                                           key={index}
                                                           bsClass="answer"
                                                           bsStyle={null}
                                                           onEntered={() => this.setState({faqNumberOpened: index + 1})}
                                                           onExited={() => this.setState({faqNumberOpened: faqNumberOpened === index + 1 ? null : faqNumberOpened})}
                                                           expanded={faqNumberOpened === index - 1}
                                                           header={
                                                               <div>
                                                                   <FaqHeader
                                                                       question={faq.question}
                                                                       faqNumber={index + 1}
                                                                       faqNumberOpened={faqNumberOpened}
                                                                   />
                                                               </div>
                                                           }
                                                           eventKey={index}>
                                                           <div className={"p2"}>{faq.answer}</div>
                                                       </Panel>
                                )}
                            </Accordion>
                        </Col>
                    </Row>
                </Grid>
            </Page>
        );
    };
}
