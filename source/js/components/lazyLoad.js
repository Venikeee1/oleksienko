export class LazyLoad {
    constructor() {
        this.imgList = null;
    }

    getSrc( imgContainer ) {
        if(!imgContainer) return;

        if(window.isMobile) {
            if(imgContainer.getAttribute('data-mobile-img') !== '') {
                return imgContainer.getAttribute('data-mobile-img');
            }
        } else if( imgContainer.getAttribute('data-desktop-img') !== '' ) {
            return imgContainer.getAttribute('data-desktop-img');
        }
    }

    setSrc( elem, src ) {
        if(!elem) return;

        if(elem.tagName.toLowerCase() === "img") {
            elem.setAttribute('src', src);
        } else {
            elem.style.backgroundImage = `url(${src})`;
        }

        elem.removeAttribute('data-desktop-img');
        elem.removeAttribute('data-mobile-img');
    }

    setLazyLoad(selector) {

        this.imgList = typeof selector === 'object' ? selector : document.querySelector( selector );

        const result = this.getSrc(this.imgList);

        if(result) {
            this.setSrc(this.imgList, result)
        }
    }
}
