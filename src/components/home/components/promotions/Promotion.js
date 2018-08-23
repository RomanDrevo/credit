import React from 'react';
import styles from './Promotion.module.scss'
import classnames from 'classnames';
import ActionButton from '../../../common/actionbutton/ActionButton';
import ResponsiveComponent from '../../../../framework/components/ResponsiveComponent';


class Promotion extends ResponsiveComponent {

    renderDesktop(){
        const {promotion} = this.props;

        return (
            <div className={classnames(`${styles['desktop-promotion-container']} flex flex-wrap`)}>

                <div className="col-8">
                    <div style={{backgroundImage: `url(${promotion.src})`}} className="promotion-cover-img">
                    </div>
                </div>


                <div className="col-4 flex flex-wrap promotion-content">
                    <div className="promotion-text col-12 mr2">
                        <p className="promotion-text">{promotion.contentText}</p>
                    </div>

                    <div className="flex justify-end col-12 action-button-wrapper">
                        <ActionButton className="btn semibold text-center action-button">{promotion.actionTypeText}</ActionButton>
                    </div>
                </div>
            </div>
        );
    }

    renderMobile(){
        const {promotion} = this.props;

        return (
            <div className={classnames(`${styles['promotion-container']}`)}>
                <img className="img-responsive"
                     src={promotion.src}
                     alt="פרסומת"/>
                <div className="flex justify-between promotion-content">
                    <p className="promotion-text">{promotion.contentText}</p>
                    <ActionButton className="btn semibold text-center action-button">{promotion.actionTypeText}</ActionButton>
                </div>
            </div>
        );
    }

}

export default Promotion;
