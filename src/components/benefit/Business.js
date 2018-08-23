import React from 'react';
import arrowLeft from '../../assets/images/arrow_left.svg';

const Business = ({benefit}) => {
    const business = benefit.business;
    return (
        <div>
            <div className="flex flex-wrap py3 items-center">
                <div className="col-2 flex items-center justify-center">
                    <img alt="logo" className="img-responsive" src={benefit.storeLogoImg}/>
                </div>

                <div className="col-10 justify pr1 title">
                    <h1 className="bold">{business.name}</h1>
                </div>
            </div>

            <div className="text-justify py3">
                <h1 className="h5 py3">טלפון: {business.phoneNumber} </h1>
                <h1 className="h5 py3">שרות לקוחות: {business.customerServicePhoneNumber} </h1>
                <h1 className="h4 bold py3 flex items-center"><a className="pl1" href={business.siteUrl}>לאתר החברה</a><img
                    alt="arrow-left" className="arrow-left" src={arrowLeft}/></h1>
            </div>
        </div>
    )
};
export default Business;
