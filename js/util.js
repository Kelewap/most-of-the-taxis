// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//TODO: utility to create generic street config manhattan-style with intresections all the way
function createManhattan(offset, step, size) {
    var intersections = {};
    for (var i = 0; i <= size.height; ++i) {
        for (var j = 0; j <= size.width; ++j) {
            //TODO
        }
    }
}