var blessed = require("blessed");
var Util = require("../util");

class Scanner {
  constructor(log) {
    this.onCommand = () => {};
    this.objects = [];
    this.log = log;

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
        fg: "green",
        cell: {
          selected: {
            fg: "red",
            bg: "white",
          },
        },
      },
    });

    this.scanner.key("m", () => {
      this.onCommand(`match ${this.getSelectedObject().id}`);
    });

    this.scanner.key("a", () => {
      this.onCommand(`approach ${this.getSelectedObject().id}`);
    });

    this.box.append(this.scanner);
  }

  getSelectedObject() {
    return this.objects[this.scanner.selected - 1];
  }

  setObjects(objects) {
    const selectedObject = this.getSelectedObject();

    this.objects = objects;
    let selectedIndex = -1;

    const scannerHeader = [["ID", "Type", "X", "Y", "Z", "Range", "Azimuth"]];
    const scannerRows = scannerHeader.concat(
      objects.map((obj, index) => {
        if (obj === selectedObject) {
          selectedIndex = index;
        }

        return [
          obj.id.toString(),
          obj.type,
          obj.x.toFixed(3),
          obj.y.toFixed(3),
          obj.z.toFixed(3),
          Util.distance(obj).toFixed(3),
          Util.bearing(obj).toFixed(3),
        ];
      })
    );

    this.scanner.setData(scannerRows);
    this.scanner.select(selectedIndex + 1);
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
