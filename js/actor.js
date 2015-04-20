var CIRCLE_RADIUS = 10;

//TODO: rename; this is a car! the actor representation is a fking car!!!
function ActorRepresentation() {
    this._position = {
        x: 20,
        y: 100
    };
    this.street = 0;
    this.traveledDist = 10;

    this.render = function(context) {
        var circle = {
            x: this._position.x,
            y: this._position.y,
            radius: CIRCLE_RADIUS
        };
        drawCircle(circle, context);
    };

    this.setPosition = function(x, y) {
        this._position.x = x;
        this._position.y = y;
    }
}

function Actor() {
    this._map = null;
    this._destination = null;

    this.getDecision = function(view) {
        return {
            velocityPercentage: 1.0,
            chosenStreet: view.availableStreets[ getRandomInt(0, view.availableStreets.length) ]
        }
    };
}

//TODO not here
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}