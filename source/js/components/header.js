export class Header {
    constructor() {
        this.container = document.querySelector('.header');
        this.logo = document.querySelector('.header');
        this.logoText = this.container.querySelectorAll('.logo__animation');
        this.logoSvg = document.querySelector('.logo__svg');
        this.timeline = new TimelineMax();
        this.logoTextIsShown = false;
    }

    fillWhite() {
        this.logoSvg.style.fill = '#fff';
    }

    showLogoText() {
        const logoTextSettings = {
            opacity: 1,
            y: 0
        }
        this.timeline.clear();

        this.timeline
            .staggerTo(this.logoText, 0.4, logoTextSettings, 0.1 )
            .to(this.logoSvg, 0.4, {fill: '#fff'},0);

        this.logoTextIsShown = true;
    }

    hideLogoText() {

        if(this.logoTextIsShown) {
            const logoTextSettings = {
                opacity: 0
            };

            this.timeline.clear();
            this.timeline.staggerTo(this.logoText, 0.2, logoTextSettings );
            this.logoTextIsShown = false;

        }

    }
}
