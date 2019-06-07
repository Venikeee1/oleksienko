import Barba from 'barba.js';
import BarbaConfig from './barbaConfig';
import ScriptLoader from '../helper/scriptLoader';
import { addQueryParameterToLinkUrl } from "../helper/helper";


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

        const links = document.querySelector(container).querySelectorAll('a[href]:not(.menu__tel-item)');

        const checkCurrentLink = (e) => {
            const url = window.location.href;
            const hash = window.location.hash;
            let trimmedUrl = url;
            let newUrl = e.currentTarget.href;

            if ( url.indexOf('#') >= 0) {
                trimmedUrl = window.location.href.substring(0, window.location.href.indexOf('#'));
            }

            if(this.disablePageLink ) {
                e.preventDefault();
                e.stopPropagation();
            } else if( newUrl.indexOf('#') >= 0 && newUrl.substring(0, newUrl.indexOf('#')) !== trimmedUrl) {
                e.preventDefault();
                e.stopPropagation();

                let transitionName = e.currentTarget.getAttribute('data-transition') || 'defaultTransition';

                if( !window.isMobile) {
                    if( transitionName === 'homePageSwipe' || transitionName === 'projectSwipeLeft') {
                        transitionName = 'defaultTransition';
                    }
                }

                Barba.Pjax.getTransition =  () => {
                    return BarbaConfig[transitionName];
                };

                Barba.Pjax.goTo(e.currentTarget.href);
            }

            window.GLOBAL_OBJECT.menu.menuClose();
        };

        for(let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', checkCurrentLink);
        }
    }

    linkClicked() {
        Barba.Dispatcher.on('linkClicked', (el) => {

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

            if( !window.isMobile) {
                if( this.transitionName === 'homePageSwipe' || this.transitionName === 'projectSwipeLeft') {
                    this.transitionName = 'defaultTransition';
                }
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
        Barba.Dispatcher.on('transitionCompleted', () => {
            this.disablePageLink = false;

            addQueryParameterToLinkUrl();

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

    barbaParseResponse() {
        let originalFn = Barba.Pjax.Dom.parseResponse;

        Barba.Pjax.Dom.parseResponse = function(response) {
        // Reasine header links when page language changed

            const parser = new DOMParser();
            const el = parser.parseFromString(response, "text/html");
            const newLang = el.querySelector('.header__lang');
            const newLangList = newLang.querySelectorAll('.header__lang-link');
            const currentLangList = document.querySelectorAll('.header__lang-link');
            const newMenuLinks = el.querySelectorAll('.menu a');
            const currentMenuLinks = document.querySelectorAll('.menu a');
            const newLogo = el.querySelector('.logo__link');
            const currentLogo = document.querySelector('.logo__link');

            document.querySelector('.header__active-item').textContent = newLang.querySelector('.header__active-item').textContent;

            Array.from(currentLangList).map( (link, i) => {
                link.setAttribute('href', newLangList[i].getAttribute('href'));
                link.querySelector('.header__lang-item').textContent = newLangList[i].querySelector('.header__lang-item').textContent;
            });

            Array.from(currentMenuLinks).map( (link, i) => {
                link.setAttribute('href', newMenuLinks[i].getAttribute('href'));
                link.textContent = newMenuLinks[i].textContent;
            });

            currentLogo.setAttribute('href', newLogo.getAttribute('href'));

            addQueryParameterToLinkUrl();

            return originalFn.apply(Barba.Pjax.Dom, arguments);
        };
    }

    init() {
        Barba.Pjax.start();

        this.scriptLoader.setScript();
        this.linkClicked();
        this.barbaInitStateChange();
        this.disablePageNavigation('body');
        this.barbaTransitionEnd();
        this.barbaParseResponse();
    }
}










