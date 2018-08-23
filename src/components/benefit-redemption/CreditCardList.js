import React, {Component} from 'react';
import CreditCardItem from './CreditCardItem'
import {withRouter} from "react-router-dom";
import {inject, observer} from 'mobx-react';
import _ from 'lodash';

@withRouter
@inject('executionBenefitUiState')
@observer
export default class CreditCardList extends Component {
    onSelectCard(index, cardId) {
        const {executionBenefitUiState, cards} = this.props;
        this.listScrollRef.scrollLeft = (this.listScrollRef.scrollWidth / cards.length) * (cards.length - (index + 1 ));
        executionBenefitUiState.changeSelection(cardId)
    }

    getImageUrl(cardTypeName) {
        const {cardTypes} = this.props;
        const cardType = _.find(cardTypes, card => card.type === cardTypeName);

        return cardType ? cardType.imageUrl :
               'https://s3.amazonaws.com/files.enjin.com/382770/modules/forum/attachments/sad-pepe-640x480_1476065332.jpg';
    }

    getProviderName(cardTypeName) {
        const {cardTypes} = this.props;
        const Provider =  _.find(cardTypes, card =>  card.type === cardTypeName);
        return Provider ? Provider.name : 'אין שם'
    }

    render() {
        const {executionBenefitUiState, cards} = this.props;
        return (
            <div className="cards-list text-center">
                <h2 className="semibold">יש לבחור כרטיס אשראי</h2>
                <div className="flex overflow-scroll-x padding-fix" ref={(ref) => this.listScrollRef = ref}>
                    {cards.map((creditCard, index) =>
                        <CreditCardItem
                            imageUrl={this.getImageUrl.bind(this, creditCard.type)}
                            lastFourDigits={creditCard.lastDigits}
                            cardProvider={this.getProviderName.bind(this, creditCard.type)}
                            expirationDate={creditCard.expirationDate}
                            cardId={creditCard.id}
                            isChecked={creditCard.id === executionBenefitUiState.selectedCardId}
                            selectCard={this.onSelectCard.bind(this, index)}
                            key={creditCard.id}
                            isCardValidForBenefit={creditCard.isCardValidForBenefit}
                        />
                    )}
                </div>
            </div>
        );
    }
}
