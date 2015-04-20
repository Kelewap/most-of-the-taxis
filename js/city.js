CityModel = function(intersectionsConfig, streetsConfig) {
    this.streets = {};
    this.intersections = {};
    var getIntersectionsDistance = function (a, b) {
        return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
    };

    for (key in intersectionsConfig) {
        var entry = intersectionsConfig[key];
        this.intersections[key] = {
            id: key,
            x: entry.x,
            y: entry.y,
            outgoing: [],
            incoming: []
        }
    }
    // alternatively pass all intersection objects - intersectionsConfig[entry.from] as 'from'/'to'
    for (key in streetsConfig) {
        var entry = streetsConfig[key];
        this.streets[key] = {
            id: key,
            from: this.intersections[entry.from],
            to: this.intersections[entry.to],
            length: getIntersectionsDistance(this.intersections[entry.from], this.intersections[entry.to])
        };

        this.streets[key].from.outgoing.push(key);
        this.streets[key].to.incoming.push(key);
    }

    this.render = function(context) {
        for (key in this.streets) {
            //TODO: extract to streets.render()
            var street = this.streets[key];

            drawLine( {x: street.from.x, y: street.from.y}, {x: street.to.x, y: street.to.y}, context);
        }
    }
};