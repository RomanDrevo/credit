import React from 'react';
import './BenefitBox.scss';
import FavoriteIcon from '../favoriteicon/FavoriteIcon';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import ResponsiveComponent from '../../../framework/components/ResponsiveComponent';

@inject('benefitsStore')
@observer
class BenefitBox extends ResponsiveComponent {
    renderDesktop() {
        const {benefit, className, benefitsStore} = this.props;
        return (
            <Link to={`/benefits/${benefit.id}`} className={`benefit-box ${className || ''}`}>
                <div className="benefit-box-desktop-wrapper">
                    <div className='benefit-cover-img-desktop'
                         style={{backgroundImage: `url(${benefit.coverImg})`}}>
                        <div className="favorite-icon-wrapper">
                            <FavoriteIcon
                                className={'is-favorite cursor-pointer'}
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
                        <p className='benefit-box-caption bold m0 px5'>{benefit.name}</p>
                    </div>
                </div>
            </Link>
        );
    }

    renderMobile() {
        const {benefit, className, benefitsStore} = this.props;
        return (
            <Link to={`/benefits/${benefit.id}`} className={`benefit-box ${className || ''}`}>
                    <div className='benefit-cover-img'
                         style={{backgroundImage: `url(${benefit.coverImg})`}}>
                        <FavoriteIcon
                            className={'is-favorite'}
                            onFavoriteToggled={benefitsStore.toggleFavorite}
                            benefit={benefit}
                            isFavorite={benefit.isFavorite}
                        />
                    </div>
                    <div className="flex justify-between items-center benefit-box-details">
                        <p className='benefit-box-caption semibold m0'>{benefit.name}</p>
                        <img className='benefit-box-logo'
                             src={benefit.storeLogoImg}
                             alt="חנות לוגו"
                        />
                    </div>

            </Link>
        );
    }
}


export default BenefitBox;
