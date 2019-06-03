import { showTel } from "../../helper/helper";

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
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = false;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = false;
    }

    destroy() {
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.hideLogoText();
        document.removeEventListener('keydown', this.onEscPress);
    }


    init() {
        this.onInit();
        this.keyPressListener();

        if (document.querySelector('.site-preloader')) {
            document.querySelector('.site-preloader').style.display = 'none';
        }

        showTel('.footer__phone-link');
    }
}
