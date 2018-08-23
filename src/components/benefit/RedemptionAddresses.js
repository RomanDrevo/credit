import React from 'react';
import locationIcon from '../../assets/images/locaion-icon.svg';
import locationIconGray from '../../assets/images/locaion-icon-gray.svg';
import arrowLeft from '../../assets/images/arrow_left.svg';
import * as classnames from 'classnames';

const RedemptionAddresses = ({addresses}) =>
    addresses.map((redemptionAddress, index) =>
        <div className={classnames({'text-muted':redemptionAddress.isOpen},'flex flex-wrap border-bottom py5 redemption-wrapper')} key={index}>
            <div className="ml2"><img alt="location" className="location-icon"
                                                src={redemptionAddress.isOpen ? locationIcon : locationIconGray}/></div>
            <div className="col-5 flex-auto">{redemptionAddress.address}</div>
            <div className="col-1 bold pl7">{!redemptionAddress.isOpen && 'סגור'}</div>
            <div className="col-2">{redemptionAddress.distanceKm} ק"מ</div>
            <div className="col-2 h5 bold pr1"><a className="google-nav" href=""> נווט<img
                alt="arrow-left" className="arrow-left" src={arrowLeft}/></a></div>
        </div>
    );
export default RedemptionAddresses;
