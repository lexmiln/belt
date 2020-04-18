const Util = require("./util");
const Entities = require('./entities');

const ME = "me";
const ASTEROID = "asteroid";

const state = {
  objects: [
    Entities.make({type: ME}),
    makeAsteroid(),
    makeAsteroid(),
    makeAsteroid()
  ],
  power: 0.5
};

function makeAsteroid() {
  return Entities.make({
    type: ASTEROID,
    x: Util.random(-1000, 1000),
    y: Util.random(-1000, 1000),
    z: Util.random(-1000, 1000),
    dx: Util.random(-1, 1),
    dy: Util.random(-10, 10),
    dz: Util.random(-1, 1),
  });
}


function tick(log, timeDelta) {
  log.log(`tick after ${timeDelta}`);

  state.power += (Math.random(1) - 0.5) / 10;
  state.power = Math.max(0, Math.min(1, state.power));

  // Update physics
  state.objects.forEach(obj => {
    obj.x += obj.dx * timeDelta;
    obj.y += obj.dy * timeDelta;
    obj.z += obj.dz * timeDelta;
  });
}

exports.tick = tick;
exports.state = state;
