export class Header {
    constructor() {
        this.container = document.querySelector('.header');
        this.logo = document.querySelector('.header .logo');
        this.logoText = this.container.querySelectorAll('.logo__animation');
        this.logoSvg = document.querySelector('.logo__svg');
        this.timeline = new TimelineMax();
        this.logoTimeLine = new TimelineMax();
        this.logoTextIsShown = false;
        this.opacityAniamtaionAloud = true;
        this.textAniamtaionAloud = true;
        this.isHidden = false;
        this.openLogoParams = {
            opacity: 1,
            y: 0
        };

        this.closeLogoParams = {
            opacity: 0,
            y: 30
        };

        this.prevSettings = {
            logoOpacity: 0.5,
            x: 30,
        };

        this.logoOpacity = 0.5;
    }

    fillWhite() {
        this.logoSvg.style.opacity = 1;
        this.logoTextIsShown = true;
    }

    hideLogo() {
        this.logoTimeLine.clear();
        this.logoTimeLine.to(this.logo, 0.6, {opacity: 0});
    }

    showLogo() {
        this.logoTimeLine.clear()
        this.logoTimeLine.to(this.logo, 0.6, {opacity: 1});
    }

    showLogoText() {

        if(this.isHidden) {
            this.showLogo();
        }
        this.timeline.clear();

        this.timeline.staggerTo(this.logoText, 0.4, this.openLogoParams, 0.1)

        this.timeline.to(this.logoSvg, 0.4, {opacity: 1}, 0);

    }

    hideLogoText() {

        this.timeline.clear();

        if(this.isHidden) {
            this.hideLogo();
        }

        if (this.textAniamtaionAloud) {
            this.timeline.staggerTo(this.logoText, 0.2, this.closeLogoParams, -0.1)
        }
        if(this.opacityAniamtaionAloud) {
            this.timeline.to(this.logoSvg, 0.4, {opacity: this.logoOpacity}, 0);
        }

    }
}
