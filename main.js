var blessed = require("blessed");
var contrib = require("blessed-contrib");
var game = require("./game.js");
var Panels = require("./panels/panels");
var focus = require("./focus");

var screen = blessed.screen({
  smartCSR: true,
});

screen.title = "Hi Title";

var donut = contrib.donut({
  radius: 16,
  arcWidth: 4,
  remainColor: "black",
  yPadding: 2,
  data: [{ percent: 80, label: "Power", color: "red" }],
});

const console = new Panels.console.Console();
const scanner = new Panels.scanner.Scanner(console.log);

const focus_manager = new focus.FocusManager();

focus_manager.add(scanner);
focus_manager.add(console);

screen.append(donut);
screen.append(console.box);
screen.append(scanner.box);

screen.key(["escape", "q", "C-c"], function() {
  return process.exit(0);
});

screen.key(["tab"], function() {
  focus_manager.next();
  screen.render();
});

console.onTab = () => {
  focus_manager.next();
  screen.render();
};

scanner.onCommand = (command) => {
  console.command(command);
};

screen.render();
focus_manager.next();

var last = new Date();

setInterval(() => {
  const now = new Date();
  const delta = (now - last) / 1000;
  last = now;

  game.tick(console.log, delta);

  donut.setData([{ percent: game.state.power, label: "Power", color: "red" }]);
  scanner.setObjects(game.state.objects);

  screen.render();
}, 500);
