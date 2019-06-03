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
        // ga('create', 'UA-121292739-1', auto);

        Barba.Dispatcher.on('initStateChange', (e) => {
            if ("ga" in window) {
                ga(function(tracker) {
                    tracker.set('page', location.pathname);
                    // Sends a pageview hit.
                    tracker.send('pageview');
                    console.log(ga, location.pathname)

                });
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

    barbaParseResponse() {
        var originalFn = Barba.Pjax.Dom.parseResponse;

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

// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-KH4QZT4');








