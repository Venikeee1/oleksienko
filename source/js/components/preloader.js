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
            .to(this.logoCircle, 1.1,{/*skewX: '-90deg'*/width: 0})
            .to('.preloader__bg', 0.8,{scale: 0})
            .to('.preloader__bg', 0.8,{opacity: 0, onComplete: () => {
                    this.preloaderContainer.parentNode.removeChild(this.preloaderContainer);
                }}, '-=0.6')
    }

    init() {
        this.animateLogo();
    }
}
