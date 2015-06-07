function World(city) {
    this.worldModel = city;
    this.actors = [
        {
            actor: new Actor(getListOfIntersections(this.worldModel, [5, 34])),
            representation: new Car()
        },
        {
            actor: new Actor(getListOfIntersections(this.worldModel, [6, 34])),
            representation: new Car()
        }
    ];
    this.actors[0].representation.street = this.worldModel.streets[0];
    this.actors[0].actor.percentage = 1.75;
    this.actors[1].representation.street = this.worldModel.streets[4];

    this.tick = function(deltaTime) {
        var maxVelocity = 50;
        var deltaSeconds = deltaTime / 1000.0;

        // iterate over actors
        // collect their this-tick-behaviour
        // update world
        // update actors with new world-view
        for (var i = 0; i < this.actors.length; ++i) {
            var entry = this.actors[i];

            var actor = entry.actor;
            var representation = entry.representation;
            var traffic = this.worldModel.traffic;

            var actorView = {
                yesMadamItsTimeToTurnSomeway: (representation.traveledDist >= representation.street.length),
                availableStreets: representation.street.to.outgoing,
                position: representation.getPosition(),
                traffic: traffic
            };

            var decision = actor.getDecision(actorView);

            if (actorView.yesMadamItsTimeToTurnSomeway) {
                traffic[representation.street.id].shift();
                representation.street = decision.chosenStreet;
                representation.traveledDist = 0;
                if (decision.velocityPercentage != 0) {
                    traffic[decision.chosenStreet.id].push({ distance:  representation.traveledDist, percentage: decision.velocityPercentage});
                }
            }

            representation.traveledDist += decision.velocityPercentage * maxVelocity * deltaSeconds;
            representation.traveledDist = Math.min(representation.traveledDist, representation.street.length);


            var carPosition = this.worldModel.translatePosition(representation.street, representation.traveledDist);

            representation.setPosition(carPosition.x, carPosition.y);
        }
    };

    this.render = function(canvas) {
        canvas.clear();

        this.worldModel.render(canvas);

        for (var i = 0; i < this.actors.length; ++i) {
            var entry = this.actors[i];
            var representation = entry.representation;
            representation.render(canvas);
        }
    };
}
