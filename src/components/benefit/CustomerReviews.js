import React, {Component} from 'react';
import CustomerReview from './CustomerReview';

export default class CustomerReviews extends Component {
    render() {
        const {reviews} = this.props.benefit;
        const singleReviewElements = reviews.map((review, index) => <CustomerReview key={index} review={review}/>);
        return singleReviewElements
    }
}
