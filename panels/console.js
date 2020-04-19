var blessed = require("blessed");
var contrib = require("blessed-contrib");

class Console {
  constructor(game) {
    this.onTab = () => {};
    this.log = message => this.logelement.log(message);
    this.game = game;

    this.box = blessed.box({
      right: 0,
      bottom: 3,
      width: "70%",
      height: "30%",
      tags: true,
      border: {
        type: "line",
        fg: "blue",
      },
      label: "LOG",
    });

    this.logelement = contrib.log({
      top: 0,
      left: 0,
      right: 0,
      bottom: 1,
      fg: "green",
    });

    this.prompt = blessed.text({
      content: "cmd >",
      left: 0,
      bottom: 0,
    });

    this.commandline = blessed.textbox({
      left: 6,
      right: 0,
      bottom: 0,
      height: 1,
      inputOnFocus: true,
    });

    this.box.append(this.logelement);
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
      this.command(value);
      this.commandline.clearValue();
      this.commandline.focus();
      this.commandline.screen.render();
    });
  }

  focus() {
    this.commandline.focus();
    this.box.style.border.fg = "white";
    this.prompt.show();
  }

  blur() {
    this.commandline.cancel();
    this.box.style.border.fg = "blue";
    this.prompt.hide();
  }
  
  command(command) {
    this.log("cmd > " + command);
    const result = this.game.command(command);
    this.log(result);
    this.box.screen.render();
  }
}

exports.Console = Console;
