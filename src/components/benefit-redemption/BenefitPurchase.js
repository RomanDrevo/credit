import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import AmountDetailsCalculator from "./AmountDetailsCalculator";
import CreditCardList from "./CreditCardList";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import ActionButton from "../common/actionbutton/ActionButton";
import SimpleModal from "../common/modal/SimpleModal";
import BenefitHeaderBar from "../benefit/BenefitHeaderBar";
import Page from "../common/page/Page";
import {MODAL_TYPE} from "../common/modal/ModalManagerUiState";

const cards = {
    cards: [
        {id: 1, type: "life_style", expirationDate: '23/04', lastDigits: '1234'},
        {id: 2, type: "visa", expirationDate: '21/02', lastDigits: '4321'},
        {id: 3, type: "mastercard", expirationDate: '17/01', lastDigits: '6487'}
    ]
};

@withRouter
@inject('singleBenefitStore', 'creditCardTypesStore', 'executionBenefitUiState', 'modalManagerUiState')
@observer
export default class BenefitExecution extends Component {
    state = {
        quantity: 0
    };

    componentDidMount() {
        const {singleBenefitStore, match, creditCardTypesStore} = this.props;
        const {benefitId} = match.params;
        singleBenefitStore.loadBenefit(benefitId);
        creditCardTypesStore.loadCreditCardTypes();
    }

    addQuantity() {
        const benefit = this.props.singleBenefitStore.displayedBenefit;
        if (this.state.quantity < benefit.maxQuantity) {
            const quantity = this.state.quantity + 1;
            this.setState({quantity})
        }
    }

    reduceQuantity() {
        if (this.state.quantity > 0) {
            const quantity = this.state.quantity - 1;
            this.setState({quantity})
        }
    }

    disabledParameters() {
        const {executionBenefitUiState} = this.props;
        return !executionBenefitUiState.selectedCardId || this.state.quantity === 0;
    }

    render() {
        const {singleBenefitStore, executionBenefitUiState, creditCardTypesStore, finishPurchase, match} = this.props;
        const {benefitId} = match.params;
        const benefit = singleBenefitStore.displayedBenefit;
        if (!benefit || creditCardTypesStore.creditCardTypes.length === 0) {
            return <div>Loading</div>;
        }

        const userLastDigits = executionBenefitUiState.getLastFourDigits(cards);
        return (
            <Page customBottomBar={null} customHeader={<BenefitHeaderBar benefitName={benefit.name}/>}>
                <Grid>
                    <Row className="header text-center">
                        <Col xs={12}>
                            <div className="flex justify-center">
                                <h1 className="mt4 bold pb5 mb7">{benefit.name}</h1>
                            </div>
                            <AmountDetailsCalculator
                                price={benefit.price}
                                maxQuantity={benefit.maxQuantity}
                                quantity={this.state.quantity}
                                reduceQuantity={this.reduceQuantity.bind(this)}
                                addQuantity={this.addQuantity.bind(this)}
                            />

                        </Col>
                    </Row>
                    <Row>
                        <div className="mt5">
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
                    </Row>
                    <Row>
                        <Col xs={12} className="flex justify-center my5">
                            {!executionBenefitUiState.selectedCardId &&
                             <label className="error bolder">*לא נבחר כרטיס</label>}
                            <ActionButton
                                disabled={this.disabledParameters()}
                                className="submit-benefit"
                                onClick={() => this._openSuccessMessage(benefitId)}
                            >אישור</ActionButton>
                        </Col>
                    </Row>

                </Grid>
            </Page>
        );
    }

    _openSuccessMessage(benefitId) {
        const {modalManagerUiState, executionBenefitUiState, singleBenefitStore, finishPurchase}= this.props;
        const benefit = singleBenefitStore.displayedBenefit;
        const userLastDigits = executionBenefitUiState.getLastFourDigits(cards);

        modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
            onHide: () => modalManagerUiState.closeCurrentModal(),
            onClick: () => {
                finishPurchase();
                executionBenefitUiState.resetModal();
                modalManagerUiState.closeCurrentModal()
                singleBenefitStore.redeemBenefit(this.state.quantity, benefitId);
            },
            sendText: 'אישור',
            bodyText: <p>
                {"האם אתה מאשר רכישה של"}
                <br/>
                {benefit.name}
                <br/>
                {`בכרטיס שמספרו ${userLastDigits}`}
                <br/>
                {`בעלות של ${executionBenefitUiState.getTotal(benefit.price, this.state.quantity)} שח`}
            </p>
        });
    }
}
