import React, {Component} from 'react';
import styles from './BottomBar.module.scss';
import {inject, observer} from 'mobx-react';
import {MODAL_TYPE} from "../modal/ModalManagerUiState";
import {withRouter} from "react-router-dom";
import BlueFavoriteIcon from '../../../assets/images/blue-favorite-icon.svg';
import GeoLocationIcon from '../../../assets/images/geo-location-icon.svg';
import {Link} from "react-router-dom";


const BottomBarIcon = ({className, imageSrc, imageAlt, onOpen}) => {
    return (typeof onOpen === "string" ?
            <div className={className}>
                <Link to={onOpen}>
                    <img src={imageSrc} alt={imageAlt}/>
                </Link>
            </div>
            :
            <div className={className}>
                <a onClick={onOpen}>
                    <img src={imageSrc} alt={imageAlt}/>
                </a>
            </div>
    );
};
@withRouter
@inject('modalManagerUiState', 'bottomBarUiStore')
@observer
export default class BottomBar extends Component {
    onFavoriteIconClick() {
        const {modalManagerUiState, history} = this.props;
        // TODO: Add user auth for if statement
        let isLoggedIn = true;
        if (isLoggedIn) {
            let hasFavorites = true;
            if (hasFavorites) {
                history.push('/favorites')
            } else {
                modalManagerUiState.openModal(MODAL_TYPE.IMAGE_MODAL, {
                    onHide: () => modalManagerUiState.closeCurrentModal(),
                    onClick: () => modalManagerUiState.closeCurrentModal(),
                    sendText: 'חזרה',
                    bodyText: 'אין הטבות שמורות',
                    imageUrl: BlueFavoriteIcon,
                    imageStyle: {width: '56px', height: '45px'}
                });
            }

        } else {
            modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => {
                    history.push('/login');
                    modalManagerUiState.closeCurrentModal()
                },
                sendText: 'התחברות',
                bodyText: 'יש להתחבר לחשבון כדי לעבור למועדפים'
            });
        }
    }

    onLocationIconClick() {
        const {bottomBarUiStore, modalManagerUiState} = this.props;
        if (bottomBarUiStore.currentPosition) {
            modalManagerUiState.openModal(MODAL_TYPE.IMAGE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => modalManagerUiState.closeCurrentModal(),
                imageUrl: GeoLocationIcon,
                sendText: 'הבנתי',
                bodyText: 'על מנת שנוכל להעניק לך חוויה מיטבית ולמצוא עבורך את ההטבות השוות ביותר, נא אשר לנו להשתמש במיקומך הנוכחי.',
                titleText: 'תן לנו למצוא את ההטבות השוות ביותר בשבילך',
                imageStyle: {width: '46px', height: '63px', marginBottom: '33px'},
                BodyTextStyle: {fontSize: '15px'}
            });

        } else {
            //TODO: add location end point
            bottomBarUiStore.getLocationInfo();
            return ''
        }
    }

    onPersonalSectionClick() {
        const {modalManagerUiState, history} = this.props;
        let isLoggedIn = true;
        if (isLoggedIn) {
            history.push('/personal')
        } else {
            modalManagerUiState.openModal(MODAL_TYPE.SIMPLE_MODAL, {
                onHide: () => modalManagerUiState.closeCurrentModal(),
                onClick: () => {
                    history.push('/login');
                    modalManagerUiState.closeCurrentModal()
                },
                sendText: 'התחברות',
                bodyText: 'עליך להתחבר כדי להיכנס לאיזור האישי',
            });
        }
    }

    render() {
        const {modalManagerUiState, history} = this.props;
        return (
            <div className="footer navbar-fixed-bottom">
                <div className={`${styles['bottom-bar-wrapper']}`}>
                    <div className={'bottom-bar-content flex justify-around pt2'}>
                        <BottomBarIcon
                            className="bottom-bar-action-icon"
                            imageSrc={require("../../../assets/images/home.svg")} alt="בית"
                            onOpen={() => history.push('/')}
                        />

                        <BottomBarIcon
                            className="bottom-bar-action-icon"
                            imageSrc={require("../../../assets/images/favorites.svg")} alt="מועדפים"
                            onOpen={() => this.onFavoriteIconClick()}
                            onClose={() => modalManagerUiState.closeCurrentModal()}
                        />

                        <BottomBarIcon
                            className="bottom-bar-action-icon"
                            imageSrc={require("../../../assets/images/group-13.svg")} alt="חבל על הזמן"
                            onOpen={() => history.push('/category-benefits/1')}
                        />

                        <BottomBarIcon
                            className="bottom-bar-action-icon"
                            imageSrc={require("../../../assets/images/location.svg")} alt="מיקום"
                            onOpen={() => this.onLocationIconClick()}
                            onClose={() => modalManagerUiState.closeCurrentModal()}
                        />

                        <BottomBarIcon
                            className="bottom-bar-action-icon"
                            imageSrc={require("../../../assets/images/account.svg")} alt="איזור אישי"
                            onOpen={() => this.onPersonalSectionClick()}
                            onClose={() => modalManagerUiState.closeCurrentModal()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
