const state = {
  objects: [],
  power: 0.5
};

function tick(log, timeDelta) {
  log.log(`tick after ${timeDelta}`);

  state.power += (Math.random(1) - 0.5) / 10;
  state.power = Math.max(0, Math.min(1, state.power));
}

exports.tick = tick;
exports.state = state;
