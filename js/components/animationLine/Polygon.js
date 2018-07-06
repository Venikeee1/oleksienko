export class Polygon {
    constructor( polygonParameters) {
        this.polygonPointsCords = polygonParameters.cords.split(/\s+/);
        this.startCords = [];
        this.endCords =  [];
        this.points = '';
        this.startPolygonPoints = '';
        this.endPolygonPoints = '';
        this.reversedStartPolygonPoints = '';
        this.duration = polygonParameters.parameters.duration;
        this.easing = polygonParameters.parameters.easing;
        //this.opacity = polygonParameters.parameters.opacity;
        this.class = polygonParameters.parameters.class;
        this.polygonElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        this.init();
    }

    cordsStringToArray() {
        this.startCords = this.polygonPointsCords[0] + ' ' + this.polygonPointsCords[1] + ' ' + this.polygonPointsCords[1] + ' ' + this.polygonPointsCords[0];
        this.endCords =  this.polygonPointsCords[0] + ' ' + this.polygonPointsCords[1] + ' ' +  this.polygonPointsCords[2] + ' ' + this.polygonPointsCords[3];
    }

    createStartEndPolygons() {
        this.startPolygonPoints = this.startCords;
        this.endPolygonPoints = this.endCords;
    }

    createReversedStartPolygons() {
        this.reversedStartPolygonPoints = this.polygonPointsCords[2] + ' ' + this.polygonPointsCords[3] + ' ' +  this.polygonPointsCords[2] + ' ' + this.polygonPointsCords[3];
    }

    morph( percentegeX = 1, percentegeY = 1 ) {
        this.endPolygonPoints = this.startCords[0][0] * percentegeX + ',' + this.startCords[0][1] * percentegeY +
            ' ' + this.startCords[1][0] * percentegeX + ',' + this.startCords[1][1] * percentegeY +
            ' ' + this.endCords[1][0] * percentegeX + ',' + this.endCords[1][1] * percentegeY +
            ' ' + this.endCords[0][0] * percentegeX + ',' + this.endCords[0][1] * percentegeY;

        this.createCoefficientFromMouseMove();
    }

    createCoefficientFromMouseMove( mouseX, mouseY) {
        const top =  this.Cords.top;
        const left =  this.Cords.left;
        let coefficientX = 1;
        let coefficientY = 1;

        const difX = (mouseX - left) / mouseX;
        const difY = (mouseY - top) / mouseY;

        if( difX <= 1) {
            coefficientX = difX
        }

        if( difY <= 1) {

        }

    }

    setPointsToPolygon( points ) {
        this.points = points;
        this.polygonElement.setAttribute('points', this.points);
    }

    init() {
        this.cordsStringToArray();
        this.createStartEndPolygons();
        this.createReversedStartPolygons();
        this.polygonElement.setAttribute('class', this.class);
        this.setPointsToPolygon( this.startPolygonPoints );
    }
}