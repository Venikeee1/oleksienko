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
            .to('.logo', 0.5, {opacity: 1}, 0)
            .to('.logo__svg', 0.8, {opacity: 1}, 0)

        this.menu.classList.add('active');
        this.burger.classList.add('active');

    }

    menuClose() {
        this.beforeClose();
        this.timeLine.clear();

        this.menu.classList.remove('active');
        this.burger.classList.remove('active');
        if(this.animationOnClose) {
            if(!window.GLOBAL_OBJECT.header.logoTextIsShown) {
                this.timeLine
                    .staggerTo('.logo__animation', 0.1, { opacity: 0, y: 30})
                    .to('.logo__svg', 0.8, {opacity: 0.5}, 0)
            }

        }
    }

    checkSettings() {
        if(this.settings) {
            this.beforeClose = this.settings.beforeClose || this.beforeClose;
        }
    }

    addClickListeners() {
        this.burgerMenu.addEventListener('click', () => {

            if(document.querySelector('.menu').classList.contains('active')) {
                this.menuClose();
            } else {
                this.menuOpen();
            }
        })

        Array.from(document.querySelectorAll('.menu__link')).forEach( (link) => {
            link.addEventListener('click', () => {
                this.menuClose();
            })
        })

        Array.from(document.querySelectorAll('.menu__info-link')).forEach( (link) => {
            link.addEventListener('click', () => {
                this.menuClose();
            })
        })
    }

    init() {
        this.checkSettings();
        this.addClickListeners();
    }
}
