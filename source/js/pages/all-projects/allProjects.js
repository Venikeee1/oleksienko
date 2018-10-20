import Swiper from 'swiper/dist/js/swiper';
import {VideoPopup} from "../../components/videoPopup";

export class AllProjects {
    constructor() {
        this.videoSlider = {};
        this.visibleElemAmount = 0;
    }

    initSlider() {
        const sliderSpeed = 550;

        this.videoSlider = new Swiper('.all-projects__list', {
            mousewheelControl: true,
            keyboardControl: true,
            speed: sliderSpeed,
            slidesPerView: 1,
            runCallbacksOnInit: true,
            init: true,
            allowTouchMove: true,
            slidesPerGroup: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
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

        });

        this.videoSlider.on('init', () => {
            // const visibleVideoContainer = document.querySelectorAll('.swiper-slide-visible .video-gallery__item-wrap');
            // console.log(visibleVideoContainer[0])
            console.log('init')
        });

        this.videoSlider.on('transitionStart', () => {
            console.log(this.videoSlider)
            const activeSlide = document.querySelector('.swiper-slide-active');
            const activeSlideImages = activeSlide.querySelectorAll('.all-projects__img');

            const prevSlide = this.videoSlider.slides[this.videoSlider.previousIndex];
            const prevSlideImages = prevSlide.querySelectorAll('.all-projects__img');



            const tl = new TimelineMax();
            const t2 = new TimelineMax();

            tl
                .to( activeSlideImages[0], 0.8, {scale: 1, opacity: 1} )
                .to( [activeSlideImages[1], activeSlideImages[3]], 0.8, {scale: 1, opacity: 1}, '-=0.6' )
                .to( [activeSlideImages[2], activeSlideImages[4], activeSlideImages[6]], 0.8, {scale: 1, opacity: 1}, '-=0.6' )
                .to( [activeSlideImages[5], activeSlideImages[7]], 0.8, {scale: 1, opacity: 1}, '-=0.6' )
                .to( activeSlideImages[8], 0.8, {scale: 1, opacity: 1}, '-=0.6' );

            t2
                .to( prevSlideImages, 0.3, {scale: 0.3, opacity: 0} )


            //slides
            //activeIndex
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

    }

    init() {
        if( window.GLOBAL_OBJECT.preloader) {
            window.GLOBAL_OBJECT.preloader.close();
            window.GLOBAL_OBJECT.preloader = null;
        }

        window.GLOBAL_OBJECT.header.fillWhite();

        this.initSlider();
        this.playButtonListener();
    }
}
