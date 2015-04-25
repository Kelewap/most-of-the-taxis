function Canvas(htmlCanvas) {
    this._htmlCanvas = htmlCanvas;
    this._renderContext = htmlCanvas.getContext('2d');

    this.clear = function() {
        this._renderContext.clearRect(0, 0, this._htmlCanvas.width, this._htmlCanvas.height);
    };

    this.drawCircle = function(circle) {
        this._renderContext.beginPath();

        this._renderContext.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);

        this._renderContext.fillStyle = "#d0b020";
        this._renderContext.fill();

        this._renderContext.lineWidth = 4;
        this._renderContext.strokeStyle = "#000000";
        this._renderContext.stroke();
    };

    this.drawLine = function(start, end) {
        this._renderContext.beginPath();

        this._renderContext.moveTo(start.x, start.y);
        this._renderContext.lineTo(end.x, end.y);

        this._renderContext.lineWidth = 10;
        this._renderContext.strokeStyle = "#505050";
        this._renderContext.stroke();
    };
}
