
//TODO extract drawX to my-fancy-canvas that aggregate the context and is to be passed to render() methods
function drawCircle(circle, context) {
    context.beginPath();
    
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    
    context.fillStyle = "#d0b020";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "#000000";
    context.stroke();
}

function drawLine(start, end, context) {
    context.beginPath();

    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);

    context.lineWidth = 10;
    context.strokeStyle = "#505050";
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
