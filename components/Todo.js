export default class Todo {
  constructor(data, selector) {
    this._name = data.name;
    this._id = data.id;
    this._completed = data.completed;
    this._date = data.date;
    this._selector = selector;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._todoDeleteButton.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckbox.addEventListener("change", () => {
      this._completed = this._todoCheckbox.checked;
    });
  }

  _setDate() {
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._getTemplate();
    this._todoName = this._todoElement.querySelector(".todo__name");
    this._todoCheckbox = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteButton =
      this._todoElement.querySelector(".todo__delete-btn");

    this._todoName.textContent = this._name;
    this._todoCheckbox.checked = this._completed;
    this._todoCheckbox.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);

    this._setDate();
    this._setEventListeners();

    return this._todoElement;
  }
}
