var htmlCanvas = document.getElementById('myCanvas');

function createRandomDestinations(worldModel, count) {
    var randoms = [];

    for (var i = 0; i < count; ++i) {
        randoms.push(getRandomInt(0, 53));
    }

    return getListOfIntersections(worldModel, randoms);
}

function createRandomActors(worldModel, count) {
    var actors = [];

    for (var i = 0; i < count; ++i) {
        var actor = {
            actor: new Actor(createRandomDestinations(worldModel, 30)),
            representation: new Car("#d0b020")
        };
        actor.representation.street = worldModel.streets[getRandomInt(0, 183)];
        actor.percentage = getRandomInt(60, 100) / 100.0;
        actors.push(actor);
    }

    return actors;
}

var canvas = new Canvas(htmlCanvas);
manhattanConfig = createManhattan({x: 20, y: 20}, 100, {width: 8, height: 5});
var world = new World( new City(manhattanConfig.intersections, manhattanConfig.streets) );

setTimeout(
    function() {
        var initialDeltaTime = 0;
        run(world, canvas, initialDeltaTime);
    },
    1000 );
