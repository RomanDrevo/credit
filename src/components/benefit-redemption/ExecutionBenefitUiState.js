import {action, observable} from 'mobx';
import _ from 'lodash';

export default class ExecutionBenefitUiState {

    @observable selectedCardId = null;
    @observable cardChange = null;
    @observable showModal = false;
    
    @action
    changeSelection(cardId) {
        this.selectedCardId = cardId;
    }

    @action.bound
    resetModal() {
        this.selectedCardId = null;
        this.showModal = false;
    }

    @action.bound
    resetSelection() {
        this.selectedCardId = null;
    }

    @action.bound
    getLastFourDigits(cards) {
        const cardsList = cards.cards;
        const cardObj = _.find(cardsList, card => {
            return card.id === this.selectedCardId
        });
        return cardObj ? cardObj.lastDigits : '';
    }

    @action.bound
    getTotal(price, quantity) {
        return price * quantity;
    }

    @action.bound
    close() {
        this.showModal = false;
    }

    @action.bound
    open() {
        this.showModal = true;
    }

}
