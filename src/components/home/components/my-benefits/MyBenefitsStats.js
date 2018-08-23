import React, {Component} from 'react';
import styles from './MyBenefitsStats.module.scss';
import BenefitStatItem from './BenefitStatItem';

export default class MyBenefitsStats extends Component {
    render() {
        return (
            <div className={styles['my-benefits']}>
                <p className="bold">ההטבות שלך</p>
                <div className="flex benefit-list">
                    <div className="col-4">
                        <BenefitStatItem
                            totalBenefits="4"
                            imageName={require(`../../../../assets/images/icon-present.png`)}
                            title="הטבות למימוש"
                        />
                    </div>
                    <div className="col-4">
                        <BenefitStatItem
                            totalBenefits="5"
                            imageName={require(`../../../../assets/images/icon-paper-present.png`)}
                            title="נותרו החודש"
                        />
                    </div>
                    <div className="col-4">
                        <BenefitStatItem
                            totalBenefits="1"
                            imageName={require(`../../../../assets/images/icon-crown.png`)}
                            title="הטבות פרימיום"
                        />
                    </div>
                </div>

            </div>
        );
    }
}
