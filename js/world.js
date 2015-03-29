function World(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this.actors = [
        {
            actor: new Actor(),
            representation: new ActorRepresentation(this._context)
        },
        {
            actor: new Actor(),
            representation: new ActorRepresentation(this._context)
        }
    ];
    this.actors[1].representation._position.x = 40;
    this.actors[1].representation._position.y = 60;

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
