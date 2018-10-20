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
            effect: 'fade',
            init: false,
            allowTouchMove: true,
            slidesPerGroup: 1,
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

        });

        this.videoSlider.on('transitionStart', () => {

        });

        /*document.querySelector('.navigation-arrows__nav-arrow--left').addEventListener('click', (e) => {
            e.preventDefault();
            this.videoSlider.slidePrev();
        })

        document.querySelector('.navigation-arrows__nav-arrow--right').addEventListener('click', (e) => {
            e.preventDefault();
            this.videoSlider.slideNext();
        })*/

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
