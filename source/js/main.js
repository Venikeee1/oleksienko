import { TimelineLite } from "gsap";
import { HomePage } from './pages/homepage/homepage';


document.addEventListener('DOMContentLoaded', () => {
    window.debug = true;
});

window.addEventListener('load', () => {

    if(document.querySelector('.homepage')) {
        const activeScript = new HomePage();
        activeScript.init();
    }

});

// fix bug with ie11 that dont undertans the min-height for wrapper

