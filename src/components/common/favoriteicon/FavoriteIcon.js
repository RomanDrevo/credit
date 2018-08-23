import React, {Component} from 'react';
import styles from './FavoriteIcon.module.scss';
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {MODAL_TYPE} from "../modal/ModalManagerUiState";

@withRouter
@inject('modalManagerUiState')
@observer
export default class FavoriteIcon extends Component {
    handleFavoriteToggle(event) {
        event.preventDefault();

        const {onFavoriteToggled, benefit, modalManagerUiState, history} = this.props;
        let isLoggedIn = true;
        //TODO: connect to user auth
        if (!isLoggedIn) {
            modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => {
                    history.push('login');
                    modalManagerUiState.closeCurrentModal()
                },
                sendText: 'התחברות',
                bodyText: 'יש להתחבר לחשבון כדי להוסיף הטבה למועדפים'
            });
        } else {
            onFavoriteToggled(benefit)
        }
    }

    render() {
        const {className, isFavorite} = this.props;

        return (
            <div className={`${styles['favorite-icon-wrapper']} flex items-center`}>
                <img
                    onClick={(e) => this.handleFavoriteToggle(e)}
                    src={require(`../../../assets/images/${isFavorite ? 'icon_heart_full.svg' : 'favorite.svg'}`)}
                    className={`favorite-icon ${className || ""}`}
                    alt="הוסף למועדפים"
                />
            </div>
        );
    }
}

