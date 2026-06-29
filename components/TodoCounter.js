export default class TodoCounter {
  constructor(todos, counterSelector) {
    this._counterElement = document.querySelector(counterSelector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;

    this._updateText();
  }

  updateCompleted(increment) {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }

    this._updateText();
  }

  updateTotal(increment) {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }

    this._updateText();
  }

  _updateText() {
    this._counterElement.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
