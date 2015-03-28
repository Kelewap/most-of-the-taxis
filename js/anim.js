
function drawCircle(circle, context) {
    context.beginPath();
    
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    
    context.fillStyle = "#d0b020";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "#000000";
    context.stroke();
}

function run(world, deltaTime) {
    var frameStart = (new Date()).getTime();

    world.tick(deltaTime);
    world.render();

    requestAnimFrame( function() {
        var newDeltaTime = (new Date()).getTime() - frameStart;
        run(world, newDeltaTime);
    } );
}
