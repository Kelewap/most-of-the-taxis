var CIRCLE_RADIUS = 10;

function ActorRepresentation() {
    this._position = {
        x: 10,
        y: 20
    };

    this.render = function(context) {
        var circle = {
            x: this._position.x,
            y: this._position.y,
            radius: CIRCLE_RADIUS
        };
        drawCircle(circle, context);
    };

    this.move = function(vector) {
        this._position.x += vector.x;
        this._position.y += vector.y;
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