var canvas = document.getElementById('myCanvas');

var world = new World(canvas);

setTimeout(
    function() {
        var initialDeltaTime = 0;
        run(world, initialDeltaTime);
    },
    1000 );
