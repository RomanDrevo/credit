import React from 'react';
import styles from './Footer.module.scss';
import classnames from 'classnames';


const Footer = ({benefitFooter}) => {
    return (
        <div className={classnames(`${styles['footer-wrapper']} flex justify-center content-center ${benefitFooter}`)}>
            <div className={'footer-content flex'}>
                <div>טקסט</div>
                <div className='divider mx1 mt1'></div>
                <div>טקסט</div>
                <div className='divider mx1 mt1'></div>
                <div>טקסט</div>
            </div>
        </div>
    );

};

export default Footer;
