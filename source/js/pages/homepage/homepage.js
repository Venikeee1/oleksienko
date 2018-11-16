import {Slider} from "../../components/slider";
import {VideoPopup} from "../../components/videoPopup";
import Hammer from 'hammerjs';

export class HomePage {
    constructor( globalObj) {
        this.slider = {};
        this.firstScreenSlider = {};
        this.letters = document.querySelectorAll('.dila__letter-container');
        this.letterAnimationTimeLine = new TimelineMax();
        this.globalObj = globalObj;
        this.isFirstCallback = true;
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
                const logo = document.querySelector('.preloader__logo');
                const logoCircle = logo.querySelector('.preloader__circle');
                const timeLine = new TimelineMax();
        
                timeLine
                    .to(logo, 1.3,{scale: 0.8})
                    .to(logoCircle, 1.2,{width: 0})
                    .to('.preloader__animation',0, {y: 30, opacity: 0})
                    .staggerTo('.preloader__animation', 1.8, {y: 0, opacity: 1}, 0.4)
                    .to('.logo', 0, { opacity:0}, 0)
                    .to('.scroll-more', 0.8, {opacity: 1}, '-=0.6')

                if(window.GLOBAL_OBJECT.firstAnimation) {
                    timeLine
                        .to('.header', 0, {y: '-20', opacity: 0},0)
                        .to('.header', 1.3, {y: '0', opacity: 1}, 1)
                        .to('.scroll-more', 0, {opacity: 0},0)
                        .to('.red-squares', 0,{opacity: 0},0)
                }
            },
            touch: true,
            animateNextSlide: (currentSlide, currentIndex, prevIndex) => {

                window.GLOBAL_OBJECT.currentSlide = currentSlide;

                const tl = new TimelineMax();

                longListArray.forEach( (elem) => {
                    elem.nodeItem.setAttribute('href', elem.link + '#' + currentIndex);
                });

                currentTimeLine.clear();
                currentTimeLine = tl;

                if( currentIndex > 0 && prevIndex === 0) {
                   
                    this.letterShowAnimation();
                    this.sliderDotsAnimation();

                    /*if(window.GLOBAL_OBJECT.isPreviousProjectPage) {
                        document.querySelector('.logo').style.opacity = 1;
                        window.GLOBAL_OBJECT.isPreviousProjectPage = false;
                    } else {

                    }*/
                    this.logoAnimationShow();
                    //window.GLOBAL_OBJECT.header.showLogoText();
                    window.GLOBAL_OBJECT.header.isHidden = false;

                    this.firstScreenSlider.autoPlayDisable();

                } else if( currentIndex === 0) {

                    window.GLOBAL_OBJECT.header.isHidden = true;

                    tl
                        .to('.slider__dots--wrapper', 0.9, {y: '105%', ease: Quad.easeOut, onComplete: () => {
                                const tl = new TimelineMax()
                                tl.to('.red-squares', 0.5, {opacity: 0})
                            }},0)

                    this.letterAnimationTimeLine.clear();
                    this.letterHideAnimation();
                    this.logoAnimationHide();
                    this.firstScreenSlider.autoPlayEnable();

                }

                if( currentSlide.getAttribute('data-section') === 'footer') {
                    document.querySelector('.scroll-more--down').classList.remove('active');
                    document.querySelector('.scroll-more--up').classList.add('active');

                    window.GLOBAL_OBJECT.header.textAniamtaionAloud = false;

                }

                if( currentIndex > 0 && currentSlide.querySelectorAll('.rest-letters-animation')) {
                    tl
                        .to(currentSlide.querySelectorAll('.first-letter-animation'), 0, {y: 30, opacity: 0},0)
                        .to(currentSlide.querySelectorAll('.animation-title'), 0, {y: 20, opacity: 0},0)
                        .staggerTo(currentSlide.querySelectorAll('.first-letter-animation'), 1.8, {y: 0, opacity: 1, ease: Power2.easeOut},0,0.5)

                }

                if( currentSlide.getAttribute('data-section') === 'video' ) {

                    tl.to('.homepage__play-btn',0, {scale: 0},0)
                        .to('.video__line', 0, {height: '0%'}, 0)
                        .to('.homepage__play-btn', 2.4, {scale: 1}, '-=1.1')
                        .staggerTo('.video__line', 0.8, {height: '120%'}, 0.4)
                        .to('.homepage__play-triangle', 0.3, {x: '50%'})
                        .to('.homepage__play-triangle', 0.3, {x: '0%'})

                }

                if( currentSlide.getAttribute('data-section') === 'achievement' ) {
                    Array.from(document.querySelectorAll('.achievement__item')).forEach( (elem) => {
                        elem.style.opacity = 0;
                    })
                }

                if( currentSlide.getAttribute('data-section') !== 'footer') {
                    window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
                    window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;

                    tl.to(currentSlide.querySelector('.slide__number'), 0, {x: -45, opacity: 0},0)
                    if(!window.isMobile) {
                        tl.to('.logo__svg', 0.8, {opacity: 0.5}, 0.3)
                    }

                    window.GLOBAL_OBJECT.header.hideLogoText();
                }


                this.checkActiveLetter(currentIndex)

            },
            afterAnimationEnd: (currentSlide, currentIndex, prevIndex) => {
                const tl = new TimelineMax();



                if( currentIndex > 0 && currentSlide.getAttribute('data-section') !== 'footer') {

                    tl.staggerTo(currentSlide.querySelectorAll('.rest-letters-animation'), 0.8, {y: 0, opacity: 1}, 0)
                        
                        .staggerTo(currentSlide.querySelectorAll('.animation-title'), 1, {y: 0, opacity: 1},0.3, '-=0.8')

                    document.querySelector('.scroll-more--down').classList.add('active');
                    document.querySelector('.scroll-more--up').classList.remove('active');

                } else if(currentSlide.getAttribute('data-section') === 'footer') {

                    window.GLOBAL_OBJECT.header.showLogoText();
                    window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = false;
                }

                if( currentSlide.getAttribute('data-section') === 'achievement' ) {
                    const timeline = new TimelineMax();

                    timeline.staggerFromTo('.achievement__item', 0.9, { opacity: 0, y: 40}, { opacity: 1, y: 0},0.2,0.1)
                }

                if( currentSlide.querySelector('.slide__number')) {
                    tl.to(currentSlide.querySelector('.slide__number'), 1.2, {x: 0, opacity: 1},'-=0.5');
                }



            }
        };

        this.slider = new Slider('.homepage__slides', sliderSettings);
        this.slider.hashNavigation = true;
        this.slider.init();
    }

    initFirstScreenSlider() {

        const tl = new TimelineMax();
        const sliderSettings = {
            sliderStyle: 'fadeIn',
            autoplay: true,
            delay: 7000,
            animationTime: 4,
            touch: false,
            afterInit: (currentSlide)  => {

                tl.to(currentSlide, 12, {scale: 1.05});
            },
            animateNextSlide: (currentSlide, currentIndex, prevIndex) => {

                tl.clear();

                tl.to(currentSlide, 0, {scale: 1})
                    .to(currentSlide, 12, {scale: 1.05});

            },
            afterAnimationEnd: (currentSlide, currentIndex, prevIndex) => {

            }
        };

        this.firstScreenSlider = new Slider('.first-screen-slider', sliderSettings);
        this.firstScreenSlider.externalTimeLine = tl;
        this.firstScreenSlider.init();
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

        tl.to('.logo', 2, {opacity: 1}, 1);
    }

    logoAnimationHide() {
        /*const tl = new TimelineMax();

        tl.to('.logo', 0.5, {opacity: 0, pointerEvents: 'none'}, 0)*/
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
            return `<span class="rest-letters-animation"> ${words}</span>`
        }

        Array.from(titeles).map( (title) => {
            const result = wrap(title.textContent[0]) + wrapRest(title.textContent.slice(1));
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

    addSwipe() {
        const slides = document.querySelectorAll('.homepage__swiped-blocks');

        Array.from(slides).forEach( (slide) => {
            const hammer = new Hammer(slide);
            hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL , pointers: 1});
            hammer.on('swipeleft', () => {
                slide.querySelector('.homepage__view-project').click();
            });
        })
    }

    initVideoPopup() {

        const playBtn = document.querySelector('.homepage__play-btn');
        const iframeSrc = playBtn.getAttribute('data-iframe')

        playBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const videoPopup = new VideoPopup(iframeSrc);

            videoPopup.openPopup();
        })
    }


    checkForDisablingHover() {
        if(window.innerWidth < 1040) {
            Array.from(document.querySelectorAll('.dila__letter-container')).forEach( (elem) => {
                elem.classList.add('nohover');
            })
        } else {
            Array.from(document.querySelectorAll('.dila__letter-container')).forEach( (elem) => {
                elem.classList.remove('nohover');
            })
        }
    }

    destroy() {
        this.slider.destroy();
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.isHidden = false;
    }

    resizeWindow() {
        window.addEventListener('resize', () => {
            this.checkForDisablingHover();
        })
    }

    init() {
        window.GLOBAL_OBJECT.header.isHidden = true;
        this.initFirstScreenSlider();
        this.wrapFirstLetters();
        this.initVideoPopup();
        this.checkForDisablingHover();
        this.resizeWindow();
        this.addEventListenersToLetters();
        this.addSwipe();
        this.initSlider();
    }
}
