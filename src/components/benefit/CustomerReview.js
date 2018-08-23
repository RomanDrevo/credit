import React from 'react';
import RatingStars from './RatingStars';

const CustomerReview = ({review}) =>
    <div className="flex flex-wrap items-baseline customer-reviews py1">
        <h1 className="col-3 justify">{review.customerName}</h1>
        <div className="col-9 flex flex-wrap h6">
            <div className="col-12">
                <RatingStars ratingPoints={review.rating}/>
            </div>
            <div className="col-12 justify">{review.reviewText}</div>
        </div>
    </div>;
export default CustomerReview;
