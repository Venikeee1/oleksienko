export class innerPageInfo {
    constructor(selector) {
        this.pageInfoContainer = document.querySelector(selector);
        this.tl = new TimelineMax();
        this.header = document.querySelector('.header__inner');

        this.init();
    }

    open() {
        this.tl.clear();
        this.tl
            .to(this.header, 0.4, {opacity: 0})
            .to('.inner-page-info__head-item', 0, {opacity: 0, x: -20},0)
            .to('.inner-page-info--animation', 0, {opacity: 0, x: -20},0)
            .staggerTo('.inner-page-info__head-item', 0.6, {opacity: 1, x: 0},0.1)
            .staggerTo('.inner-page-info--animation', 0.6, {opacity: 1, x: 0},0.1, '-=0.5')

        this.pageInfoContainer.classList.add('is-open');
    }

    close() {
        this.tl.clear();
        this.pageInfoContainer.classList.remove('is-open');
        this.tl.to(this.header, 0.4, {opacity: 1});
    }

    clickListeners() {
        const closeBtn = this.pageInfoContainer.querySelector('.inner-page-info__close-btn');
        const closeBG = this.pageInfoContainer.querySelector('.inner-page-info__bg');

        closeBtn.addEventListener('click', () => {
            this.close();
        })

        closeBG.addEventListener('click', () => {
            this.close();
        })
    }

    keyPressListeners() {

        this.closeKey = (e) => {
            const keyName = event.keyCode;

            if(keyName === 27) {
                this.close();
            }
        };

        this.keyListener = document.addEventListener('keydown', this.closeKey);
    }

    init() {
        this.clickListeners();
        this.keyPressListeners();
    }
}
