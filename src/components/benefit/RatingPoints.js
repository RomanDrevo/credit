import React, {Component} from 'react';

export default class RatingPoints extends Component {
    render() {
        const {ratingPoints} = this.props;
        return <div className="h4 bold">{ratingPoints}</div>
    }
}
