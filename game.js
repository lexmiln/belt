const Util = require("./util");
const entity = require('./entities/entity');
const entity_me = require('./entities/me');

const OBJECT_ARG = "object";

const VERBS = {
  match: {
    args: [OBJECT_ARG],
    func: object => me.matchVelocity(object) 
  },
  approach: {
    args: [OBJECT_ARG],
    func: object => me.approach(object)
  },
};

const me = new entity_me.Me();

const state = {
  objects: [
    me,
    makeAsteroid(),
    makeAsteroid(),
    makeAsteroid()
  ],
  power: 0.5
};

function makeAsteroid() {
  return entity.make({
    type: entity.Entity.ASTEROID,
    x: Util.random(-1000, 1000),
    y: Util.random(-1000, 1000),
    z: Util.random(-1000, 1000),
    dx: Util.random(-1, 1),
    dy: Util.random(-10, 10),
    dz: Util.random(-1, 1),
  });
}

function tick(log, timeDelta) {
  state.power += (Math.random(1) - 0.5) / 10;
  state.power = Math.max(0, Math.min(1, state.power));

  // Update physics
  state.objects.forEach(obj => {
    obj.x += obj.dx * timeDelta;
    obj.y += obj.dy * timeDelta;
    obj.z += obj.dz * timeDelta;
  });
}

function command(cmd) {
  const parts = cmd.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === "") {
    return "Ignoring empty command";
  }

  const verb = parts.shift();
  const action = VERBS[verb];

  if (!action) {
    return `Unrecognized verb: ${verb}`;
  }

  const args = [];

  for (const arg_type of action.args) {
    if (parts.length === 0) {
      return `Expected ${arg_type} but the command had insufficient arguments`;
    }

    const arg = parts.shift();

    if (arg_type === OBJECT_ARG) {
      const object_id = parseInt(arg);
      const object_arg = state.objects.find(obj => obj.id === object_id);

      if (!object_arg) {
        return `Argument "${arg}" could not be understood as an object`;
      }

      args.push(object_arg);
    } else {
      return `Don't know how to parse argument type ${arg_type}`;
    }
  }

  return action.func(...args);
}

exports.command = command;
exports.state = state;
exports.tick = tick;
