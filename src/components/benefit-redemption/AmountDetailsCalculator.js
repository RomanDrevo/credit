import React, {Component} from 'react';

export default class AmountDetailsCalculator extends Component {
    render() {
        const {price, quantity, reduceQuantity, addQuantity} = this.props;

        return (
            <div className="flex amount-details">
                <div className="flex-auto quantity ">
                    <h2>כמות</h2>
                    <div className="flex items-center justify-center">
                        <img
                            alt=""
                            src={require('../../assets/images/plus.svg')}
                            onClick={() => addQuantity()}
                            className="icon-plus cursor-pointer"
                        />
                        <span className="h1">{quantity}</span>
                        <img
                            alt=""
                            src={require('../../assets/images/minus.svg')}
                            onClick={() => reduceQuantity()}
                            className="icon-minus cursor-pointer"
                        />
                    </div>
                </div>
                <div className="col-4 cost">
                    <h2>עלות</h2>
                    <div className="mt1 thin">{price} שח</div>
                </div>
                <div className="col-4 total">
                    <h2>סה"כ</h2>
                    <div className="bold mt1">{price * quantity} שח</div>
                </div>
            </div>
        );
    }
}

