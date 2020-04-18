var blessed = require("blessed");
var contrib = require("blessed-contrib");
var game = require("./game.js");
var Util = require("./util");

var screen = blessed.screen({
  smartCSR: true
});

screen.title = "Hi Title";

var log = contrib.log({
  fg: "green",
  selectedFg: "green"
});

var logbox = blessed.box({
  right: 0,
  bottom: 0,
  width: "40%",
  height: "50%",
  tags: true,
  border: {
    type: "line",
    fg: "#999",
  },
});

logbox.append(log);

var scanner = blessed.listtable({
  left: 0,
  top: "10%",
  width: "60%",
  height: "30%",
  keys: true,
  border: {
    type: "line",
  },
  noCellBorders: true,
  style: {
    border: {
      fg: "#999",
    },
    fg: "#0FF",
    cell: {
      selected: {
        fg: "red",
        bg: "white",
      },
    },
  },
});

var donut = contrib.donut({
  radius: 16,
  arcWidth: 4,
  remainColor: "black",
  yPadding: 2,
  data: [{ percent: 80, label: "Power", color: "red" }],
});

screen.append(donut);
screen.append(logbox);
screen.append(scanner);

screen.key(["escape", "q", "C-c"], function() {
  return process.exit(0);
});

logbox.key("enter", function() {
  log.log("enter: " + new Date());
  screen.render();
});

scanner.focus();

screen.render();

var last = new Date();

setInterval(() => {
  const now = new Date();
  const delta = (now - last) / 1000;
  last = now;

  game.tick(log, delta);

  donut.setData([{ percent: game.state.power, label: "Power", color: "red" }]);

  const selectedIndex = scanner.selected;

  const scannerHeader = [["Type", "X", "Y", "Z", "Range", "Azimuth"]];
  const scannerRows = scannerHeader.concat(game.state.objects.map(obj => {
    return [obj.type, 
      obj.x.toFixed(3), obj.y.toFixed(3), obj.z.toFixed(3), 
      Util.distance(obj).toFixed(3), 
      Util.bearing(obj).toFixed(3)];
  }));

  scanner.setData(scannerRows);
  scanner.select(selectedIndex);

  screen.render();
}, 150);
