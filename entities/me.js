const entity = require("./entity");

class Me extends entity.Entity {
    constructor() {
        super({
            type: entity.Entity.ME
        });
    }

    approach(object) {
        return `Approaching object ${object.id}`;
    }

    matchVelocity(object) {
        return `Matching velocity with object ${object.id}`;
    }
}

exports.Me = Me;