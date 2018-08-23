import React, {Component} from 'react';
import BenefitPurchase from './BenefitPurchase'
import Coupon from './Coupon'
import styles from './BenefitPurchase.module.scss';

export default class BenefitRedemption extends Component {
    state = {
        isFinishPurchase: false
    };

    finishPurchase() {
        this.setState({isFinishPurchase:true})
    }
    render() {
        return (
            <div className={styles['benefit-redemption']}>
                {this.state.isFinishPurchase ?
                    <Coupon
                        fullName='ישראל ישראלי'
                    />:
                    <BenefitPurchase finishPurchase={this.finishPurchase.bind(this)} />
                }
            </div>
        );
    }
}
