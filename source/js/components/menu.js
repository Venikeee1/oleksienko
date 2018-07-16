export class Menu {
    constructor( selector ) {
        const menu = document.querySelector(selector);
        this.timeLine = new TimelineMax();
    }

    menuOpen() {
        this.timeLine.staggerTo('.logo__animation', 0.5, { opacity: 1, y: 0}, 0.2)
            .to('.logo', 0.5, {opacity: 1, pointerEvents: 'auto'}, 0)
            .to('.logo__svg', 0.5, { fill: '#df2032',  opacity: 1}, 0);
    }

    menuClose() {
        this.timeLine.staggerTo('.logo__animation', 0.1, { opacity: 0, y: 30});

        if( this.slider.currentIndex === 0 ) {
            this.timeLine.to('.logo', 0.5, {opacity: 0, pointerEvents: 'none'}, 0)
        } else {
            this.timeLine.to('.logo__svg', 1.2, { fill: '#fff',  opacity: 0.5}, 0);
        }
    }
}