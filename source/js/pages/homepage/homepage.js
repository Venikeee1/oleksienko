import {Slider} from "../../components/slider";
import {Prelaoder} from "../../components/preloader";

export class HomePage {
    constructor() {
        this.slider = {};
        this.letters = document.querySelectorAll('.dila__letter-container');
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
                        .to('.logo__wrapper',1.2,{left: 105, x: '0%', ease: Power2.easeInOut},0)
                        .to('.preloader__logo',1.2,{scale: 1, opacity: 0.5}, 0)
                        .to('.preloader__svg',1.2,{fill: '#fff'}, 0)

                } else if( currentIndex === 0) {

                    tl.to('.logo__wrapper',1.2,{ top: ( val, elem ) => {
                            return calcTopValueForLogo(elem);
                        },  ease: Power2.easeInOut})
                        .to('.logo__wrapper',1.2,{left: '47%', x: '-50%', ease: Power2.easeInOut},0)
                        .to('.preloader__logo',1.2,{scale: 0.8, opacity: 1}, 0)
                        .to('.preloader__svg',1.2,{fill: redColor}, 0)
                        .to('.logo__animation', 0,{y: 50})
                        .staggerTo('.logo__animation',0.9, {y: 0, opacity: 1}, 0.2)
                }

                if( currentIndex > 0 ) {
                    tl.to(currentSlide.querySelectorAll('.homepage__animation-title'), 0, {y: 15, opacity: 0},0)
                        .staggerTo(currentSlide.querySelectorAll('.homepage__animation-title'), 0.8, {y: 0, opacity: 1}, 0.2,0.6);
                }

                if( currentIndex === 7 ) {

                    tl.to('.homepage__play-btn',0, {scale: 0},0)
                        .to('.homepage__play-btn', 2.4, {scale: 1}, 0.5)
                }

                this.checkActiveLetter(currentIndex)

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

            if(sectionSlider.currentIndex === 0) {
                const tl = new TimelineMax();

                tl.to('.logo__wrapper', 0.1,{ top: ( val, elem ) => {
                        return calcTopValueForLogo(elem);
                    },  ease: Power2.easeInOut})
            }
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
        const preloader = new Prelaoder();
        preloader.init();
        this.addEventListenersToLetters();
    }
}

