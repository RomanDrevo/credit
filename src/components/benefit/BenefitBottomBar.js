import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import favoriteIcon from "../../assets/images/favorite.svg";
import fullFavoriteIcon from "../../assets/images/icon_heart_full.svg";
import phoneIcon from "../../assets/images/phone-icon.svg";
import {MODAL_TYPE} from "../common/modal/ModalManagerUiState";
import {inject, observer} from "mobx-react";

@withRouter
@inject('modalManagerUiState', 'benefitsStore')
@observer
export default class BenefitBottomBar extends Component {
    onFavoriteClick() {
        const {modalManagerUiState, history, benefitsStore, benefit} = this.props;
        let isLoggedIn = true;
        if (isLoggedIn) {
            return benefitsStore.toggleFavorite(benefit)
        } else {
            modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => {
                    modalManagerUiState.closeCurrentModal();
                    history.push('/login');
                },
                sendText: 'התחברות',
                bodyText: 'עליך להתחבר כדי להוסיף פריט למועדפים',
            });
        }
    }

    onRedeemClick() {
        const {modalManagerUiState, history, match, benefit} = this.props;
        const {benefitId} = match.params;

        let isLoggedIn = true;
        if (isLoggedIn) {
            if (benefit.isExpired) {
                modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                    onHide: () => modalManagerUiState.closeCurrentModal(),
                    onClick: () => {
                        modalManagerUiState.closeCurrentModal();
                    },
                    sendText: 'הבנתי',
                    bodyText: 'אבל יש לנו הרבה הטבות אחרות להציע לך!',
                    titleText: 'הטבה אינה פעילה'
                });
            } else {
                history.push(`/redeem/${benefitId}`)
            }
        } else {
            modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => {
                    modalManagerUiState.closeCurrentModal();
                    history.push('/login');
                },
                sendText: 'התחברות',
                bodyText: 'עליך להתחבר כדי לממש את ההטבה',
            });
        }
    }

    render() {
        const {modalManagerUiState, benefit} = this.props;
        return (
            <div className="flex order-benefit">
                <div className="col-xs-3 favorite-icon-wrapper flex items-center justify-center">
                    <a
                        onClick={() => this.onFavoriteClick()}
                        onClose={() => modalManagerUiState.closeCurrentModal()}>
                        <img alt="favorite"
                             className="favorite-icon"
                             src={benefit.isFavorite ? favoriteIcon : fullFavoriteIcon}/>
                    </a>
                </div>

                <div className="col-xs-3 flex items-center justify-center">
                    <img alt="phone"
                         className="phone-icon"
                         src={phoneIcon}/>
                </div>

                <a onClick={() => this.onRedeemClick()} className="btn col-6 order-benefit-btn bold">הזמנת הטבה</a>
            </div>
        );
    }
}
