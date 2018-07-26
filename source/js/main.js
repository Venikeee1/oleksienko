import { TimelineLite } from "gsap";
import { HomePage } from './pages/homepage/homepage';
import { Menu } from "./components/menu";
import {Template} from "./components/template/template";
import {VideoGallery} from "./pages/videoGallery/videoGallery";


document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const PopupMenu = new Menu('.menu');
    const GLOBAL_OBJECT = {};
    let ActiveScipt = {};

    GLOBAL_OBJECT.menu = PopupMenu;

    if(document.querySelector('.homepage')) {
        ActiveScipt = new HomePage(GLOBAL_OBJECT);
        PopupMenu.animationOnClose = true;
    } else if(document.querySelector('.inner-page')) {
        ActiveScipt = new Template();
        PopupMenu.animationOnClose = true;
    } else if(document.querySelector('.video-gallery')) {
        ActiveScipt = new VideoGallery();
        PopupMenu.animationOnClose = true;
    }

    if(ActiveScipt) {
        ActiveScipt.init();
    }

    PopupMenu.init();
});

// fix bug with ie11 that dont undertans the min-height for wrapper

