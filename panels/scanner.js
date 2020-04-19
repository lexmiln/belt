var blessed = require("blessed");

class Scanner {
  constructor() {
    this.box = blessed.box({
      top: 2,
      left: 0,
      width: "80%",
      height: "30%",
      tags: true,
      border: {
        type: "line",
        fg: "blue",
      },
      label: "SCANNER",
    });

    this.scanner = blessed.listtable({
      keys: true,
      mouse: true,
      top: 0,
      bottom: 0,
      noCellBorders: true,
      style: {
        fg: "#0FF",
        cell: {
          selected: {
            fg: "red",
            bg: "white",
          },
        },
      },
    });

    this.box.append(this.scanner);
  }

  focus() {
    this.scanner.focus();
    this.box.style.border.fg = "white";
  }

  blur() {
    this.box.style.border.fg = "blue";
  }
}

exports.Scanner = Scanner;
