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
            //parallax: true,
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

        function animateVissibleContent( vissibleVideoContainer) {
            const tl = new TimelineMax();

            tl
                .to(vissibleVideoContainer,0 , {y: 20,opacity: 0},0)
                .staggerTo(vissibleVideoContainer, 1.9, {y: 0, opacity: 1, pointerEvents: 'auto'},0.3)
        }

        this.videoSlider.on('init', () => {
            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible .video-gallery__item-wrap');
            this.visibleElemAmount = visibleVideoContainer.length;
            // const visibleContentLength = visibleVideoContainer.length;
            // let scaleSize = 1;
            // let increment = 1;
            //
            // Array.from(visibleVideoContainer).forEach(( visibleContent, index ) => {
            //
            //     const tl = new TimelineMax();
            //     if(index >= visibleContentLength / 2) {
            //         increment = -1;
            //     }
            //
            //     scaleSize = scaleSize + increment;
            //     let scale = 1 + scaleSize / visibleContentLength / 2.5;
            //
            //     console.log(scale)
            //
            //     if(scale > 1.3) {
            //         scale = 1.3;
            //     }
            //
            //     tl.to(visibleContent, 0.6, {scale: scale})
            //     //visibleContent
            // })


            // Array.from(visibleVideoContainer).forEach( (elem) => {
            //     elem.classList.add('is-visible');
            // })


            animateVissibleContent( visibleVideoContainer);
        });

        const tl =

        this.videoSlider.on('transitionStart', (swiper) => {


            //const visibleVideoContainer = document.querySelectorAll('.video-gallery__item');
            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible');
            const visibleContentLength = visibleVideoContainer.length;
            let scaleSize = 1;
            let increment = 1;

            //

            Array.from(visibleVideoContainer).forEach(( visibleItem, index ) => {
                const windowWidth = window.innerWidth;
                const itemCoordX = visibleItem.getBoundingClientRect().left;
                const tl = new TimelineMax();

                let direaction = this.videoSlider.activeIndex - this.videoSlider.previousIndex;

                const containerWidth = visibleItem.clientWidth;
                const x = (itemCoordX + direaction * containerWidth) / windowWidth * 10 + '%';
                console.log(x)

                // if( itemCoordX > windowWidth / 2) {
                //     if(direaction > 0) {
                //
                //     }
                // }

                // previousIndex  activeIndex

                if( visibleItem.querySelector('.video-gallery__img')) {


                    tl.to(visibleItem.querySelector('.video-gallery__img'), 0.8, {x: x})
                }


                /*const tl = new TimelineMax();
                const videoWrapper = visibleContent.querySelector('.video-gallery__item-wrap');

                if(visibleContent.classList.contains('swiper-slide-visible') && !videoWrapper.classList.contains('is-visible')) {
                    tl
                        .to( videoWrapper, 4, {y: 0,opacity: 1, pointerEvents: 'auto', onComplete: () => {
                                videoWrapper.classList.add('is-visible');
                            }})

                }*/
            })

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
