export class Header {
    constructor() {
        this.container = document.querySelector('.header');
        this.logo = document.querySelector('.header');
        this.logoText = this.container.querySelectorAll('.logo__animation');
        this.logoSvg = document.querySelector('.logo__svg');
        this.timeline = new TimelineMax();
        this.logoTextIsShown = false;

        this.prevSettings = {
            logoOpacity: 0.5,
            x: 30,

        };
    }

    fillWhite() {
        this.logoSvg.style.opacity = 1;
        this.logoTextIsShown = true;
    }

    showLogoText() {

        const logoTextSettings = {
            opacity: 1,
            y: 0
        }

        this.timeline.clear();

        this.timeline
            .staggerTo(this.logoText, 0.4, logoTextSettings, 0.1 )
            .to(this.logoSvg, 0.4, {opacity: 1},0);

        //this.logoTextIsShown = true;
        this.prevSettings.logoOpacity = this.logoSvg.style.opacity;

        console.log()
    }

    hideLogoText() {

        if(this.logoTextIsShown) {
            const logoTextSettings = {
                opacity: 0,
                y: 30
            };

            this.timeline.clear();

            this.timeline
                .staggerTo(this.logoText, 0.2, logoTextSettings, -0.1 )
                .to(this.logoSvg, 0.4, {opacity: this.prevSettings.logoOpacity},0);

            //this.logoTextIsShown = false;

        }

        //this.logoTextIsShown = false;

    }
}
