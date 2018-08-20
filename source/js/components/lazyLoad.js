export class LazyLoad {
    constructor( selector ) {
        this.imgList = document.querySelectorAll( selector );

        this.init();
    }

    getSrc( imgContainer ) {
        if(window.isMobile) {
            if(imgContainer.getAttribute('data-mobile-img') !== '') {
                return imgContainer.getAttribute('data-mobile-img');
            }
        } else if( imgContainer.getAttribute('data-desktop-img') !== '' ) {
            return imgContainer.getAttribute('data-desktop-img');
        }
    }

    setSrc( elem, src ) {
        elem.style.backgroundImage = `url(${src})`;
    }

    setLazyLoad() {
        Array.from(this.imgList).forEach( (imgElem) => {
            const result = this.getSrc(imgElem);

            if(result) {
                this.setSrc(imgElem, result)
            }
        })
    }

    init() {
        this.setLazyLoad();
    }
}