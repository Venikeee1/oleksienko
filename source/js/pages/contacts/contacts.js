export class Contacts {
    constructor() {

    }

    onInit() {
        window.GLOBAL_OBJECT.header.showLogoText();
        window.GLOBAL_OBJECT.header.fillWhite();
    }

    destroy() {
        window.GLOBAL_OBJECT.header.hideLogoText();
    }

    init() {
        this.onInit()
        if(document.querySelector('.site-preloader')) {
            document.querySelector('.site-preloader').style.display = 'none';
        }

    }
}
