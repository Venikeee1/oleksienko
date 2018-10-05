import Swiper from 'swiper/dist/js/swiper';
import {VideoPopup} from "../../components/videoPopup";

export class VideoGallery {
    constructor() {
        this.videoSlider = {};
        this.videoItems = document.querySelectorAll('.video-gallery__link');
        this.visibleElemAmount = 0;
        this.videoContainer = document.querySelectorAll('.video-gallery__video');
    }

    initSlider() {
        const sliderSpeed = 550;

        function animateVissibleContent(visibleVideoContainer) {
            const tl = new TimelineMax();
            const visibleImages = [];
            Array.from(visibleVideoContainer).forEach(elem => {
                visibleImages.push(elem.querySelectorAll('.video-gallery__img'));
            })
            //const vissibleImages = visibleVideoContainer.querySelectorAll('.video-gallery__img');

            tl
                .to(visibleImages, 0, {y: '-10%'}, 0)
                .to(visibleVideoContainer, 0, {y: 50, opacity: 0}, 0)
                .staggerTo(visibleVideoContainer, 1.2, {y: 0, opacity: 1, pointerEvents: 'auto'}, 0.2)
                .staggerTo(visibleImages, 1.2, {y: '0%'}, 0.2, 0)

        }

        function setIndention(elem) {

            const transformLimit = 22;
            const windowWidth = window.innerWidth;
            const windowHalfWidth =  windowWidth / 2;
            const containerWidth = elem.clientWidth;
            const elemX = elem.getBoundingClientRect().left;
            const x = elemX + containerWidth / 2 - windowHalfWidth;

            let percent = x / windowHalfWidth ;
            if (percent > 1 ) {
                percent = 1
            } else if (percent < -1) {
                percent = -1;
            }
            elem.querySelector('.video-gallery__img').style.transform = `translateX(${transformLimit * percent}%)`;
        }

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

        this.videoSlider.on('touchMove', () => {
            // const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible');
            // const galleryWidth = this.videoSlider.virtualSize;

            // Array.from(visibleVideoContainer).forEach((visibleItem, index) => {
            //     const galleryBg = document.querySelector('.video-gallery__bg');
            //     const stepCoeficient = 0.03;
            //     const swiperPosition = this.videoSlider.wrapper[0].getBoundingClientRect().left;
            //     const delta = Math.abs(swiperPosition) / galleryWidth * 100 * stepCoeficient;

            //     galleryBg.style.transform = `translateX(${-delta}%)`;
            //     setIndention(visibleItem);

            // })
        });

        this.videoSlider.on('init', () => {
            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible .video-gallery__video-body');
            const visibleVideoParent = document.querySelectorAll('.swiper-slide-visible .video-gallery__item-wrap');
            const tl = new TimelineMax();
            const visibleTitle = Array.from(visibleVideoParent).map( elem => elem.parentNode.querySelector('.video-gallery__title'));

            Array.from(visibleVideoContainer).forEach( (elem) => {
                elem.style.width = elem.parentNode.clientWidth + 'px';
                elem.parentNode.style.width = 0;
            })

            tl
                .to(visibleTitle, 0, {
                    x: '-100%' ,
                    ease: Power2.easeOut
                })
                .staggerTo(visibleVideoParent, 0.5, {
                    x: 120,
                })
                .staggerTo(visibleVideoParent, 1, {
                    width: '100%',
                    x: 0 ,
                    ease: Power2.easeOut
                }, -0.4)
                .staggerTo(visibleTitle, 1, {
                    x: '0%' ,
                    ease: Power2.easeOut
                }, 0.2, '-=0.2')


            // this.visibleElemAmount = visibleVideoContainer.length;


            // Array.from(this.videoSlider.slides).forEach( (elem) => {
            //     setIndention(elem);
            // });

            // animateVissibleContent(visibleVideoContainer);
        });

        this.videoSlider.on('transitionStart', () => {

            const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible .video-gallery__video');

            this.pauseVideo(this.videoContainer);
            this.playVideo(visibleVideoContainer);

            // const transfromLimit = 30;
            // const galleryBg = document.querySelector('.video-gallery__bg');
            // const galleryWidth = this.videoSlider.virtualSize;
            // const windowWidth = window.innerWidth;
            // const windowHalfWidth = windowWidth / 2;

            // Array.from(visibleVideoContainer).forEach((visibleItem, index) => {
            //     const tl = new TimelineMax();
            //     const containerWidth = visibleItem.clientWidth;
            //     const imageContainer = visibleItem.querySelector('.video-gallery__img');
            //     const stepCoeficient = 0.1;

            //     if (imageContainer) {
            //         tl.to(imageContainer, sliderSpeed / 1000, {
            //             opacity: 1, ease: Power2.easeIn, onUpdate: () => {

            //                 const swiperPosition = this.videoSlider.wrapper[0].getBoundingClientRect().left;
            //                 const elemRectX = visibleItem.getBoundingClientRect().left;
            //                 const elemSlideValue = elemRectX + containerWidth / 2 - windowHalfWidth;

            //                 const delta = Math.abs(swiperPosition) / galleryWidth * 100 * stepCoeficient;

            //                 let percent = elemSlideValue / windowHalfWidth ;
            //                 if (percent > 1 ) {
            //                     percent = 1
            //                 } else if (percent < -1) {
            //                     percent = -1;
            //                 }
            //                 visibleItem.querySelector('.video-gallery__img').style.transform = `translateX(${transfromLimit * percent}%)`;
            //                 // visibleItem.querySelector('.video-gallery__title').style.transform = `translateX(${transfromLimit * percent * 0.5}%)`;
            //                 galleryBg.style.transform = `translateX(${-delta}%)`;

            //             }
            //         })
            //     }
            // })

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

    pauseVideo(videos) {
        Array.from(videos).forEach( video => {
            video.pause();
        });
    }

    playVideo(videos) {
        Array.from(videos).forEach( video => {
            video.play();
        });
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
        if( window.GLOBAL_OBJECT.preloader) {
            window.GLOBAL_OBJECT.preloader.close();
            window.GLOBAL_OBJECT.preloader = null;
        }
        this.initSlider();
        this.playButtonListener();
    }
}
