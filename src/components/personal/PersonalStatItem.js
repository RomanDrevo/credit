import React, {Component} from 'react';

export default class BenefitStatItem extends Component {
    render() {
        const {totalBenefits, imageName, title} = this.props;
        return (
            <div className="item flex justify-center position-relative">
                <div className="main-stats full-height flex items-center ">
                    <img className="icon" alt="" src={imageName}/>
                    <span className="number">{totalBenefits}</span>
                </div>
                <div className="title">
                    <div className="flex justify-center items-baseline">
                        <span>{title}</span>
                        <img className="icon-arrow" alt=""
                             src={require(`../../assets/images/arrow-left-white.png`)}/>
                    </div>
                </div>
            </div>
        );
    }
}
