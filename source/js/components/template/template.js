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

        const langList = document.querySelectorAll('.header__lang-link');
        const longListArray = [];
        let currentTimeLine = new TimelineMax();

        Array.from(langList).forEach( (elem) => {
            const langItem = {
                nodeItem: elem,
                link: elem.getAttribute('href')
            };
            
            longListArray.push(langItem);
        });

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
                const currentIndex = currentslide < 9 ? `0${currentslide + 1}` : currentslide + 1;
                const slideIndexContainer = document.querySelector('.slide__number-index');
                const tl = new TimelineMax();

                longListArray.forEach( (elem) => {
                    elem.nodeItem.setAttribute('href', elem.link + '#' + currentslide);
                });

                tl.to(slideIndexContainer, 0.5, {opacity: 0, onComplete: () => {
                        slideIndexContainer.textContent = currentIndex;
                    }} )
                    .to(slideIndexContainer, 0.5, {opacity: 1});

                if(el.getAttribute('data-section') === 'footer') {

                    tl
                        .to('.main__text', 0.2, {opacity: 0, pointerEvents: 'none'},0)
                        .to('.navigation-arrows__nav', 0.2, {opacity: 0, pointerEvents: 'none'},0)
                        .to('.slide__number', 0.5, {opacity: 0},0)
                        .to('.logo__svg', 0.8, {fill: '#fff'}, 0.3)


                    document.querySelector('.scroll-more--down').classList.remove('active');
                    document.querySelector('.scroll-more--up').classList.add('active');
                } else {
                    tl.to('.logo__svg', 0.8, {fill: 'rgba(255, 255, 255, 0.5)'}, 0.3)
                }

            },
            afterAnimationEnd: (el) => {
                const tl = new TimelineMax();

                if(el.getAttribute('data-section') !== 'footer') {
                    tl
                        .to('.main__text', 0.6, {opacity: 1, pointerEvents: 'auto'},0)
                        .to('.navigation-arrows__nav', 0.6, {opacity: 1,pointerEvents: 'auto'},0)
                        .to('.navigation-arrows__nav', 0.6, {opacity: 1,pointerEvents: 'auto'},0)
                        .to('.slide__number', 0.5, {opacity: 1},0);

                    document.querySelector('.scroll-more--down').classList.add('active');
                    document.querySelector('.scroll-more--up').classList.remove('active');
                }
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

        if(document.querySelector('.more-btn')) {
            document.querySelector('.more-btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.innerPopup.open();
            })
        }
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
