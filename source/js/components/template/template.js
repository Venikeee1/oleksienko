import {Slider} from "../slider";
import {wrapFirstLetters} from "../../helper/helper";
import {innerPageInfo} from "../innerPageInfo/innerPageInfo";
import SimpleBar from 'simplebar';

export class Template {
    constructor() {
        this.slider = {};
        this.innerPopup = new innerPageInfo('.inner-page-info__wrapper');
    }

    initSlider() {

        let currentTimeLine = new TimelineMax();

        const sliderSettings = {
            afterInit: () => {
                const tl = new TimelineMax();

                currentTimeLine.clear();

                tl
                    .to('.rest-letters-animation', 0, {y: 2, opacity: 0}, 0)
                    .to('.first-letter-animation', 0, {y: 30, opacity: 0}, 0)
                    .to('.slide__number', 0, {x: -30, opacity: 0},0)
                    .to('.slide__description', 0, {y: 20, opacity: 0}, 0)
                    .to('.main-title', 0, {opacity: 1}, 0)
                    .staggerTo('.rest-letters-animation', 0.8, {y: 0, opacity: 1}, 0, 0)
                    .staggerTo('.first-letter-animation', 1.8, {
                        y: 0,
                        opacity: 1,
                        ease: Power2.easeOut
                    }, 0, 0)
                    .staggerTo('.slide__description', 1, {y: 0, opacity: 1},0.3, '-=1.1')
                    .to('.slider__dots--wrapper', 1.5, {y: '0%', ease: Power3.easeOut},0)
                    .to('.slide__number', 1.2, {x: 0, opacity: 1},'-=0.5')
                    .to('.red-square', 0, {opacity: 0, scale: 0}, 0)
                    .to('.red-squares', 0.1, {opacity: 1}, 0)
                    .staggerTo('.red-square', 0.5, {opacity: 1, scale: 1},0.1, 0)
                    .to('.scroll-more', 1.8, {opacity: 1}, 1.5)


                currentTimeLine = tl;
            },
            touch: true,
            animateNextSlide: (el, currentslide) => {
                const currentIndex = currentslide < 10 ? `0${currentslide + 1}` : currentslide + 1;
                const slideIndexContainer = document.querySelector('.slide__number-index');
                const tl = new TimelineMax();
                tl.to(slideIndexContainer, 0.5, {opacity: 0, onComplete: () => {
                        slideIndexContainer.textContent = currentIndex;
                    }} )
                    .to(slideIndexContainer, 0.5, {opacity: 1});


            },
            afterAnimationEnd: () => {

            }
        };

        this.slider = new Slider('.inner-page__slides', sliderSettings);
        this.slider.hashNavigation = true;
        this.slider.init();
    }

    showInnerPopup() {
        Array.from(document.querySelectorAll('.main-title')).forEach( (elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                this.innerPopup.open();
            })
        })

        document.querySelector('.more-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.innerPopup.open();
        })
    }

    customizeScrollBar() {
        if(window.innerWidth >= 768 ) {
            new SimpleBar(document.querySelector('.inner-page-info__text'));
        }
    }

    init() {
        wrapFirstLetters();
        this.initSlider();
        this.showInnerPopup();
        this.customizeScrollBar();
    }
}
