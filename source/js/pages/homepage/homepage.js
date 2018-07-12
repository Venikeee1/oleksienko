import {Slider} from "../../components/slider";
import {Prelaoder} from "../../components/preloader";

export class HomePage {
    constructor() {
        this.slider = {};
        this.letters = document.querySelectorAll('.dila__letter-container');
        this.letterAnimationTimeLine = new TimelineMax();
    }

    initSlider() {

        let currentTimeLine = new TimelineMax();


        const sliderSettings = {
            afterInit: () => { },
            animateNextSlide: (currentSlide, currentIndex, prevIndex) => {

                const tl = new TimelineMax();
                const redColor = '#df2032';

                currentTimeLine.clear();
                currentTimeLine = tl;

                if( currentIndex > 0 && prevIndex === 0) {

                    tl.to('.logo__wrapper',1.2,{top: 50, bottom: 'auto', ease: Power2.easeInOut})
                        .to('.logo__animation', 0.2,{opacity: 0},0)
                        .to('.logo__wrapper',1.2,{left: 105, x: '0%', ease: Power2.easeIn},0)
                        .to('.slider__dots--wrapper', 1.5, {y: '0%', ease: Power3.easeOut})
                        .to('.preloader__logo',1.2,{scale: 1, opacity: 0.5}, 0)
                        .to('.preloader__svg',1.2,{fill: '#fff'}, 0)

                    this.letterShowAnimation();


                } else if( currentIndex === 0) {

                    tl.to('.logo__wrapper',1.2,{ top: ( val, elem ) => {
                            return calcTopValueForLogo(elem);
                        },  ease: Power2.easeInOut})
                        .to('.logo__wrapper',1.2,{left: '47%', x: '-50%', ease: Power2.easeInOut},0)
                        .to('.preloader__logo',1.2,{scale: 0.8, opacity: 1}, 0)
                        .to('.preloader__svg',1.2,{fill: redColor}, 0)
                        .to('.logo__animation', 0,{y: 50})
                        .staggerTo('.logo__animation',0.9, {y: 0, opacity: 1}, 0.2)
                        .to('.slider__dots--wrapper', 0.9, {y: '105%', ease: Quad.easeOut},0)

                    this.letterAnimationTimeLine.clear();
                    this.letterHideAnimation();

                }

                if( currentIndex > 0 ) {
                    tl.to(currentSlide.querySelectorAll('.homepage__animation-title'), 0, {y: 15, opacity: 0},0)
                }

                if( currentIndex === 7 ) {

                    tl.to('.homepage__play-btn',0, {scale: 0},0)
                        .to('.homepage__play-btn', 2.4, {scale: 1}, 0.5)
                }

                tl.to(currentSlide.querySelector('.slide__number'), 0, {x: -45, opacity: 0},0)

                this.checkActiveLetter(currentIndex)

            },
            afterAnimationEnd: (currentSlide, currentIndex, prevIndex) => {
                const tl = new TimelineMax();

                if( currentIndex > 0 ) {
                    tl.staggerTo(currentSlide.querySelectorAll('.homepage__animation-title'), 0.8, {y: 0, opacity: 1}, 0.2,0);
                }

                tl.to(currentSlide.querySelector('.slide__number'), 1.2, {x: 0, opacity: 1},0);

            }
        };

        function calcTopValueForLogo(elem) {
            const windowHeight = window.innerHeight;
            const elemHeight = elem.clientHeight;
            const bottom = 200;

            return windowHeight - bottom - elemHeight;
        }

        this.slider = new Slider('.homepage__slides', sliderSettings);
        this.slider.init();

        window.addEventListener('resize', () => {

            if( this.slider && this.slider.currentIndex === 0) {
                const tl = new TimelineMax();

                tl.to('.logo__wrapper', 0.1,{ top: ( val, elem ) => {
                        return calcTopValueForLogo(elem);
                    },  ease: Power2.easeInOut})
            }
        })
    }

    letterShowAnimation() {
        this.letterAnimationTimeLine.to('.dila__letter-container', 0, {opacity: 0, x:45},0)
            .staggerTo('.dila__letter-container', 0.9, {opacity: 1, x: 0},0.2, 2.1)
    }

    letterHideAnimation() {
        const tl = new TimelineMax();
        tl.staggerTo('.dila__letter-container', 0.9, {opacity: 0, x: 45},0.1,0)
    }

    langChoose() {
        document.querySelector('.header__lang-btn').addEventListener('click', () => {
            document.querySelector('.header__lang-list').classList.toggle('active');
        })
    }

    checkActiveLetter( index ) {
        Array.from(this.letters).forEach( (letter) => {
            const itemIndex = letter.getAttribute('data-index');

            if( parseInt(itemIndex) === parseInt(index)) {
                letter.classList.add('active');
            } else {
                letter.classList.remove('active');
            }
        })
    }

    addEventListenersToLetters() {
        let activeLetter;

        Array.from(this.letters).forEach( (letter) => {

            letter.addEventListener('click', (e) => {
                e.preventDefault();

                const index = letter.getAttribute('data-index');

                if(activeLetter) {
                    activeLetter.classList.remove('active');
                }
                this.slider.goToSlide(index);
                letter.classList.add('active');
                activeLetter = letter;
            })
        })
    }

    init() {
        this.initSlider();
        this.langChoose();
        const preloader = new Prelaoder();
        preloader.init();
        this.addEventListenersToLetters();


        document.querySelector('.header__menu-button').addEventListener('click', () => {

            const tl = new TimelineMax();
            document.querySelector('.menu').classList.toggle('active');

            if(document.querySelector('.menu').classList.contains('active')) {
                tl.staggerTo('.logo__animation', 0.5, { opacity: 1, y: 0}, 0.2)
                    .to('.preloader__svg', 0.5, { fill: '#df2032',  opacity: 1}, 0);
            } else {
                tl.staggerTo('.logo__animation', 0.5, { opacity: 0, y: 30}, 0.2)
                    .to('.preloader__svg', 0.5, { fill: '#fff', opacity: 0.5}, 0);

            }

        })
    }
}

