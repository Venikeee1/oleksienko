import Hammer from 'hammerjs';
import WheelIndicator from 'wheel-indicator';

let popstateCallback = null

export class Slider {
    constructor(selector, settings){
        this.sliderContainer = document.querySelector( selector );
        this.slides = document.querySelectorAll( `${selector}>*` );
        this.slideCount = this.slides.length;
        this.currentIndex = 0;
        this.hashNavigation = false;
        this.prevIndex = this.currentIndex;
        this.currentSlide = this.slides[this.currentIndex];
        this.delay = settings.delay || 800;
        this.animationTime = settings.animationTime || 400;
        this.autoPlayInterval = {};
        this.animationAloud = true;
        this.dots = [];
        this.hashList = [];
        this.activeDot = '';
        this.settings = settings;
        this.sliderStyle = 'slider';
        this.duration = 1.1;
        this.externalTimeLine = null;
        this.timeline = new TimelineMax();
        this.wheelIndicator = null;
        if(this.settings) {
            this.sliderStyle = this.settings.sliderStyle;
        }

        this.hammer = new Hammer(this.sliderContainer);
        this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL , pointers: 1});

    }

    setActiveSlide() {
        this.currentSlide.style.zIndex = 0;
        this.currentSlide = this.slides[this.currentIndex];
        this.currentSlide.style.zIndex = 5;
        this.setActiveDot();
    }

    nextSlide() {
        const tl = new TimelineMax();

        if ( this.currentIndex < this.slideCount - 1 && this.animationAloud) {

            this.animationAloud = false;
            this.animateSlide(-1);
        }
    }

    prevSlide() {
        if ( this.currentIndex > 0 && this.animationAloud) {
            this.animationAloud = false;
            this.animateSlide(1);
        }
    }

    animateSlide( direction ) {
        this.prevIndex = this.currentIndex;
        this.currentIndex = this.currentIndex - 1 * direction;
        this.setActiveSlide();
        this.settings.animateNextSlide( this.currentSlide, this.currentIndex, this.prevIndex );
        this.selectAnimation(1);
    }

    goToSlide( index ) {

        if( index !==  this.currentIndex) {
            this.animationAloud = false;
            this.prevIndex = parseInt(this.currentIndex);
            this.currentIndex = parseInt(index);
            this.setActiveSlide();
            this.settings.animateNextSlide( this.currentSlide, this.currentIndex, this.prevIndex );
            this.selectAnimation(index);
        }
    }

    autoPlay() {
        if( this.settings.autoplay) {

            this.autoPlayInterval = setInterval( () => {

                if(this.currentIndex === this.slides.length - 1) {
                    this.goToSlide(0);
                } else {
                    this.nextSlide();
                }
            }, this.delay);

        }
    }

    autoPlayEnable() {
        this.autoPlay();
        this.timeline.play();
        if(this.externalTimeLine) {
            this.externalTimeLine.play();
        }
    }

    autoPlayDisable() {
        clearInterval(this.autoPlayInterval);
        this.timeline.pause();
        if(this.externalTimeLine) {
            this.externalTimeLine.pause();
        }
    }

    createHashList() {
        Array.from(this.slides).forEach( elem => {
            this.hashList.push(elem.getAttribute('data-hash'));
        })
    }

    checkHash( fastMove ) {
        if( location.hash ) {
            const hash = location.hash.slice(1);
            const index = this.hashList.indexOf(hash);
            const duration = this.duration;

            if( fastMove ) {
                this.duration = 0;
            }

            if( index >= 0) {
                this.goToSlide(parseInt(index));
            }

            this.duration = duration;
        } else {
            const hashUrl = window.location.href + '#' + this.hashList[0];
            history.replaceState(null, '',hashUrl);
        }
    }

    selectAnimation( index ) {
        this.timeline =  new TimelineMax();

        if( this.settings.sliderStyle === 'fadeIn') {

            this.timeline.to(this.currentSlide, this.animationTime, {opacity: 1, onStart: ()=> {

                }, onComplete: ()=> {
                    this.animationAloud = true;
                    this.settings.afterAnimationEnd(this.currentSlide, this.currentIndex, this.prevIndex);
                }})
                .to( this.slides[this.prevIndex], this.animationTime, {opacity: 0}, 0);
        } else {
            const animationLength = this.currentIndex * 100;
            const slideValue = `-${animationLength}%`;


            this.timeline.to(this.sliderContainer.querySelector('.slider__wrapper'), this.duration, {y: slideValue , onStart: ()=> {
                }, onComplete: ()=> {
                    this.animationAloud = true;
                    if(this.duration === 0) {
                        setTimeout( () => {
                            this.settings.afterAnimationEnd(this.currentSlide, this.currentIndex, this.prevIndex);
                        }, 500)
                    } else {
                        this.settings.afterAnimationEnd(this.currentSlide, this.currentIndex, this.prevIndex);
                    }
                }, ease: Power2.easeInOut});
        }

        if(this.hashNavigation) {
            window.location.hash = this.hashList[this.currentIndex];
            history.replaceState(null, '', window.location.href);
        }
    }

    afterInitCallBack() {
        if(this.settings && this.settings.afterInit) {
            this.settings.afterInit(this.currentSlide);
        }
    }

    setActiveDot() {

        if( this.dots.length > 0 ) {

            if( this.activeDot ) {
                this.activeDot.classList.remove('active');
            }

            this.activeDot = this.dots[this.currentIndex];
            this.activeDot.classList.add('active');

        }
    }

    createSlidesWrapper() {

        const sliderWrapper = createElement('div','slider__wrapper');
        sliderWrapper.style.height = '100%';
        sliderWrapper.style.width = '100%';

        Array.from(this.slides).forEach( (elem, i) => {
            elem.setAttribute('data-hash', i);
            sliderWrapper.appendChild(elem);
            this.setSlideHeight(elem);
        });
        this.sliderContainer.appendChild(sliderWrapper);

        if( this.settings.sliderStyle === 'fadeIn' ) {
            sliderWrapper.classList.add('fadeIn');
        }
    }

    addClassesToSliderItems( slide ) {
        Array.from(this.slides).forEach( (slide) => {
            slide.classList.add('slider__item');
        })

        if( this.settings.sliderStyle === 'fadeIn' ) {
            this.currentSlide.style.opacity = 1;
        }
    }

    createDot(){
        return createElement('span','slider__dot');
    }

    setSlideHeight(slide) {
        slide.style.height = window.innerHeight + 'px';
    }

    createDots() {
        const dotsContainer = createElement('div','slider__dots');
        const dotsWrapper = createElement('div','slider__dots--wrapper');

        dotsContainer.appendChild(dotsWrapper);

        Array.from(this.slides).forEach( (elem, index) => {
            const dot = this.createDot();
            dot.setAttribute('data-index',index);
            dotsWrapper.appendChild(dot);
            this.dots.push(dot);

            this.addEventListenerToDots( dot );
        });

        this.sliderContainer.appendChild(dotsContainer);
    }

    addEventListenerToDots( dot ) {

        const index = dot.getAttribute('data-index');

        dot.addEventListener('click', () => {

            this.goToSlide(index);
        })
    }

    createNavigation() {
        const navBar = createElement('div', 'slider__nav');
        const buttonLeft = createElement('button', 'slider__button');
        const buttonRight = createElement('button', 'slider__button');
        buttonLeft.classList.add('slider__button--left');
        buttonRight.classList.add('slider__button--right');

        navBar.appendChild(buttonLeft);
        navBar.appendChild(buttonRight);

        buttonLeft.addEventListener('click', () => {
            this.prevSlide();
        });

        buttonRight.addEventListener('click', () => {
            this.nextSlide();
        });

        this.sliderContainer.appendChild(navBar);
    }

    addKeyListeners() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.keyCode;

            if(keyName === 40 || keyName === 32) {
                this.nextSlide();
            }

            if(keyName === 38) {
                this.prevSlide();
            }
        });
    }

    addMouseWheelIndicator() {
        this.wheelIndicator = new WheelIndicator({
            elem: this.sliderContainer,
            callback: (e)=> {

                if(e.direction == 'up') {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        })
    }

    addSwipeListeners() {
        if( this.settings.touch) {
            this.hammer.on('swipeup', () => {
                this.nextSlide();
            });

            this.hammer.on('swipedown', () => {
                this.prevSlide();
            });
        }
    }

    windowResize() {
        window.addEventListener('resize', () => {
            Array.from(this.slides).forEach( (slide) => {
                this.setSlideHeight(slide);
            })
        })
    }

    destroy() {
        this.wheelIndicator.destroy();
        this.hammer.destroy();
        window.removeEventListener('popstate', popstateCallback)
    }

    init(){
        this.createSlidesWrapper();
        this.addClassesToSliderItems();
        this.addKeyListeners();
        this.addMouseWheelIndicator();
        this.addSwipeListeners();
        this.createDots();
        this.createHashList();
        this.createNavigation();
        this.setActiveSlide();
        this.afterInitCallBack();
        this.autoPlay();
        this.windowResize();

        if(this.hashNavigation) {
            this.checkHash(true);
            popstateCallback = () => this.checkHash();
            window.addEventListener('popstate', popstateCallback)
        }
    }
}

function createElement( DOMelement, elementClass) {
    const element = document.createElement(DOMelement);
    element.classList.add(elementClass);

    return element;
}
