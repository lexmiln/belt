var blessed = require("blessed");
var contrib = require("blessed-contrib");
var game = require("./game.js");

var screen = blessed.screen({
  smartCSR: true
});

screen.title = "Hi Title";

var log = contrib.log({
  fg: "green",
  selectedFg: "green"
});

var box = blessed.box({
  right: 0,
  bottom: 0,
  width: "40%",
  height: "50%",
  tags: true,
  border: {
    type: "line"
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0"
    },
    hover: {
      bg: "green"
    }
  }
});

box.append(log);

var donut = contrib.donut({
  label: "Test",
  radius: 16,
  arcWidth: 4,
  remainColor: "black",
  yPadding: 2,
  data: [{ percent: 80, label: "web1", color: "green" }]
});

screen.append(donut);
screen.append(box);

screen.key(["escape", "q", "C-c"], function() {
  return process.exit(0);
});

box.key("enter", function() {
  log.log("enter: " + new Date());
  screen.render();
});

box.focus();

screen.render();

var last = new Date();

setInterval(() => {
  const now = new Date();
  const delta = (now - last) / 1000;
  last = now;

  game.tick(log, delta);

  donut.setData([{ percent: game.state.power, label: "web1", color: "green" }]);

  screen.render();
}, 100);
