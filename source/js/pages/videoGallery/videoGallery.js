import Swiper from 'swiper/dist/js/swiper';
import {VideoPopup} from "../../components/videoPopup";

export class VideoGallery {
    constructor() {
        this.videoSlider = {};
        this.videoItems = document.querySelectorAll('.video-gallery__link');
        this.visibleElemAmount = 0;
    }

    initSlider() {
        const sliderSpeed = 550;
        this.videoSlider = new Swiper('.video-gallery__list', {
            mousewheelControl: true,
            keyboardControl: true,
            //parallax: true,
            speed: sliderSpeed,
            //init: false,
            slidesPerView: 'auto',
            runCallbacksOnInit: true,
            watchSlidesVisibility: true,
            mousewheel: {
                enabled: true,
                eventsTarged: '.swiper-container'
            },
            keyboard: {
                enabled: true,
            },
            loop: false,
        });

        function animateVissibleContent(vissibleVideoContainer) {
            const tl = new TimelineMax();

            tl
                .to(vissibleVideoContainer, 0, {y: 20, opacity: 0}, 0)
                .staggerTo(vissibleVideoContainer, 1.9, {y: 0, opacity: 1, pointerEvents: 'auto'}, 0.3)
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


            animateVissibleContent(visibleVideoContainer);
        });

        this.videoSlider.on('transitionStart', (swiper) => {

            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible');
            const transfromLimit = 22;

            Array.from(visibleVideoContainer).forEach((visibleItem, index) => {
                const windowWidth = window.innerWidth;
                const tl = new TimelineMax();
                const containerWidth = visibleItem.clientWidth;
                const windowHalfWidth = windowWidth / 2;
                const imageContainer = visibleItem.querySelector('.video-gallery__img');


                if (imageContainer) {
                    tl.to(imageContainer, sliderSpeed / 1000, {
                        opacity: 1, onUpdate: () => {

                            const elemX = visibleItem.getBoundingClientRect().left;
                            const x = elemX + containerWidth / 2 - windowHalfWidth;

                            let percent = x / windowHalfWidth ;
                            if (percent > 1 ) {
                                percent = 1
                            } else if (percent < -1) {
                                percent = -1;
                            }

                            visibleItem.querySelector('.video-gallery__img').style.transform = `translateX(${transfromLimit * percent}%)`;
                        }
                    })
                }
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
        Array.from(this.videoItems).forEach(elem => {
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
