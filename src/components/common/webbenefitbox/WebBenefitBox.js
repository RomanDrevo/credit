import React, {Component} from "react";
import styles from "./WebBenefitBox.module.scss";
import FavoriteIcon from "../favoriteicon/FavoriteIcon";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";


@inject('benefitsStore')
@observer
class WebBenefitBox extends Component {

    render() {
        const {benefit, className, benefitsStore} = this.props;

        return (
            <Link to={`/benefits/${benefit.id}`} className={`${styles['benefit-box-desktop']} ${className || ''}`}>
                <div className="benefit-box-wrapper">
                    <div className='benefit-cover-img-desktop'
                         style={{backgroundImage: `url(${benefit.coverImg})`}}>
                        <div className="favorite-icon-wrapper">
                            <FavoriteIcon
                                className={'is-favorite'}
                                onFavoriteToggled={benefitsStore.toggleFavorite}
                                benefit={benefit}
                                isFavorite={benefit.isFavorite}
                            />
                        </div>

                    </div>
                    <div className="benefit-details-desktop">
                        <div className="flex justify-center items-center py1">
                            <img className='benefit-box-logo'
                                 src={benefit.storeLogoImg}
                                 alt="חנות לוגו"
                            />
                        </div>

                        <p className='benefit-box-caption bold m0'>{benefit.name}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default WebBenefitBox;
