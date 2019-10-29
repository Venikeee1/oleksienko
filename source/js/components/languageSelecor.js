export class LanguageSelector {
    constructor(  ) {
        this.langChoose = document.querySelector('.header');
        this.headerLangList = document.querySelector('.header__lang-list');
        this.init();
    }

    addListeners() {
        this.langChoose.addEventListener('click', (e) => {
            if(e.target.closest('.header__lang-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.headerLangList.classList.toggle('active');
            }
        });

        Array.from(document.querySelectorAll('.header__lang-link')).forEach( (elem) => {
            elem.addEventListener('click', () => {
                this.headerLangList.classList.toggle('active');
            })
        })

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
