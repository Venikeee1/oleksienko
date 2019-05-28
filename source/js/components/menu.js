import { showTel } from "../helper/helper";

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
        window.GLOBAL_OBJECT.header.showLogoText();

        this.menu.classList.add('active');
        this.burger.classList.add('active');

        if (typeof ga === 'function') {
            ga('send', 'screenview', {screenName: 'Menu'});
        }
    }

    menuClose() {
        this.beforeClose();
        this.timeLine.clear();

        this.menu.classList.remove('active');
        this.burger.classList.remove('active');
        if(this.animationOnClose) {
            window.GLOBAL_OBJECT.header.hideLogoText();
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
        showTel('.menu__tel-item');
    }
}
