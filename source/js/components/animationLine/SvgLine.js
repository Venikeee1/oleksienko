import {TimelineLite, TweenLite} from "gsap";

export class SvgLine {
    constructor( SVGContainer, arrOfPolygons ) {
        this.arrOfPolygons = arrOfPolygons;
        this.SVGContainer = SVGContainer;
        this.timeLine = new TimelineMax();
        this.activeColor = 'lightBlack';
        this.colors = {
            lightBlack: '#19232b',
            black: '#415364'
        };

        this.init();
    }

    changeColor() {
        if( this.activeColor === 'lightBlack') {
            this.activeColor = 'black';
        } else {
            this.activeColor = 'lightBlack';
        }
        return this.colors[this.activeColor];
    }

    drawPolygons( callBack ) {

        const animationDuration = 0.4;

        this.arrOfPolygons.forEach((elem) => {
            this.timeLine.to( elem.polygonElement, 0.6, {attr: {points: elem.endPolygonPoints}, ease:  elem.easing }, '-=0.4')
        });

        //this.timeLine.to( this.SVGContainer, 0, {opacity: 1},0 )

        this.timeLine.to( this.SVGContainer, 0, {opacity: 1,onComplete: () => {

                if( callBack instanceof Function)  {
                    callBack();
                }
            }})
    }

    drawPolygonsFromTheEnd( callBack ) {

        this.arrOfPolygons.forEach((elem) => {
            elem.setPointsToPolygon(elem.reversedStartPolygonPoints);
        });

        this.arrOfPolygons.reverse();
        this.drawPolygons();
    }

    /*drawNewPolygons() {
        const animationDuration = 1.4;
        const timeLine = new TimelineMax();

        this.arrOfPolygons.forEach((elem) => {
            timeLine.to( elem.polygonElement, elem.duration, {attr: {points: elem.endPolygonPoints}, ease: Sine.easeOut}, 0)
        });
    }*/

    reverse() {
        this.arrOfPolygons.reverse();
        this.arrOfPolygons.forEach((elem) => {
            this.timeLine.to( elem.polygonElement, elem.duration, {attr: {points: elem.points}, ease:  elem.easing }, '-=0.055')
        });
    }

    createConnectedLine(  ) {
        this.arrOfPolygons.forEach((elem, i) => {

            /*if (i % 2 === 0) {
                elem.polygonElement.setAttribute('class', 'black-line');
                elem.polygonElement.style.fill = '#000';
                this.SVGContainer.appendChild(elem.polygonElement);
            } else {
                elem.polygonElement.setAttribute('class', 'light-black-line');
                this.SVGContainer.insertBefore(elem.polygonElement, this.SVGContainer.childNodes[0]);
            }*/

            this.SVGContainer.appendChild(elem.polygonElement);

            //this.arrOfPolygons[0].polygonElement.style.fill = 'url(#linear-gradient-dark-start)';
            //this.arrOfPolygons[this.arrOfPolygons.length -1].polygonElement.style.fill = 'url(#linear-gradient-dark-end)';
        });
    }

    addPolygon( polygon ) {
        this.arrOfPolygons.push( polygon );
    }

    morphPolygons() {
        this.arrOfPolygons.forEach((elem) => {
            elem.morph(0.8);
        });
    }

    mouseMoveListenr() {
        let debounce = true;

        window.addEventListener('mousemove', (e) => {
            if( debounce ) {

                debounce = !debounce;
                const mouseX = e.offsetX;
                const mouseY = e.offsetY;
               //console.log(mouseX, mouseY)

                setTimeout(() =>{
                    debounce = !debounce;
                },50)
            }
        })
    }

    init() {
        this.createConnectedLine();
        this.mouseMoveListenr();

        document.querySelector('.homepage-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.reverse();
            //this.drawPolygons();
        })
        //this.morphPolygons();
    }
}
