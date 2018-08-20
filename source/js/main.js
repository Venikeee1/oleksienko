import { TimelineLite } from "gsap";
import { HomePage } from './pages/homepage/homepage';
import { Menu } from "./components/menu";
import {Template} from "./components/template/template";
import {VideoGallery} from "./pages/videoGallery/videoGallery";
import {LanguageSelector} from "./components/languageSelecor";


document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const PopupMenu = new Menu('.menu');
    const GLOBAL_OBJECT = {};
    let ActiveScript = null;

    GLOBAL_OBJECT.menu = PopupMenu;

    new LanguageSelector();

    if(document.querySelector('.homepage')) {
        ActiveScript = new HomePage(GLOBAL_OBJECT);
        PopupMenu.animationOnClose = true;
    } else if(document.querySelector('.inner-page')) {
        ActiveScript = new Template();
        PopupMenu.animationOnClose = true;
    } else if(document.querySelector('.video-gallery')) {
        ActiveScript = new VideoGallery();
        PopupMenu.animationOnClose = true;
    }

    if( ActiveScript ) {
        ActiveScript.init();
    }

    PopupMenu.init();
});

// fix bug with ie11 that dont undertans the min-height for wrapper

