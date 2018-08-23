import React, {Component} from 'react';

export default class MenuStatsItem extends Component {
    render() {
        const {totalBenefits, imageName, title, classColorNumber} = this.props;
        return (
            <div className="item flex flex-column items-center justify-center position-relative">
                <div className="main-stats full-height flex items-center ">
                    <img className="icon" alt="" src={imageName}/>
                    <span className={`number-${classColorNumber}`}>{totalBenefits}</span>
                </div>

                <div className="title text-center">
                        <span>{title}</span>
                </div>
            </div>
        );
    }
}
