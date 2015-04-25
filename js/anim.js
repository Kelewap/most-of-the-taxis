function run(world, canvas, deltaTime) {
    var frameStart = (new Date()).getTime();

    world.tick(deltaTime);
    world.render(canvas);

    requestAnimFrame( function() {
        var newDeltaTime = (new Date()).getTime() - frameStart;
        run(world, canvas, newDeltaTime);
    } );
}
