import Barba from 'barba.js';

const mobileDelay = 0.5;

function checkMobile() {
    return window.innerWidth < 769 ? true : false;
}

function getMobileDelay() {
    return checkMobile() ? 0.5 : 0;
}

const swipeTransition = window.isMobile ? 0.8 : 1.3;

const LeftTransition = Barba.BaseTransition.extend({

    start: function(e) {

        Promise.all([this.newContainerLoading, this.animate()]).then(
            this.showNewPage.bind(this)
        );
    },

    animate: function() {

        window.GLOBAL_OBJECT.transitionPageTimeline.clear();

        const elemContainer = document.querySelector('.inner-page__slider');
        let timeline = new TimelineMax();

        let deferred = Barba.Utils.deferred();

        timeline
            .to('.slide__description', 0.5, {opacity: 0, y: 20})
            .to('.slider__dots--wrapper', 0.3, {opacity: 0},0)
            .to('.first-letter-animation', 0.5, {opacity: 0, y: 20},'-=0.3')
            .to('.rest-letters-animation', 0.5, {opacity: 0},'-=0.3')
            .to(elemContainer, swipeTransition, {x:'-100%', ease: Power2.easeInOut, onComplete: () => {
                deferred.resolve();
            }},0)

        if( !window.isMobile ) {
            timeline.to('.slide__value', 0.5,{opacity: 0},0)
        }

        return deferred.promise;
    },

    showNewPage: function() {
        let el = this.newContainer;
        this.oldContainer.visibility = 'hidden'; 

        el.style.visibility = 'visible'; 

        this.done();
    }
});

const RightTransition = Barba.BaseTransition.extend({



    start: function() {
        Promise.all([this.newContainerLoading, this.animate()]).then(
            this.showNewPage.bind(this)
        );
    },

    animate: function() {
        window.GLOBAL_OBJECT.transitionPageTimeline.clear();

        const elemContainer = document.querySelector('.inner-page__slider');
        let timeline = new TimelineMax();
        let deferred = Barba.Utils.deferred();


        timeline
            .to('.slide__description', 0.5, {opacity: 0, y: 20})
            .to('.slider__dots--wrapper', 0.3, {opacity: 0},0)
            .to('.first-letter-animation', 0.5, {opacity: 0, y: 20},'-=0.3')
            .to('.rest-letters-animation', 0.5, {opacity: 0},'-=0.3')
            .to(elemContainer, swipeTransition, {x:'100%',ease: Power2.easeInOut, onComplete: () => {
                deferred.resolve();
            }},0)

        if( !window.isMobile ) {
            timeline.to('.slide__value', 0.5,{opacity: 0},0)
        }

        return deferred.promise;
    },

    showNewPage: function() {
        let el = this.newContainer;
        this.oldContainer.visibility = 'hidden'; 

        el.style.visibility = 'visible'; 

        this.done();
    }
});

const homePageSwipe = Barba.BaseTransition.extend({

    start: function() {
        Promise.all([this.newContainerLoading, this.animate()]).then(
            this.showNewPage.bind(this)
        );
    },

    animate: function() {
        let timeline = new TimelineMax();

        let deferred = Barba.Utils.deferred();

        window.GLOBAL_OBJECT.currentSlide.style.overflow = 'visible';

        timeline
            .to(window.GLOBAL_OBJECT.currentSlide, swipeTransition, {x: '-100%', ease: Power2.easeInOut, onComplete: () => {
                deferred.resolve();
            }})
            
        return deferred.promise;
    },

    showNewPage: function() {
        let el = this.newContainer;
        this.oldContainer.visibility = 'hidden'; 

        el.style.visibility = 'visible'; 

        this.done();
    }
});

const projectSwipeLeft = Barba.BaseTransition.extend({

    start: function() {
        Promise.all([this.newContainerLoading, this.animate()]).then(
            this.showNewPage.bind(this)
        );
    },

    animate: function() {
        window.GLOBAL_OBJECT.transitionPageTimeline.clear();
        window.GLOBAL_OBJECT.isPreviousProjectPage = true;

        const elemContainer = document.querySelector('.inner-page__slider');
        let timeline = new TimelineMax();

        let deferred = Barba.Utils.deferred();


        timeline
            //.to('.slide__description', 0.5, {opacity: 0, y: 20})
            //.to('.slider__dots--wrapper', 0.3, {opacity: 0},0)
            //.to('.first-letter-animation', 0.5, {opacity: 0, y: 20},'-=0.3')
            //.to('.rest-letters-animation', 0.5, {opacity: 0},'-=0.3')
            .to('.inner-page', swipeTransition, {x: '100%', ease: Power2.easeInOut, onComplete: () => {
                    deferred.resolve();
                }},0)

        return deferred.promise;
    },

    showNewPage: function() {
        let el = this.newContainer;
        this.oldContainer.visibility = 'hidden';

        el.style.visibility = 'visible';

        this.done();
    }
});

const DefaultTransition = Barba.BaseTransition.extend({

    start: function() {
        Promise.all([this.newContainerLoading, this.animate()]).then(
            this.showNewPage.bind(this)
        )
    },

    animate: function() {
        let deferred = Barba.Utils.deferred();
        let timeline = new TimelineMax();

        timeline
            .to(this.oldContainer, 0.8, {opacity: 0, ease: Linear.easeNone, onComplete: () => {
                    deferred.resolve();
                }
            })
            .to('.logo', 0.8, {opacity: 1}, 0);

        return deferred.promise;
    },

    showNewPage: function() {
        let el = this.newContainer;
        let timeline = new TimelineMax();
        el.style.visibility = 'visible';

        timeline
            .to(this.newContainer, 0, {opacity: '0', visibility: 'visible', ease: Linear.easeNone})
            .to(this.oldContainer, 0.5, {opacity: '0', ease: Linear.easeNone,onComplete: () => {
                this.done();
            }})
            .to(this.newContainer, 0.5, {opacity: '1', ease: Linear.easeNone, })

        
    }
});

const barbaConfig = {
    leftTransition: LeftTransition,
    rightTransition: RightTransition,
    defaultTransition: DefaultTransition,
    homePageSwipe: homePageSwipe,
    projectSwipeLeft: projectSwipeLeft
}

export default barbaConfig;
