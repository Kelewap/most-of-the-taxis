var htmlCanvas = document.getElementById('myCanvas');

var canvas = new Canvas(htmlCanvas);
manhattanConfig = createManhattan({x: 20, y: 20}, 100, {width: 8, height: 5});
var world = new World( new City(manhattanConfig.intersections, manhattanConfig.streets) );

setTimeout(
    function() {
        var initialDeltaTime = 0;
        run(world, canvas, initialDeltaTime);
    },
    1000 );
