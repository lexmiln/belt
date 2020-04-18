class FocusManager {
    constructor() {
        this.focusables = []
        this.pointer = -1;
    }

    add(focusable) {
        this.focusables.push(focusable);
    }

    next() {
        if (this.pointer >= 0 && this.pointer < this.focusables.length) {
            this.focusables[this.pointer].blur();
        }

        this.pointer++;

        if (this.pointer >= this.focusables.length) {
            this.pointer = 0;
        }

        if (this.pointer < this.focusables.length) {
            this.focusables[this.pointer].focus();
        }
    }
}

exports.FocusManager = FocusManager;