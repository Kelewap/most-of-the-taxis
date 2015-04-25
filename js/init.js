var htmlCanvas = document.getElementById('myCanvas');

var canvas = new Canvas(htmlCanvas);
var world = new World();

setTimeout(
    function() {
        var initialDeltaTime = 0;
        run(world, canvas, initialDeltaTime);
    },
    1000 );
