import { TimelineLite } from "gsap";
import { HomePage } from './pages/homepage/homepage';
import { Menu } from "./components/menu";


document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    const PopupMenu = new Menu('.menu');
    const GLOBAL_OBJECT = {};

    GLOBAL_OBJECT.menu = PopupMenu;

    if(document.querySelector('.homepage')) {
        const activeScript = new HomePage(GLOBAL_OBJECT);
        PopupMenu.animationOnClose = true;
        activeScript.init();
    }

    PopupMenu.init();

});

// fix bug with ie11 that dont undertans the min-height for wrapper

