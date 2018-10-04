import {Template} from '../components/template/template';
import {HomePage} from '../pages/homepage/homepage';
import {VideoGallery} from '../pages/videoGallery/videoGallery';
import {Default} from '../components/default';
import {Contacts} from "../pages/contacts/contacts";
import {AllProjects} from "../pages/all-projects/allProjects";


export default class ScriptLoader {
    constructor() {
        this.scriptList = {
            'homepage': HomePage,
            'project' : Template,
            'video': VideoGallery,
            'contacts' : Contacts,
            'all_projects': AllProjects,
            'default': Default
        }
    }

    checkPage () {
        this.currentPage = document.querySelector('.barba-container');
        this.currentPageNamespace = this.currentPage.getAttribute('data-namespace');
    }

    setScript() {
        this.checkPage();
        if(this.scriptList[this.currentPageNamespace]) {
            this.activeScript = new this.scriptList[this.currentPageNamespace]();
        } else {
            this.activeScript = new this.scriptList.default();
        }

        this.activeScript.init();
    }
}
