let nextid = 1000000;

class Entity {
    constructor({type, x = 0, y = 0, z = 0, dx = 0, dy = 0, dz = 0}) {
        this.id = nextid++;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = dx;
        this.dy = dy;
        this.dz = dz;
    }
}

Entity.ME = "me";
Entity.ASTEROID = "asteroid";

exports.Entity = Entity;
exports.make = function(options = {}) {
    return new Entity(options);
}
