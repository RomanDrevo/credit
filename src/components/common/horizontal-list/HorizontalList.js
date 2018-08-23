import React from "react";
import BenefitBox from "../../common/benefitbox/BenefitBox";
import styles from "./HorizontalList.module.scss";
import ResponsiveComponent from "../../../framework/components/ResponsiveComponent";
import Title from "./Title";
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import InlineSpinner from '../loading/InlineSpinner';

class HorizontalList extends ResponsiveComponent {
    renderDesktop() {
        const { items, title, showAll } = this.props;

        return (
            <div className={`${styles['horizontal-list-wrapper-desktop']} horizontal-list-wrapper`}>
                <div className="flex">
                    {items.map(x => <div key={x.id} className={'col-3 item'}>
                        <BenefitBox
                            benefit={x}
                        />
                    </div>)}
                </div>
            </div>);
    }

    renderMobile() {
        const { items, title, showAll, url } = this.props;

        return (
            <div className={`${styles['horizontal-list-wrapper-mobile']} horizontal-list-wrapper`}>
                <div className='flex'>
                    <p className="bold flex-auto">{title}</p>
                    {showAll && <Link to={url}>
                        הכל
                        <img className="left-arrow" src={require("../../../assets/images/arrow_left.svg")} alt=""/>
                    </Link>}
                </div>

                <div className="flex">
                    {
                        !items.length ?
                            <InlineSpinner /> :
                            <Swiper
                                rtl={true}
                                preloadImages={false}
                                loop={true}
                                centeredSlides={true}
                                slidesPerView="auto"
                                spaceBetween={10}
                                lazyLoading={true}>

                                {
                                    items.map(x => <div key={x.id} className='item swiper-slide'>
                                        <BenefitBox
                                            benefit={x}
                                        />
                                    </div>)
                                }
                            </Swiper>
                    }

                </div>
            </div>);
    }
}

export default HorizontalList;
