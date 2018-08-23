import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Swiper from 'react-id-swiper';
import styles from './DesktopSlider.module.scss';
import ReactLoading from 'react-loading';


@observer
class SliderBenefitInfo extends Component {

    render() {
        const { benefit, benefitsStore } = this.props;

        return (
            <div className="slider-benefit-info p4">
                <div>{benefit.name}</div>
                <div className="store-logo flex justify-between mt3">
                    <img alt={benefit.name} src={benefit.storeLogoImg}/>
                    <div className="">
                        <img className="favorite-img"
                             alt="favorite-icon"
                             onClick={(e) => {
                                 e.preventDefault();
                                 benefitsStore.toggleFavorite(benefit)
                             }}
                             src={require(`../../../../assets/images/${benefit.isFavorite ? 'icon_heart_full.svg' : 'favorite.svg'}`)}/>
                    </div>
                </div>
            </div>
        )
    }
}

@inject('benefitsStore')
@observer
class DesktopSlider extends Component {
    state = {
        fuckSwiperBug: false
    };

    componentDidMount() {
        setTimeout(() => this.setState({ fuckSwiperBug: true }), 500);
    }

    render() {
        const { benefitsStore } = this.props;

        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        const featuredBenefits = benefitsStore.featuredBenefits;
        return (
            <div className={styles.slider}>
                {
                    !featuredBenefits.length || !this.state.fuckSwiperBug ?
                    <div className="flex items-center justify-center" style={{height: '430px'}}>
                        <ReactLoading type="spinningBubbles"
                                      height="30px"
                                      width="30px"
                                      color="#19398a"
                                      delay={0}/>
                    </div> :
                    <Swiper
                        ref={swiper => this.swiper = swiper}
                        loop={true}
                        rtl={true}
                        autoplay={{ delay: 3500 }}
                        preloadImages={false}
                        watchSlidesVisibility={true}
                        lazyLoading={true}
                        slidesPerView="auto"
                        autoplayDisableOnInteraction={false}
                        {...params}
                    >
                        {featuredBenefits.map(x => <div key={x.id} className="slider-img-wrapper">
                            <div alt="slide" className="slider-img" style={{ backgroundImage: `url(${x.sliderImg})` }}>
                                <div className="container flex">
                                    <SliderBenefitInfo benefit={x} benefitsStore={benefitsStore}/>
                                </div>
                            </div>
                        </div>)}
                    </Swiper>
                }

            </div>
        )
    }
}

export default DesktopSlider;
