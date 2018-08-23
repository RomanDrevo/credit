import React, {Component} from 'react';
import starIcon from '../../assets/images/star.svg';
import starEmptyIcon from '../../assets/images/empty-star.svg';

export default class RatingStars extends Component {
    render() {
        const {ratingPoints, className} = this.props;

        let stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < ratingPoints) {
                stars.push(<img alt="" key={i} className={`ratingStar ${className}`} src={starIcon}/>);
            }
            else {
                stars.push(<img alt="" key={i} className={`ratingStar ${className}`} src={starEmptyIcon}/>)
            }
        }

        return <div className="flex">{stars}</div>
    }
}
