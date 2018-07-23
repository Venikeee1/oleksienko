import {Slider} from "../slider";
import {wrapFirstLetters} from "../../helper/helper";
import {innerPageInfo} from "../innerPageInfo/innerPageInfo";

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
                    .to('.red-squares', 0.5, {opacity: 1}, 1)
                    .to('.scroll-more', 1.8, {opacity: 1}, 1)


                currentTimeLine = tl;
            },
            touch: true,
            animateNextSlide: () => {

            },
            afterAnimationEnd: () => {

            }
        };

        this.slider = new Slider('.inner-page__slides', sliderSettings);
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

    init() {
        wrapFirstLetters();
        this.initSlider();
        this.showInnerPopup();
    }
}
