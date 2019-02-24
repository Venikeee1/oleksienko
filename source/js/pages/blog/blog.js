export class Blog {
    constructor() {

    }

    onInit() {
        window.GLOBAL_OBJECT.header.hideLogo();
    }

    destroy() {
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.hideLogoText();
    }


    init() {
        this.onInit();
        setTimeout(()=>{
            window.GLOBAL_OBJECT.preloader.disable()
        },500)
    }
}
