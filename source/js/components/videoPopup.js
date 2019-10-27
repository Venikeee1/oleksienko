import {createElement} from "../helper/helper";

export class VideoPopup {
    constructor( iframeSrc, videoSrc ) {
        this.videoContainer = {};
        this.iframeSrc = iframeSrc;
        this.videoSrc = videoSrc;
        this.isIframe = iframeSrc;
        this.iframe = {};
        this.videoPlayerSource = {};
        this.keyListener = {};

        this.init();
    }

    createPopup() {
        const videoPopup = createElement('div', 'video-popup');
        const videoPopupContainer = createElement('div','video-popup__container');
        const videoPopupInner = createElement('div','video-popup__inner');
        const videoPopupBg = createElement('div','video-popup__bg');
        const videoPopupBtn = createElement('button','video-popup__close')

        videoPopup.appendChild(videoPopupContainer);
        videoPopup.appendChild(videoPopupBtn);
        videoPopup.appendChild(videoPopupBg);
        videoPopupContainer.appendChild(videoPopupInner);

        this.isIframe
            ? this.appendIframe(videoPopupInner)
            : this.appendVideoPlayer(videoPopupInner)


        this.videoContainer = videoPopup;

        document.querySelector('body').appendChild(videoPopup);
    }

    appendIframe(HTMLelement) {
        const iframe = createElement('iframe','video-popup__iframe')
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allowfullscreen', '');

        this.iframe = iframe;
        HTMLelement.appendChild(iframe);
    }

    appendVideoPlayer(HTMLelement) {
        const videoPlayer = createElement('video','video-popup__player')
        const source = createElement('source','video-popup__source')
        source.setAttribute('type', 'video/mp4');
        videoPlayer.setAttribute('controls', 'true');
        videoPlayer.setAttribute('autoplay', false);

        videoPlayer.appendChild(source);
        HTMLelement.appendChild(videoPlayer);

        this.videoPlayerSource = source
    }

    openPopup() {
        this.isIframe
            ? this.setIframe()
            : this.setVideoSource()
        this.videoContainer.classList.add('active');
    }

    closePopup() {
        this.videoContainer.parentNode.removeChild(this.videoContainer);
        document.removeEventListener('keydown', this.closeKey);
    }

    setIframe() {
        this.iframe.setAttribute('src', this.iframeSrc);
    }

    setVideoSource() {
        this.videoPlayerSource.setAttribute('src', this.videoSrc);
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
