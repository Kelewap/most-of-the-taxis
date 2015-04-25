function World() {
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

    this.worldModel = new City(this.intersectionsConfig, this.streetsConfig);
    console.log(this.worldModel);

    this.actors = [
        {
            actor: new Actor(),
            representation: new Car()
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
            //TODO refer to streets via references
            actorStreet = this.worldModel.streets[representation.street];
            representation.traveledDist += decision.velocityPercentage * maxVelocity * deltaSeconds;
            representation.traveledDist = Math.min(representation.traveledDist, actorStreet.length);
            var translatedX = this.worldModel.translatePosition(actorStreet, representation.traveledDist).x;
            var translatedY = this.worldModel.translatePosition(actorStreet, representation.traveledDist).y;

            representation.setPosition(translatedX, translatedY);
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
