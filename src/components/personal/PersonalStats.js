import React, {Component} from "react";
import styles from "./PersonalStats.module.scss";
import BenefitStatItem from "./PersonalStatItem";
import {inject, observer} from "mobx-react";
import {MODAL_TYPE} from "../common/modal/ModalManagerUiState";
import ProfileIcon from "../../assets/images/profile-icon.svg";


@inject('authStore', 'personalUiState', 'modalManagerUiState')
@observer
export default class MyBenefitsStats extends Component {
    render() {
        const {user} = this.props;

        if (!user) {
            return null;
        }
        return (
            <div className={styles['my-benefits']}>
                <div className="flex benefit-list">
                    <div className="col-4" onClick={() => this._onRedeemedBenefitsClick()}>
                        <BenefitStatItem
                            totalBenefits={user.userStats[0].unredeemedBenefits}
                            imageName={require(`../../assets/images/icon-present.png`)}
                            title="הטבות למימוש"
                        />
                    </div>
                    <div className="col-4" onClick={() => this._onBenefitsLeftThisMonthClick()}>
                        <BenefitStatItem
                            totalBenefits={user.userStats[0].benefitsLeftThisMonth}
                            imageName={require(`../../assets/images/icon-paper-present.png`)}
                            title="נותרו החודש"
                        />
                    </div>
                    <div className="col-4">
                        <BenefitStatItem
                            totalBenefits={user.userStats[0].premiumBenefitsLeft}
                            imageName={require(`../../assets/images/icon-crown.png`)}
                            title="הטבות פרימיום"
                        />
                    </div>

                </div>

            </div>
        );

    }

    _onRedeemedBenefitsClick() { //todo : need to refactor to the real data !
        const {user, modalManagerUiState}= this.props;

        if (user.userStats[0].unredeemedBenefits === 4) {
            modalManagerUiState.openModal(MODAL_TYPE.IMAGE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => modalManagerUiState.closeCurrentModal(),
                imageUrl: ProfileIcon,
                sendText: 'החמים ביותר',
                bodyText: <div className="flex flex-column text-center"><span
                    className="font-19 bold">לא הורדת הטבות</span><span
                    className="font-17">בוא לראות מה שיש לנו להציע לך</span>
                </div>,
                imageStyle: {width: '67px', height: '90px'}
            });
        }
    }

    _onBenefitsLeftThisMonthClick() { //todo : need to refactor to the real data !
        const {modalManagerUiState, user}= this.props;

        if (user.userStats[0].benefitsLeftThisMonth === 5) {
            modalManagerUiState.openModal(MODAL_TYPE.IMAGE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => modalManagerUiState.closeCurrentModal(),
                imageUrl: ProfileIcon,
                sendText: 'החמים ביותר',
                bodyText: <div className="flex flex-column text-center"><span
                    className="font-19 bold">אין הטבות שמומשו</span><span
                    className="font-17">בוא לראות מה שיש לנו להציע לך</span>
                </div>,
                imageStyle: {width: '67px', height: '90px'}
            });
        }
    }

}
