export class LanguageSelector {
    constructor(  ) {
        this.langChoose = document.querySelector('.header__lang-btn');
        this.headerLangList = document.querySelector('.header__lang-list');
        this.init();
    }

    addListeners() {
        this.langChoose.addEventListener('click', () => {
            this.headerLangList.classList.toggle('active');
        });

        document.querySelector('body').addEventListener('click', (e) => {
            if ( !e.target.classList.contains('header__active-item')) {
               this.headerLangList.classList.remove('active');
            }
        });
    }

    init() {
        this.addListeners();
    }
}