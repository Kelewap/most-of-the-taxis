function World(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    // street as connection of intersections
    this.streetsConfig = [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6},
        {from: 5, to: 7}
    ];
    this.intersectionsConfig = {
        1 : { x: 20, y: 100 },
        2 : { x: 100, y: 100 },
        3 : { x: 100, y: 20 },
        4 : { x: 100, y: 180 },
        5 : { x: 200, y: 100 },
        6 : { x: 200, y: 20 },
        7 : { x: 200, y: 180}
    };
    this.worldModel = {};

    this.worldModel = function() {
        var streets = {};
        var intersections = {};
        var getIntersectionsDistance = function (a, b) {
            return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
        }

        for (key in this.intersectionsConfig) {
            var entry = this.intersectionsConfig[key];
            intersections[key] = {
                id: key,
                x: entry.x,
                y: entry.y,
                outgoing: [],
                incoming: []
            }
        }
        // alternatively pass all intersection objects - intersectionsConfig[entry.from] as 'from'/'to'
        for (key in this.streetsConfig) {
            var entry = this.streetsConfig[key];
            streets[key] = {
                id: key,
                from: entry.from,
                to: entry.to,
                length: getIntersectionsDistance(intersections[entry.from], intersections[entry.to])
            }

            intersections[streets[key].from].outgoing.push(key);
            intersections[streets[key].to].incoming.push(key);
        }
        return {intersections: intersections, streets: streets};
    };

    this.worldModel = this.worldModel();
    console.log(this.worldModel);

    this.actors = [
        {
            actor: new Actor(),
            representation: new ActorRepresentation(this._context)
        }
    ];

    //TODO: get rid of actor movement logic from this
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

            var decision = actor.getDecision();
            //----
            //todo: case when there is no outgoing streets in current position
            var actorStreet = this.worldModel.streets[representation._position.street];
            if (representation._position.traveledDist >=actorStreet.length) {
                var availStreets = this.worldModel.intersections[actorStreet.to].outgoing;
                var newStreetId = getRandomInt(0, availStreets.length);
                representation._position.street = availStreets[newStreetId];
                representation._position.traveledDist = 0;
                console.log(availStreets);
                console.log(newStreetId);
                console.log(representation);
            }
            // ---
            representation._position.translatedX = translateCoordinates(actorStreet, representation._position.traveledDist, this.worldModel).x;
            representation._position.translatedY = translateCoordinates(actorStreet, representation._position.traveledDist, this.worldModel).y;

            var moveVector = {x: maxVelocity * deltaSeconds, y: 0};
            representation.move(moveVector);
        }
    };

    this.render = function() {
        //TODO: pass canvas context as parameter
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

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
// TODO: move to actor
function translateCoordinates(street, distance, worldModel) {
    var fromIntersect = worldModel.intersections[street.from];
    var toIntersect = worldModel.intersections[street.to];
    var x = fromIntersect.x + (toIntersect.x - fromIntersect.x) * distance / street.length;
    var y = fromIntersect.y + (toIntersect.y - fromIntersect.y) * distance / street.length;
    return {x : x, y : y};
}