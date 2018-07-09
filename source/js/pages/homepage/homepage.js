import {Slider} from "../../components/slider";
import {Prelaoder} from "../../components/preloader";

export class HomePage {
    constructor() {

    }

    initSlider() {

        const sliderSettings = {
            afterInit: () => {console.log('afterInit')},
            animateNextSlide: () => {
                const tl = new TimelineMax();
                tl.to('.logo__wrapper',1.2,{top: 50, y: 0, ease: Power2.easeInOut})
                    .to('.logo__wrapper',1.2,{left: 105, x: 0, ease: Power2.easeInOut},0)
                    .to('.preloader__logo',1.2,{scale: 1, opacity: 0.5}, 0)
                    .to('.preloader__svg',1.2,{fill: '#fff'}, 0)

            }
        };

        const sectionSlider = new Slider('.homepage__slides', sliderSettings);
        sectionSlider.init();
    }

    init() {
        const preloader = new Prelaoder();
        preloader.init();
        this.initSlider();
    }
}

