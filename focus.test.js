const focus = require('./focus');

class Focusable {
  constructor() { this.hasFocus = false; }
  focus() { this.hasFocus = true; }
  blur() { this.hasFocus = false; }
}

test('handles focusing nothing', () => {
  var manager = new focus.FocusManager();
  manager.next();
});

test('focuses first item first', () => {
  var f1 = new Focusable();
  var f2 = new Focusable();

  var manager = new focus.FocusManager();
  manager.add(f1);
  manager.add(f2);
  manager.next();

  expect(f1.hasFocus).toBe(true);
  expect(f2.hasFocus).toBe(false);
});

test('focuses second item second', () => {
  var f1 = new Focusable();
  var f2 = new Focusable();

  var manager = new focus.FocusManager();
  manager.add(f1);
  manager.add(f2);
  manager.next();
  manager.next();

  expect(f1.hasFocus).toBe(false);
  expect(f2.hasFocus).toBe(true);
});

test('loops focus', () => {
  var f1 = new Focusable();
  var f2 = new Focusable();

  var manager = new focus.FocusManager();
  manager.add(f1);
  manager.add(f2);
  manager.next();
  manager.next();
  manager.next();

  expect(f1.hasFocus).toBe(true);
  expect(f2.hasFocus).toBe(false);
});

