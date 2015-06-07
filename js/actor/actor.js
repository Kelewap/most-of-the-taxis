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
    this.percentage = 1.0;
    this.avoidTraffic = false;

    //TODO: refactor all stuff
    var getIntersectionsDistance = function (a, b) {
        return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
    };

    this.adjustSpeed = function(view, coolestStreetKey) {
        if (view.yesMadamItsTimeToTurnSomeway) {
            var street = view.availableStreets[coolestStreetKey];
            if (!isStreetEmpty(view.traffic, street.id)) {
                if (getNearestCar(view.traffic, street.id).percentage > 0) {
                    this.percentage = getNearestCar(view.traffic, street.id).percentage;
                }
            }
        }
    };

    this.getDecision = function(view) {
        var destination = this._destinations.pop();

        // find coolest street
        var coolestStreetKey = 0;
        var emptyStreetKey = null;
        var chosenStreetKey = null;
        var minDistance = Infinity;
        for (var key in view.availableStreets) {
            var street = view.availableStreets[key];
            var thisStreetDestination = street.to;
            var thisDistance = getIntersectionsDistance(thisStreetDestination, destination);

            if (thisDistance < minDistance) {
                minDistance = thisDistance;
                coolestStreetKey = key;
                if (this.avoidTraffic) {
                    //todo: find 'the best' empty street - not the last one
                    if (isStreetEmpty(view.traffic, street.id)) {
                        emptyStreetKey = key;
                    }
                }
            }
        }
        if (emptyStreetKey != null) {
            chosenStreetKey = emptyStreetKey;
        } else {
            chosenStreetKey = coolestStreetKey;
        }
        console.log(view.yesMadamItsTimeToTurnSomeway);
        this.adjustSpeed(view, chosenStreetKey);
        if (view.position.x == destination.x && view.position.y == destination.y) {
            this.percentage = 0.0;
            console.log("in place");
        } else {
            this._destinations.push(destination);
        }

        return {
            velocityPercentage: this.percentage,
            chosenStreet: view.availableStreets[chosenStreetKey]
        }
    };
}


