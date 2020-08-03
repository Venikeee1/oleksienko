import { TimelineLite } from "gsap";
import { Menu } from "./components/menu";
import { LanguageSelector } from "./components/languageSelecor";
import { BarbaLoader } from "./barba/barbaBootstrap";
import { Prelaoder } from "./components/preloader";
import { Settings } from "./global-settings/settings";
import { Header } from "./components/header";
import { addQueryParameterToLinkUrl } from "./helper/helper";


window.GLOBAL_OBJECT = Settings;
window.isMobile = false;

document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const Preloader = new Prelaoder();
    const PopupMenu = new Menu('.menu')
    const pageHeader = new Header();

    new LanguageSelector();

    Preloader.init();

    if(window.innerWidth < 768) {
        window.isMobile = true;
    }

    window.GLOBAL_OBJECT.menu = PopupMenu;
    window.GLOBAL_OBJECT.preloader = Preloader;
    window.GLOBAL_OBJECT.header = pageHeader;
    window.GLOBAL_OBJECT.queryString = window.location.search.replace('?','');
    PopupMenu.animationOnClose = true;

    addQueryParameterToLinkUrl();

    PopupMenu.init();
     new BarbaLoader();

    if(window.GLOBAL_OBJECT.preloader) {
        Preloader.disable();
    }

    window.GLOBAL_OBJECT.firstAnimation = false;
});
