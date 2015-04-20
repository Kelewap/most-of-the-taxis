function World(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    // street as connection of intersections
    this.streetsConfig = [
        {from: 1, to: 2},
        {from: 1, to: 4},
        {from: 2, to: 1},
        {from: 2, to: 3},
        {from: 2, to: 5},
        {from: 3, to: 2},
        {from: 3, to: 4},
        {from: 3, to: 6},
        {from: 4, to: 1},
        {from: 4, to: 3},
        {from: 5, to: 2},
        {from: 5, to: 6},
        {from: 6, to: 3},
        {from: 6, to: 5}
    ];
    this.intersectionsConfig = {
        1 : { x: 100, y: 100 },
        2 : { x: 200, y: 100 },
        3 : { x: 200, y: 200 },
        4 : { x: 100, y: 200 },
        5 : { x: 400, y: 100 },
        6 : { x: 400, y: 200 }
    };

    this.worldModel = new CityModel(this.intersectionsConfig, this.streetsConfig);
    console.log(this.worldModel);

    this.actors = [
        {
            actor: new Actor(),
            representation: new ActorRepresentation(this._context)
        }
    ];

    this.tick = function(deltaTime) {
        var maxVelocity = 30;
        var deltaSeconds = deltaTime / 1000.0;

        // iterate over actors
        // collect their this-tick-behaviour
        // update world
        // update actors with new world-view
        for (var i = 0; i < this.actors.length; ++i) {
            var entry = this.actors[i];

            var actor = entry.actor;
            var representation = entry.representation;

            var actorStreet = this.worldModel.streets[representation.street];

            var actorView = {
                yesMadamItsTimeToTurnSomeway: (representation.traveledDist >= actorStreet.length),
                availableStreets: actorStreet.to.outgoing
            };

            var decision = actor.getDecision(actorView);

            if (actorView.yesMadamItsTimeToTurnSomeway) {
                representation.street = decision.chosenStreet;
                representation.traveledDist = 0;
            }
            representation.traveledDist += decision.velocityPercentage * maxVelocity * deltaSeconds;
            representation.traveledDist = Math.min(representation.traveledDist, actorStreet.length);
            var translatedX = translateCoordinates(actorStreet, representation.traveledDist, this.worldModel).x;
            var translatedY = translateCoordinates(actorStreet, representation.traveledDist, this.worldModel).y;

            representation.setPosition(translatedX, translatedY);
        }
    };

    this.render = function() {
        //TODO: pass canvas context as parameter
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this.worldModel.render(this._context);

        for (var i = 0; i < this.actors.length; ++i) {
            var entry = this.actors[i];
            var representation = entry.representation;
            representation.render(this._context);
        }
    };

}



// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// TODO: move to actor. nope. move to city
function translateCoordinates(street, distance, worldModel) {
    var fromIntersect = street.from;
    var toIntersect = street.to;
    var x = fromIntersect.x + (toIntersect.x - fromIntersect.x) * distance / street.length;
    var y = fromIntersect.y + (toIntersect.y - fromIntersect.y) * distance / street.length;
    return {x : x, y : y};
}