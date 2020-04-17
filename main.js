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
  border: {
    type: "line",
    fg: "#999",
  },
  noCellBorders: true,
});

var donut = contrib.donut({
  label: "This is the donut label",
  radius: 16,
  arcWidth: 4,
  remainColor: "black",
  yPadding: 2,
  data: [{ percent: 80, label: "Power", color: "red" }]
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

logbox.focus();

screen.render();

var last = new Date();

setInterval(() => {
  const now = new Date();
  const delta = (now - last) / 1000;
  last = now;

  game.tick(log, delta);

  donut.setData([{ percent: game.state.power, label: "Power", color: "red" }]);

  const scannerHeader = [["Type", "X", "Y", "Z", "Distance"]];
  const scannerRows = scannerHeader.concat(game.state.objects.map(obj => {
    const distance = Math.sqrt(obj.x * obj.x + obj.y * obj.y + obj.z * obj.z);
    return [obj.type, 
      obj.x.toFixed(3), obj.y.toFixed(3), obj.z.toFixed(3), distance.toFixed(3)]
  }));

  scanner.setData(scannerRows);

  screen.render();
}, 100);
