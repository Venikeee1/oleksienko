export class Prelaoder {
    constructor( onDisableCallBack ) {
        this.lines = document.querySelectorAll('.site-preloader__line');
        this.preloaderContainer = document.querySelector('.site-preloader');
        this.onDisableCallBack = onDisableCallBack;

        this.timeLine = new TimelineMax( {repeat: -1});
    }

    animate() {
        if( this.lines ) {
            this.timeLine.to( this.lines, 0, {height: '0%'})
                .staggerTo(this.lines, 0.8, {height: '120%'}, 0.4)
                .to( '.site-preloader', 0.8, {opacity: 0.5})
                .staggerTo(this.lines, 0.8, {height: '0%'}, 0.4)
        }
    }

    disable() {

    }

    close() {
        if(this.onDisableCallBack) {
            this.onDisableCallBack();
        }
        //this.timeLine.clear();
    }

    init() {
        this.animate();
    }
}
