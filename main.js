var blessed = require("blessed");
var contrib = require("blessed-contrib");

var screen = blessed.screen({
  smartCSR: true
});

screen.title = "Hi Title";

var log = contrib.log({
  fg: "green",
  selectedFg: "green",
  label: "Server Log"
});

log.log("new log line");

var box = blessed.box({
  top: "center",
  left: "right",
  width: "30%",
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
  box.setContent("{center}Centered?!{/center}");

  screen.render();
});

box.focus();

screen.render();
