export class Prelaoder {
    constructor( onDisableCallBack ) {
        this.preloaderContainer = document.querySelector('.site-preloader');
        this.onDisableCallBack = onDisableCallBack;
        this.logo = document.querySelector('.site-preloader__logo');
        this.animationAloud = true;

        this.timeLine = new TimelineMax();
    }

    animate() {

    }

    disable() {
        this.animationAloud = false;
    }

    close() {
        this.timeLine
            .to(this.logo, 0.5, {scale: '0', onStart:() => {

                    this.logo.style.animationName = 'lol';
                    this.logo.style.transform = 'scale(1.2)';
                }})
            .to(this.preloaderContainer, 0.4, {opacity: 0, pointerEvents: 'none', onComplete: () => {
                    this.preloaderContainer.parentNode.removeChild(this.preloaderContainer);
                }})
    }

    interval() {
        this.interval = setInterval(() => {
            if( !this.animationAloud ) {
                if(this.onDisableCallBack) {
                    this.onDisableCallBack();
                }
                clearInterval(this.interval);
                this.close();
            }
        }, 2000)
    }

    init() {
        this.interval();
    }
}
