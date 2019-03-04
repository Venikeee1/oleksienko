export class Blog {
    constructor() {

    }

    onInit() {
        window.GLOBAL_OBJECT.header.hideLogo();
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('#barba-wrapper').style.overflow = 'auto';
        document.querySelector('.barba-container').style.overflow = 'auto';
    }

    destroy() {
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.hideLogoText();
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('#barba-wrapper').style.overflow = 'hidden';
        document.querySelector('.barba-container').style.overflow = 'hidden';
    }


    init() {
        this.onInit();
        setTimeout(()=>{
            window.GLOBAL_OBJECT.preloader.disable()
        },200)
    }
}
