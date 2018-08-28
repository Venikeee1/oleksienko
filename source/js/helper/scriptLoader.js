import {Template} from '../components/template/template';
import {HomePage} from '../pages/homepage/homepage';
import {Video} from '../pages/videoGallery/videoGallery';


export default class ScriptLoader {
    constructor() {
        this.scriptList = {
            'homepage': HomePage,
            'project' : Template,
            'video': Video
        }
    }

    checkPage () {
        this.currentPage = document.querySelector('.barba-container');
        this.currentPageNamespace = this.currentPage.getAttribute('data-namespace');
    }

    setScript() {
        this.checkPage();
        this.activeScript = new this.scriptList[this.currentPageNamespace]();
        this.activeScript.init();
    }
}
