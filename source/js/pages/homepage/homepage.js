import {Slider} from "../../components/slider";
import {Prelaoder} from "../../components/preloader";
import {VideoPopup} from "../../components/videoPopup";

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

                    tl
                        .to('.preloder__animation', 0.2,{opacity: 0},0)
                        .to('.logo__wrapper',0.8,{x: 40, y:120, opacity: 1, ease: Power2.easeIn},0)
                        .to('.preloader__logo',1.2,{scale: 1, opacity: 0.5}, 0)
                        .to('.preloader__svg',1.2,{fill: '#fff', opacity: 0}, 0)

                    this.letterShowAnimation();
                    this.sliderDotsAnimation();
                    this.logoAnimationShow();


                } else if( currentIndex === 0) {

                    tl
                        .to('.logo__wrapper',1.2,{x: '0', y: '0', opacity: 1, ease: Power2.easeInOut},0)
                        .to('.preloader__logo',1.2,{scale: 0.8, opacity: 1}, 0)
                        .to('.preloader__svg',1.2,{fill: redColor, opacity: 1}, 0)
                        .to('.preloder__animation', 0,{y: 50})
                        .staggerTo('.preloder__animation',0.9, {y: 0, opacity: 1}, 0.2)
                        .to('.slider__dots--wrapper', 0.9, {y: '105%', ease: Quad.easeOut, onComplete: () => {
                                const tl = new TimelineMax()
                                tl.to('.red-squares', 0.5, {opacity: 0})
                            }},0)

                    this.letterAnimationTimeLine.clear();
                    this.letterHideAnimation();
                    this.logoAnimationHide();

                }

                if( currentIndex > 0 ) {
                    tl
                        .to(currentSlide.querySelectorAll('.rest-letters-animation'), 0, {y: 2, opacity: 0},0)
                        .to(currentSlide.querySelectorAll('.first-letter-animation'), 0, {y: 30, opacity: 0},0)
                        .to(currentSlide.querySelectorAll('.animation-title'), 0, {y: 20, opacity: 0},0)

                }

                if( currentSlide.getAttribute('data-section') === 'video' ) {

                    tl.to('.homepage__play-btn',0, {scale: 0},0)
                        .to('.video__line', 0, {height: '0%'}, 0)
                        .to('.homepage__play-btn', 2.4, {scale: 1})
                        .staggerTo('.video__line', 0.8, {height: '120%'}, 0.4)
                        .to('.homepage__play-triangle', 0.2, {x: '50%'})
                        .to('.homepage__play-triangle', 0.2, {x: '0%'})
                        .to('.homepage__play-triangle', 0.2, {x: '50%'})
                        .to('.homepage__play-triangle', 0.2, {x: '0%'})
                }

                tl.to(currentSlide.querySelector('.slide__number'), 0, {x: -45, opacity: 0},0)

                this.checkActiveLetter(currentIndex)

            },
            afterAnimationEnd: (currentSlide, currentIndex, prevIndex) => {
                const tl = new TimelineMax();

                if( currentIndex > 0 ) {
                    tl.staggerTo(currentSlide.querySelectorAll('.rest-letters-animation'), 0.8, {y: 0, opacity: 1}, 0,0)
                        .staggerTo(currentSlide.querySelectorAll('.first-letter-animation'), 1.8, {y: 0, opacity: 1, ease: Power2.easeOut},0,0)
                        .staggerTo(currentSlide.querySelectorAll('.animation-title'), 1, {y: 0, opacity: 1},0.3, '-=1.1')

                }

                tl.to(currentSlide.querySelector('.slide__number'), 1.2, {x: 0, opacity: 1},'-=0.5');

            }
        };

        this.slider = new Slider('.homepage__slides', sliderSettings);
        this.slider.init();
    }

    letterShowAnimation() {
        this.letterAnimationTimeLine.to('.dila__letter-container', 0, {opacity: 0, x:45},0)
            .staggerTo('.dila__letter-container', 0.9, {opacity: 1, x: 0},0.2, 2.1)
    }

    letterHideAnimation() {
        const tl = new TimelineMax();
        tl.staggerTo('.dila__letter-container', 0.9, {opacity: 0, x: 45},0.1,0)
    }

    sliderDotsAnimation() {
        const tl = new TimelineMax();
        tl.to('.slider__dots--wrapper', 1.5, {y: '0%', ease: Power3.easeOut},1)
            .to('.red-squares', 0.5, {opacity: 1})
    }

    logoAnimationShow() {
        const tl = new TimelineMax();

        tl.to('.logo', 0.5, {opacity: 1, pointerEvents: 'auto'}, 0)
            .to('.logo__svg', 0.5, { fill: '#fff',  opacity: 0.5}, 0);
    }

    logoAnimationHide() {
        const tl = new TimelineMax();

        tl.to('.logo', 0.5, {opacity: 0, pointerEvents: 'none'}, 0)
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

    wrapFirstLetters() {
        const titeles = document.querySelectorAll('.main-title');

        function wrap( letter ) {
            return `<span class="first-letter-animation">${letter}</span>`
        }

        function wrapRest( words ) {
            return `<span class="rest-letters-animation">${words}</span>`
        }

        Array.from(titeles).map( (title) => {
            const result = wrap(title.textContent.slice(0,1)) + wrapRest(title.textContent.slice(1));
            title.innerHTML = result;
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

    initVideoPopup() {

        const playBtn = document.querySelector('.homepage__play-btn');
        const iframeSrc = playBtn.getAttribute('data-iframe')

        playBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const videoPopup = new VideoPopup(iframeSrc);

            videoPopup.setIframe();
            videoPopup.openPopup();
        })


    }

    init() {
        this.initSlider();
        this.langChoose();
        this.wrapFirstLetters();
        this.initVideoPopup();
        const preloader = new Prelaoder();
        preloader.init();
        this.addEventListenersToLetters();

        document.querySelector('.header__menu-button').addEventListener('click', () => {

            const tl = new TimelineMax();
            document.querySelector('.menu').classList.toggle('active');

            if(document.querySelector('.menu').classList.contains('active')) {
                tl.staggerTo('.logo__animation', 0.5, { opacity: 1, y: 0}, 0.2)
                    .to('.logo', 0.5, {opacity: 1, pointerEvents: 'auto'}, 0)
                    .to('.logo__svg', 0.5, { fill: '#df2032',  opacity: 1}, 0);
            } else {

                tl.staggerTo('.logo__animation', 0.1, { opacity: 0, y: 30})

                if( this.slider.currentIndex === 0 ) {
                    tl.to('.logo', 0.5, {opacity: 0, pointerEvents: 'none'}, 0)
                } else {
                    tl.to('.logo__svg', 1.2, { fill: '#fff',  opacity: 0.5}, 0);
                }
            }

        })
    }
}

