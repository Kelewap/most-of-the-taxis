
function drawRectangle(rectangle, context) {
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fillStyle = '#D0B020';
  context.fill();
  context.lineWidth = rectangle.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
}

function animate(rectangle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;

  var linearSpeed = 100;
  // pixels / second
  var newX = 500 + (-1 * linearSpeed * time / 1000);

  if(newX < canvas.width - rectangle.width - rectangle.borderWidth / 2) {
    rectangle.x = newX;
  }

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRectangle(rectangle, context);

  // request new frame
  requestAnimFrame( function() {
    animate(rectangle, canvas, context, startTime);
  } );
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var cabRect = {
  x: 333,
  y: 100,
  width: 50,
  height: 30,
  borderWidth: 5
};
