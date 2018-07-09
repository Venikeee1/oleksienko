//import TimelineMax from "gsap";

export class Prelaoder {
    constructor() {
        this.preloaderContainer = document.querySelector('.preloader');
        this.logo = document.querySelector('.preloader__logo');
        this.logoCircle = this.logo.querySelector('.preloader__circle');
        this.timeLine = new TimelineMax();
    }

    animateLogo() {
        this.timeLine
            .to(this.logo, 0.9,{scale: 0.8})
            .to('.header', 0, {y: '-50', opacity: 0},0)
            .to(this.logoCircle, 1.1,{width: 0})
            .to('.logo__animation',0, {y: 30, opacity: 0})

            .to('.preloader__bg',1.3,{opacity: 0, onComplete: () => {
                    this.preloaderContainer.parentNode.removeChild(this.preloaderContainer);
                }}, '+=0.5')
            .to('.logo__wrapper', 1.2, {y: '0%',
                left: '47%',
                top: ( val, elem ) => {
                    return calcTopValueForLogo(elem);
                },
                ease: Power2.easeOut},'+=0.1')
            .staggerTo('.logo__animation', 1.1, {y: 0, opacity: 1}, 0.2)
            .to('.header', 0.6, {y: '0', opacity: 1}, '-=0.6')
            .to('.slider__dot', 0, {y: '20', opacity: 0},0)
            .to('.scroll-more', 0, {opacity: 0},0)
            .to('.red-squares', 0,{opacity: 0},0)
            .staggerTo('.slider__dot', 0.6, {y: '0', opacity: 1}, 0.1)
            .to('.red-squares', 0.6, {opacity: 1})
            .to('.dila__letter-container', 0, {opacity: 0, x: 25},0)
            .staggerTo('.dila__letter-container', 0.6, {opacity: 1, x: 0},0.15, '-=1.8')
            .to('.scroll-more', 0.8, {opacity: 1}, '-=0.6')





        /*.to('.logo__animation',0, {y: 50, opacity: 0})
        .staggerTo('.logo__animation',0.9, {y: 0, opacity: 1}, 0.2)*/
    }

    init() {
        this.animateLogo();
    }
}

function calcTopValueForLogo(elem) {
    const windowHeight = window.innerHeight;
    const elemHeight = elem.clientHeight;
    const bottom = 200;

    return windowHeight - bottom - elemHeight;
}
