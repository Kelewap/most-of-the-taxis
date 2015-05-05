var CIRCLE_RADIUS = 10;

function Car() {
    this._position = {
        x: 20,
        y: 100
    };
    this.street = 0;
    this.traveledDist = 10;

    this.render = function(canvas) {
        var circle = {
            x: this._position.x,
            y: this._position.y,
            radius: CIRCLE_RADIUS
        };
        canvas.drawCircle(circle);
    };

    this.setPosition = function(x, y) {
        this._position.x = x;
        this._position.y = y;
    };

    this.getPosition = function() {
        return this._position;
    };
}

function Actor(destinations) {
    //TODO: in fact the destination is to be just a point, not necessarily an intersection
    this._destinations = destinations;

    //TODO: refactor all stuff
    var getIntersectionsDistance = function (a, b) {
        return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
    };

    this.getDecision = function(view) {
        var destination = this._destinations.pop();

        // find coolest street
        var coolestStreetKey = 0;
        var minDistance = Infinity;
        for (var key in view.availableStreets) {
            var street = view.availableStreets[key];
            var thisStreetDestination = street.to;
            var thisDistance = getIntersectionsDistance(thisStreetDestination, destination);

            if (thisDistance < minDistance) {
                minDistance = thisDistance;
                coolestStreetKey = key;
            }
        }

        var percentage = 1.0;
        if (view.position.x == destination.x && view.position.y == destination.y) {
            percentage = 0.0;
        } else {
            this._destinations.push(destination);
        }

        return {
            velocityPercentage: percentage,
            chosenStreet: view.availableStreets[coolestStreetKey]
        }
    };
}
