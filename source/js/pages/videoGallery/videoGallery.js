import Swiper from 'swiper';

export class VideoGallery {
    constructor() {}

    init() {
        const videoSlider = new Swiper('.swiper-container', {
            mousewheelControl: true,
            keyboardControl: true,
            parallax: true,
            speed: 550,
            slidesPerView: 'auto',
            mousewheel:{
                enabled: true,
                eventsTarged: '.swiper-container'
            },
            keyboard:{
                enabled: true,
            },
            loop: false
        });

    }
}