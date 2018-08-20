export class Prelaoder {
    constructor( onDisable ) {
        this.preloaderContainer = document.querySelector('.site-preloader');
        this.preloaderSvg = document.querySelector('.site-preloader__svg');
        this.svgLines = document.querySelectorAll('.site-preloader__lines');
        this.preloaderEnabel = true;
        this.onDisable = onDisable;
        this.timeLine = {};
    }

    animate() {
        let animationStage = 1;

        this.timeLine = new TimelineMax({ onComplete: () => {
    
            setTimeout(() => {
                this.timeLine.clear();

                if( this.preloaderEnabel ) {
                    animationStage = animationStage === 1 ? 2 : 1;
                    this.timeLine.to(this.preloaderSvg, 0.5, { fill: '#555', ease: Power2.easeOut},0.1);
                } else {
                    
                    if(this.onDisable) {
                        this.onDisable();
                    }
                    this.disable();
                }
            }, 1500)
        }});

        this.timeLine.to(this.preloaderSvg, 0.5, { fill: '#000', ease: Power2.easeOut},0.1);

        const updateCallBack = (timeLine) => {
            const progress = timeLine.progress();
            Array.from(this.svgLines).forEach( (elem, i) => {
                setTimeout(() => {
                    elem.setAttribute('stroke-dashoffset', 500 * animationStage + 500 * progress);
                }, 500 * i);
            })
        }

        this.timeLine.eventCallback("onUpdate", () => {
            updateCallBack(this.timeLine)
        });
    
    }

    disable() {
        this.preloaderContainer.style.opacity = 0;
        this.preloaderContainer.style.pointerEvents = 'none';
    }

    close() {
        this.preloaderEnabel = false;
    }

    init() {
        this.animate();
    }
}
