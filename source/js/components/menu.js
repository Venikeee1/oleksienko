export class Menu {
    constructor( selector, settings ) {
        this.menu = document.querySelector(selector);
        this.timeLine = new TimelineMax();
        this.settings = settings;
        this.beforeClose = () => {};
        this.burgerMenu =  document.querySelector('.header__menu-button');
        this.burger =  document.querySelector('.burger');
        this.animationOnClose = false;
    }

    menuOpen() {
        this.timeLine.clear();
        this.timeLine.staggerTo('.logo__animation', 0.5, { opacity: 1, y: 0}, 0.2)
            .to('.logo', 0.5, {opacity: 1, pointerEvents: 'auto'}, 0)
            .to('.logo__svg', 0.8, {fill: '#fff'}, 0)

    }

    menuClose() {
        this.beforeClose();
        this.timeLine.clear();
        if(this.animationOnClose) {
            this.timeLine
                .staggerTo('.logo__animation', 0.1, { opacity: 0, y: 30})
                .to('.logo__svg', 0.8, {fill: 'rgba(255, 255, 255, 0.5)'}, 0)
        }
    }

    checkSettings() {
        if(this.settings) {
            this.beforeClose = this.settings.beforeClose || this.beforeClose;
        }
    }

    addClickListeners() {
        document.querySelector('.header__menu-button').addEventListener('click', () => {

            this.menu.classList.toggle('active');
            this.burger.classList.toggle('active');

            if(document.querySelector('.menu').classList.contains('active')) {
                this.menuOpen();
            } else {
                this.menuClose();
            }
        })
    }

    init() {
        this.checkSettings();
        this.addClickListeners();
    }
}
