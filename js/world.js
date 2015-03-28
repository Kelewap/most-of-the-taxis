function World(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this.theOnlyCircle = {
        x: 10,
        y: 20,
        radius: 10
    };

    this.tick = function(deltaTime) {
        var velocity = 10;
        var deltaSeconds = deltaTime / 1000.0;

        this.theOnlyCircle.x += velocity * deltaSeconds;
    };

    this.render = function() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        drawCircle(this.theOnlyCircle, this._context);
    };
}
