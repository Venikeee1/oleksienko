import Barba from 'barba.js';
import BarbaConfig from './barbaConfig';
import ScriptLoader from '../helper/scriptLoader';


export class BarbaLoader {
    constructor(headerModule) {
        this.disablePageLink = false;
        this.HeaderModule = headerModule;
        this.scriptLoader = new ScriptLoader();
        this.transitionName = '';

        this.init();
    }

    /* disable refreshing page when link to the same page*/
    disablePageNavigation( container ) {

        const links = document.querySelector(container).querySelectorAll('a[href]');

        const checkCurrentLink = (e) => {
            const url = window.location.href;
            const hash = window.location.hash;
            let trimmedUrl = url;

            if ( url.indexOf('#') >= 0) {
                trimmedUrl = window.location.href.substring(0, window.location.href.indexOf('#'));
            }

            if(e.currentTarget.href === trimmedUrl || this.disablePageLink ) {
                e.preventDefault();
                e.stopPropagation();
            } else if( e.currentTarget.href.indexOf('#') >= 0) {
                e.preventDefault();
                e.stopPropagation();
                Barba.Pjax.goTo(e.currentTarget.href);
            }
        };

        for(let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', checkCurrentLink);
        }
    }

    linkClicked() {
        Barba.Dispatcher.on('linkClicked', (el,e) => {

            this.disablePageLink = true;
            this.transitionName = el.getAttribute('data-transition');
            this.transitionName = this.transitionName || 'defaultTransition';
            
            const url = el.getAttribute('href');
            let trimmedUrl = url;
           
            el.setAttribute('href', trimmedUrl);

            if(this.scriptLoader.activeScript.removeSwipeListeners) {
                this.scriptLoader.activeScript.removeSwipeListeners();
                this.scriptLoader.activeScript.wheelIndicator.turnOff();
            }

            Barba.Pjax.getTransition =  () => {
                return BarbaConfig[this.transitionName];
            };

        });
    }

    barbaInitStateChange() {
        Barba.Pjax.getTransition =  () => {
            return BarbaConfig.defaultTransition;
        };
        Barba.Dispatcher.on('initStateChange', (event) => {

            Barba.Pjax.getTransition =  () => {

                this.transitionName =  'defaultTransition';
                return BarbaConfig[this.transitionName];
            };

        });
    }

    barbaTransitionEnd() {

        Barba.Dispatcher.on('initStateChange', (e) => {
            if (typeof ga === 'function') {
                ga('send', 'pageview', location.pathname);
            }
        })

        Barba.Dispatcher.on('transitionCompleted', () => {
            this.disablePageLink = false;


            if( this.scriptLoader.activeScript.destroy ) {
                this.scriptLoader.activeScript.destroy();
            }
            this.disablePageNavigation('.barba-container');

            this.scriptLoader.setScript();

            if (Barba.HistoryManager.currentStatus().namespace === 'homepage') {
                document.querySelector('.header').classList.add('header__main');
            } else {
                document.querySelector('.header').classList.remove('header__main');
            }
        });
    }

    init() {
        Barba.Pjax.start();

        this.scriptLoader.setScript();
        this.linkClicked();
        this.barbaInitStateChange();
        this.disablePageNavigation('body');
        this.barbaTransitionEnd();
    }
}










