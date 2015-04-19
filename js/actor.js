var CIRCLE_RADIUS = 10;
//TODO: inject WorldState/Config somehow

function ActorRepresentation() {
    this._position = {
        x: 20,
        y: 100,
        street: 0,
        traveledDist: 10,
        translatedX : 20,   //tmp
        translatedY : 100   //tmp
    };

    this.render = function(context) {
        var circle = {
            //x: this._position.x,
            //y: this._position.y,
            x: this._position.translatedX,  //tmp
            y: this._position.translatedY,  //tmp
            radius: CIRCLE_RADIUS
        };
        drawCircle(circle, context);
    };

    this.move = function(vector) {
        this._position.x += vector.x;
        this._position.y += vector.y;
        this._position.traveledDist += vector.x;    //tmp
    }
}

function Actor() {
    this._map = null;
    this._destination = null;

    this.getDecision = function() {
        //TODO getDecision parametrized by queue of events?
        //TODO: extract to some named entity Decision
        return {
            velocityPercentage: 1.0,
            direction: 1
        }
    };

    this.handleEvent = function(event) {

    };
}
