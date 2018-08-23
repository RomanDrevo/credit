import React from 'react';
import questionMark from '../../assets/images/question-mark.png';
import ResponsiveComponent from "../../framework/components/ResponsiveComponent";

export default class CreditCardItem extends ResponsiveComponent {
    renderCommon(blocks) {
        return blocks.creditCard
    }

    desktopContext() {
        const {cardId, imageUrl, lastFourDigits, cardProvider, expirationDate, selectCard, isCardValidForBenefit} = this.props;
        return {
            creditCard: <div
                className="credit-card bold pt3 pr3 position-relative"
                onClick={() => {
                    isCardValidForBenefit && selectCard(cardId)
                }}>
                <div className="card-provider-details flex pb1 justify-center">
                    <div className="pl1">{lastFourDigits} {cardProvider()}</div>
                    <div>תוקף {expirationDate}</div>
                </div>
                <div style={{backgroundImage: `url(${imageUrl()})`}} className={`credit-card-image  position-relative`}>
                    {!isCardValidForBenefit && <div className="no-card-opacity"/>}
                    <div>
                        {!isCardValidForBenefit &&
                         <p className="text-center bold">לא ניתן לממש <br/> הטבות בכרטיס זה</p>}
                        {!isCardValidForBenefit && <img alt="" className={['question-mark']} src={questionMark}/>}
                    </div>
                </div>
            </div>
        }
    }

    mobileContext() {
        const {cardId, imageUrl, lastFourDigits, cardProvider, expirationDate, isChecked, selectCard, isCardValidForBenefit} = this.props;
        return {
            creditCard: <div
                className="credit-card bold pt3 pr3 position-relative"
                onClick={() => {
                    isCardValidForBenefit && selectCard(cardId)
                }}>
                <div className="card-provider-details">
                    <div className="mt4">{lastFourDigits} {cardProvider()}</div>
                    <div>תוקף {expirationDate}</div>
                </div>
                <div style={{backgroundImage: `url(${imageUrl()})`}} className={`credit-card-image  position-relative`}>
                    {!isCardValidForBenefit && <div className="no-card-opacity"/>}
                    <div>
                        {!isCardValidForBenefit &&
                         <p className="text-center bold">לא ניתן לממש <br/> הטבות בכרטיס זה</p>}
                        {!isCardValidForBenefit && <img alt="" className={['question-mark']} src={questionMark}/>}
                    </div>
                </div>
                {isChecked ?
                 <img className="check-icon" alt="" src={require('../../assets/images/check.svg')}/> : ''}

                <div className="card-provider-details">
                    <div className="mt4">{lastFourDigits} {cardProvider()}</div>
                    <div>תוקף {expirationDate}</div>
                </div>
            </div>
        }
    }
}
