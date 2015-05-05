function World(city) {
    this.worldModel = city;
    this.actors = [
        {
            actor: new Actor(getListOfIntersections(this.worldModel, [34, 1])),
            representation: new Car()
        },
        {
            actor: new Actor(getListOfIntersections(this.worldModel, [4, 39])),
            representation: new Car()
        }
    ];
    this.actors[0].representation.street = this.worldModel.streets[0];
    this.actors[1].representation.street = this.worldModel.streets[12];

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

            var actorView = {
                yesMadamItsTimeToTurnSomeway: (representation.traveledDist >= representation.street.length),
                availableStreets: representation.street.to.outgoing,
                position: representation.getPosition()
            };

            var decision = actor.getDecision(actorView);

            if (actorView.yesMadamItsTimeToTurnSomeway) {
                representation.street = decision.chosenStreet;
                representation.traveledDist = 0;
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
