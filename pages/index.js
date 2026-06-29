import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoTemplateSelector = "#todo-template";
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const createTodo = (data) => {
  const todo = new Todo(
    data,
    todoTemplateSelector,
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (isCompleted) => {
      todoCounter.updateTotal(false);

      if (isCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  );

  return todo.getView();
};

const renderTodo = (data) => {
  const todoElement = createTodo(data);
  todoSection.addItem(todoElement);
};

const todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  // Create a date object and adjust for timezone
  const date = new Date(values.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  renderTodo({ id: uuidv4(), name: values.name, completed: false, date });
  todoCounter.updateTotal(true);
  addTodoFormValidator.resetValidation();
  addTodoPopup.close();
});

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

todoSection.renderItems();

addTodoPopup.setEventListeners();
addTodoFormValidator.enableValidation();
