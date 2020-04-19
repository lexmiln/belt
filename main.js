var blessed = require("blessed");
var contrib = require("blessed-contrib");
var game = require("./game.js");
var Panels = require("./panels/panels");
var Util = require("./util");
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
const scanner = new Panels.scanner.Scanner();

const focus_manager = new focus.FocusManager();

focus_manager.add(console);
focus_manager.add(scanner);

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

screen.render();
focus_manager.next();

var last = new Date();

setInterval(() => {
  const now = new Date();
  const delta = (now - last) / 1000;
  last = now;

  game.tick(console.log, delta);

  donut.setData([{ percent: game.state.power, label: "Power", color: "red" }]);

  const selectedIndex = scanner.scanner.selected;

  const scannerHeader = [["Type", "X", "Y", "Z", "Range", "Azimuth"]];
  const scannerRows = scannerHeader.concat(
    game.state.objects.map((obj) => {
      return [
        obj.type,
        obj.x.toFixed(3),
        obj.y.toFixed(3),
        obj.z.toFixed(3),
        Util.distance(obj).toFixed(3),
        Util.bearing(obj).toFixed(3),
      ];
    })
  );

  scanner.scanner.setData(scannerRows);
  scanner.scanner.select(selectedIndex);

  screen.render();
}, 500);
