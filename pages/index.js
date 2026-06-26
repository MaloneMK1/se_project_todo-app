import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoTemplateSelector = "#todo-template";
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector);
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id: uuidv4(), name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

addTodoFormValidator.enableValidation();
