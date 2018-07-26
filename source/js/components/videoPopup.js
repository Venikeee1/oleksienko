import {createElement} from "../helper/helper";

export class VideoPopup {
    constructor( iframeSrc ) {
        this.videoContainer = {};
        this.iframeSrc = iframeSrc;
        this.iframe = {};
        this.keyListener = {};

        this.init();
    }

    createPopup() {
        const videoPopup = createElement('div', 'video-popup');
        const videoPopupContainer = createElement('div','video-popup__container');
        const videoPopupInner = createElement('div','video-popup__inner');
        const videoPopupBg = createElement('div','video-popup__bg');
        const videoPopupBtn = createElement('button','video-popup__close')
        const iframe = createElement('iframe','video-popup__iframe')
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allowfullscreen', '');

        videoPopup.appendChild(videoPopupContainer);
        videoPopup.appendChild(videoPopupBtn);
        videoPopup.appendChild(videoPopupBg);
        videoPopupContainer.appendChild(videoPopupInner);
        videoPopupInner.appendChild(iframe);

        this.videoContainer = videoPopup;
        this.iframe = iframe;

        document.querySelector('body').appendChild(videoPopup);

    }

    openPopup() {
        this.setIframe();
        this.videoContainer.classList.add('active');
    }

    closePopup() {
        this.videoContainer.parentNode.removeChild(this.videoContainer);
        document.removeEventListener('keydown', this.closeKey);
    }

    setIframe() {
        this.iframe.setAttribute('src', this.iframeSrc);
    }

    addClickListeners() {
        document.querySelector('.video-popup__bg').addEventListener('click', (e) => {
            e.preventDefault();

            this.closePopup();
        });

        document.querySelector('.video-popup__close').addEventListener('click', (e) => {
            e.preventDefault();

            this.closePopup();
        })
    }



    addKeyListener() {

        this.closeKey = (e) => {
            const keyName = event.keyCode;

            if(keyName === 27) {
                this.closePopup();
            }
        };

        this.keyListener = document.addEventListener('keydown', this.closeKey);
    }

    init() {
        this.createPopup();
        this.addClickListeners();
        this.addKeyListener();
    }

}
