import React from 'react';

const BenefitHeader = ({benefit}) =>
    <div className="position-relative">
        <div style={{backgroundImage: `url(${benefit.coverImg})`}} className="benefit-top-img"/>

        <div className="benefit-logo flex items-center">

            <img alt={benefit.business.name} className="benefit-logo-img img-responsive" src={benefit.storeLogoImg}/>

        </div>
    </div>;
export default BenefitHeader;
