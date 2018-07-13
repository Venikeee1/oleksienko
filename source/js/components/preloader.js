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
            .to('.header', 0, {y: '-20', opacity: 0},0)
            .to(this.logoCircle, 1.1,{width: 0})
            .to('.logo__animation',0, {y: 30, opacity: 0})
            /*.to('.logo__wrapper', 1.2, {y: '0%',
                left: '47%',
                top: ( val, elem ) => {
                    return calcTopValueForLogo(elem);
                },
                ease: Power2.easeOut},'+=0.1')*/
            .staggerTo('.logo__animation', 1.1, {y: 0, opacity: 1}, 0.2)
            .to('.header', 0.8, {y: '0', opacity: 1}, '-=0.6')
            .to('.scroll-more', 0, {opacity: 0},0)
            .to('.red-squares', 0,{opacity: 0},0)
            .to('.scroll-more', 0.8, {opacity: 1}, '-=0.6')
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
