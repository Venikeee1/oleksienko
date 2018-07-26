import Swiper from 'swiper/dist/js/swiper';
import {VideoPopup} from "../../components/videoPopup";

export class VideoGallery {
    constructor() {
        this.videoSlider = {};
        this.videoItems = document.querySelectorAll('.video-gallery__link');
        this.visibleElemAmount = 0;
    }

    initSlider() {
        this.videoSlider = new Swiper('.video-gallery__list', {
            mousewheelControl: true,
            keyboardControl: true,
            parallax: true,
            speed: 550,
            //init: false,
            slidesPerView: 'auto',
            runCallbacksOnInit: true,
            watchSlidesVisibility: true,
            mousewheel:{
                enabled: true,
                eventsTarged: '.swiper-container'
            },
            keyboard:{
                enabled: true,
            },
            loop: false,
        });

        function animateVissibleContent( vissibleVideoContainer, vissibleVideoNames) {
            const tl = new TimelineMax();

            tl
                .to(vissibleVideoNames,0 , {y: 30, opacity: 0},0)
                .to(vissibleVideoContainer,0 , {y: 30, opacity: 0},0)
                .staggerTo(vissibleVideoContainer, 1.2, {y: 0, opacity: 1, pointerEvents: 'auto'},0.3)
                .staggerTo(vissibleVideoNames, 1.2, {y: 0, opacity: 1},0.3, 0.3)
        }

        this.videoSlider.on('init', () => {
            const visibleVideoNames = document.querySelectorAll('.swiper-slide-visible .video-gallery__video-name');
            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible .video-gallery__item-wrap');
            this.visibleElemAmount = visibleVideoNames.length;

            animateVissibleContent( visibleVideoContainer, visibleVideoNames);
        });

        this.videoSlider.on('transitionStart', (swiper) => {
            if(this.visibleElemAmount !== swiper.slides.length) {
                const swiperLastVisibleItem =  swiper.slides[this.visibleElemAmount];

                if( swiperLastVisibleItem.classList.contains('swiper-slide-visible') ) {
                    swiperLastVisibleItem.style.opacity = 1;

                    animateVissibleContent( swiperLastVisibleItem.querySelectorAll('.video-gallery__item-wrap'), swiperLastVisibleItem.querySelectorAll('.video-gallery__video-name'))

                    this.visibleElemAmount++;
                }
            }

        });

        document.querySelector('.navigation-arrows__nav-arrow--left').addEventListener('click', (e) => {
            e.preventDefault();
            this.videoSlider.slidePrev();
        })

        document.querySelector('.navigation-arrows__nav-arrow--right').addEventListener('click', (e) => {
            e.preventDefault();
            this.videoSlider.slideNext();
        })

        this.videoSlider.init();

    }

    playButtonListener() {
        Array.from(this.videoItems).forEach( elem => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();

                const iframeSrc = elem.getAttribute('data-frame');
                const videoPopup = new VideoPopup(iframeSrc);

                videoPopup.openPopup();
            })
        })
    }

    init() {
        this.initSlider();
        this.playButtonListener();
    }
}