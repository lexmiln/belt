var blessed = require("blessed");
var contrib = require("blessed-contrib");

class Console {
  constructor() {
    this.onTab = () => {};

    this.box = blessed.box({
      right: 0,
      bottom: 3,
      width: "40%",
      height: "50%",
      tags: true,
      border: {
        type: "line",
        fg: "#999",
      },
    });

    this.log = contrib.log({
      top: 0,
      left: 0,
      right: 0,
      bottom: 1,
      fg: "green",
      selectedFg: "green",
      bg: "red",
    });

    this.prompt = blessed.text({
      content: ">",
      left: 0,
      bottom: 0,
    });

    this.commandline = blessed.textbox({
      left: 2,
      right: 0,
      bottom: 0,
      height: 1,
      bg: "blue",
      inputOnFocus: true,
    });

    this.box.append(this.log);
    this.box.append(this.commandline);
    this.box.append(this.prompt);

    this.commandline.key("tab", () => {
      // Trim the tab back off of the content of the field.
      this.commandline.setValue(
        this.commandline.value.substring(0, this.commandline.value.length - 1)
      );
      this.onTab();
    });

    this.commandline.on("submit", (value) => {
      this.log.log("< " + value);
      this.commandline.clearValue();
      this.commandline.focus();
    });
  }

  focus() {
    this.log.log("Panel focused");
    this.commandline.focus();
  }

  blur() {
    this.log.log("Panel blurred");
    this.commandline.cancel();
  }
}

exports.Console = Console;
