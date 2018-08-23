import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Swiper from 'react-id-swiper';
import BenefitBox from '../../../common/benefitbox/BenefitBox';
import styles from './Carousel.module.scss';
import YouTube from 'react-youtube';
import InlineSpinner from '../../../common/loading/InlineSpinner';


@observer
export default class Carousel extends Component {
    playerRefs = {};
    state = {
        carouselItems: [],
        fuckSwiperBug: false
    };

    componentDidMount() {
        setTimeout(() => this.setState({ fuckSwiperBug: true }), 1000);
    }

    componentWillMount() {
        this._initCarouselItems(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._initCarouselItems(nextProps);
    }

    _initCarouselItems(props) {
        const { benefits, videoAds } = props;
        const carouselItems = benefits.toJS();

        // Insert video ads so that they are not in first (or last) place to avoid problems with dom manipulation
        // due to swiper looping duplicating slides
        videoAds.forEach(x => {
            carouselItems.splice(Math.min(1, benefits.length), 0, x);
        });

        this.setState({ carouselItems });
    }

    _renderBenefit(benefit) {
        return <BenefitBox className="carousel-item" benefit={benefit}/>;
    }

    _renderVideoAd(videoAd) {
        return <YouTube
            className="carousel-item youtube-ad"
            onReady={this._onReady.bind(this, videoAd.youtubeId)}
            videoId={videoAd.youtubeId}                  // defaults -> null
            opts={{
                playerVars: {
                    autoplay: 1,
                    playsinline:1,
                    modestbranding: 1,
                    showinfo: 0,
                    controls: 0,
                    iv_load_policy: 3,
                    fs: 0
                }
            }}
        />
    }

    _onReady(videoId, event) {
        this.playerRefs[videoId] = event.target;
    }

    _onSlideChanged(activeIndex, previousIndex) {
        if (activeIndex === previousIndex) {
            return;
        }

        const { carouselItems } = this.state;

        if (carouselItems[activeIndex].youtubeId) {
            // Avoid races where the player is not initialized yet
            if (this.playerRefs[carouselItems[activeIndex].youtubeId]) {
                this.playerRefs[carouselItems[activeIndex].youtubeId].playVideo();
            }
        }

        if (carouselItems[previousIndex].youtubeId) {
            // Avoid races where the player is not initialized yet
            if (this.playerRefs[carouselItems[previousIndex].youtubeId]) {
                this.playerRefs[carouselItems[previousIndex].youtubeId].pauseVideo();
            }
        }
    }

    _toggleVideoPlayback(itemIndex){
        let youtubeId = this.state.carouselItems[itemIndex].youtubeId;
        if (!youtubeId){
            return;
        }
        const playerRef = this.playerRefs[youtubeId];
        if (playerRef.getPlayerState() !== 1){
            playerRef.playVideo();
        }
        else{
            playerRef.pauseVideo();
        }
    }

    render() {
        const { className } = this.props;
        const { carouselItems } = this.state;
        const self = this;

        if(!carouselItems.length){
            return <InlineSpinner />
        }


        return (
            <div className={`${styles['featured-benefits']} ${className || ''}`}>
                <div className="list-unstyled flex justify-content featured-benefits-list">
                    <Swiper
                        loop={true}
                        rtl={true}
                        autoplay={{ delay: 3500 }}
                        centeredSlides={true}
                        preloadImages={false}
                        watchSlidesVisibility={true}
                        lazyLoading={false}
                        on={{
                            slideChange: function () {
                                //'this' here means the swiper instance
                                if (Number.isFinite(this.realIndex) && Number.isFinite(this.previousIndex)) {
                                    self._onSlideChanged(this.realIndex, this.previousIndex % carouselItems.length);
                                }
                            },
                        }}
                        slidesPerView="auto"
                        autoplayDisableOnInteraction={false}>

                        {
                            carouselItems.map((x, index) =>
                                <div onClick={this._toggleVideoPlayback.bind(this,index)} key={index} className="swiper-slide featured-benefit-wrapper">
                                    {x.youtubeId ? this._renderVideoAd(x) : this._renderBenefit(x)}
                                </div>
                            )
                        }
                    </Swiper>
                </div>
            </div>
        );
    }
};
