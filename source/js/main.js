import { TimelineLite } from "gsap";
import { Menu } from "./components/menu";
import { LanguageSelector } from "./components/languageSelecor";
import { BarbaLoader } from "./barba/barbaBootstrap";
import { Prelaoder } from "./components/preloader";
import { Settings } from "./global-settings/settings";


window.GLOBAL_OBJECT = Settings;
window.isMobile = false;

document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const Preloader = new Prelaoder();
    const PopupMenu = new Menu('.menu');

    new LanguageSelector();

    Preloader.init();

    if(window.innerWidth < 768) {
        window.isMobile = true;
    }

    window.GLOBAL_OBJECT.menu = PopupMenu;
    window.GLOBAL_OBJECT.preloader = Preloader;
    PopupMenu.animationOnClose = true;

    PopupMenu.init();
    const barba = new BarbaLoader();

    if(window.GLOBAL_OBJECT.preloader) {
        Preloader.disable();
    }

    window.GLOBAL_OBJECT.firstAnimation = false;
});
