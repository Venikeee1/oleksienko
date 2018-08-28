import { TimelineLite } from "gsap";
import { HomePage } from './pages/homepage/homepage';
import { Menu } from "./components/menu";
import {Template} from "./components/template/template";
import {VideoGallery} from "./pages/videoGallery/videoGallery";
import {LanguageSelector} from "./components/languageSelecor";
import {BarbaLoader} from "./barba/barbaBootstrap";
import {Prelaoder} from "./components/preloader";


window.GLOBAL_OBJECT = {};
window.isMobile = false;

document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const preloader = new Prelaoder();
    const PopupMenu = new Menu('.menu');
    new LanguageSelector();

    preloader.init();

    if(window.innerWidth < 768) {
        window.isMobile = true;
    }

    window.GLOBAL_OBJECT.menu = PopupMenu;
    PopupMenu.animationOnClose = true;

    PopupMenu.init();
    const barba = new BarbaLoader();

    preloader.disable();
});

// fix bug with ie11 that dont undertans the min-height for wrapper

