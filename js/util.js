// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createManhattan(offset, step, size) {
    var intersections = {};
    var streets = [];

    function addIfNeeded(destinationKey) {
        if (destinationKey) {
            streets.push({from: key, to: destinationKey});
        }
    }

    for (var i = 0; i <= size.height; ++i) {
        for (var j = 0; j <= size.width; ++j) {
            var row = size.width + 1;
            var key = i * row + j;
            intersections[key] = {
                x: offset.x + step * j,
                y: offset.y + step * i
            };

            var northKey = (i > 0) ? key - row : null;
            var southKey = (i < size.height) ? key + row : null;
            var westKey = (j > 0) ? key - 1 : null;
            var eastKey = (j < size.width) ? key + 1 : null;
            addIfNeeded(northKey);
            addIfNeeded(southKey);
            addIfNeeded(westKey);
            addIfNeeded(eastKey);
        }
    }

    return {
        intersections: intersections,
        streets: streets
    };
}