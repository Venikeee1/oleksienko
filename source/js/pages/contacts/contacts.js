export class Contacts {
    constructor() {

    }

    onEscPress(event) {

        const keyName = event.keyCode;
        if (keyName === 27) {
            window.GLOBAL_OBJECT.menu.menuOpen();
        }
    }

    keyPressListener() {
        document.addEventListener('keydown', this.onEscPress)
    }

    onInit() {
        window.GLOBAL_OBJECT.header.showLogoText();
        window.GLOBAL_OBJECT.header.fillWhite();
    }

    destroy() {
        window.GLOBAL_OBJECT.header.hideLogoText();
        document.removeEventListener('keydown', this.onEscPress);
    }


    init() {
        this.onInit();
        this.keyPressListener();

        if (document.querySelector('.site-preloader')) {
            document.querySelector('.site-preloader').style.display = 'none';
        }

    }
}
