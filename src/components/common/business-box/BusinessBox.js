import React from 'react';
import './BusinessBox.scss';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ResponsiveComponent from '../../../framework/components/ResponsiveComponent';


class Business extends ResponsiveComponent{

    renderDesktop(){
        const {business, className} = this.props;

        return (
            <Link to={`/businesses/${business.id}`} className={classnames('desktop-business-box', className || "",'flex items-center')}>
                <div className={`company-logo mx-auto`}
                     style={{backgroundImage: `url(${business.logo})`}}/>
            </Link>

        );
    }

    renderMobile(){
        const {business, className} = this.props;

        return (
            <Link to={`/businesses/${business.id}`} className={classnames('business-box', className || "",'flex items-center')}>
                <div className={`company-logo mx-auto`}
                     style={{backgroundImage: `url(${business.logo})`}}/>
            </Link>

        );

    }


};

export default Business;
