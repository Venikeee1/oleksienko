export class Vacancy {
    constructor() {
        this.activeTab = null;
        this.tabList = document.querySelectorAll('.vacancy__list-item');
        this.tabListBtn = document.querySelectorAll('.vacancy__item-link');
        this.timeLine = new TimelineMax();
    }

    openTab(tab, event) {
        const height = tab.querySelector('.vacancy__slide-height').clientHeight;

        this.timeLine.to(tab, 0.4, {height: height, onComplete: () => {
                tab.style.height = 'auto'
            }});

        tab.classList.add('is-opened');
        event.target.classList.add('is-opened')
    }

    closeTab(tab, event) {
        this.timeLine.to(tab, 0.4, {height: 0});
        tab.classList.remove('is-opened');
        event.target.classList.remove('is-opened')
    }

    toggleTab(tab) {
        return (event) => {
            event.preventDefault();

            tab.classList.contains('is-opened')
                ? this.closeTab(tab, event)
                : this.openTab(tab, event)
        }
    }

    addListenersToTabBtn() {
        Array.from(this.tabListBtn).forEach(elem => {
            const dropDown = elem.parentNode.querySelector('.vacancy__item-description-wrapper');
            elem.addEventListener('click', this.toggleTab(dropDown));
        })
    }

    onInit() {
        window.GLOBAL_OBJECT.header.showLogoText();
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = false;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = false;
    }

    destroy() {
        window.GLOBAL_OBJECT.header.textAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.opacityAniamtaionAloud = true;
        window.GLOBAL_OBJECT.header.hideLogoText();
    }

    init() {
        this.onInit();
        this.addListenersToTabBtn();


        if (window.GLOBAL_OBJECT.preloader) {
            window.GLOBAL_OBJECT.preloader.close();
            window.GLOBAL_OBJECT.preloader = null;
        }
    }
}
