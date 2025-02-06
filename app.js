const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".form__task-wrap .btn");
const incompleteTaskHolder = document.getElementById("incomplete-tasks-wrap");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.classList.add("list__item");

  const checkBox = document.createElement("input");
  checkBox.classList.add("checkbox");
  checkBox.type = "checkbox";
  checkBox.checked = false;

  const label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task", "task__label");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task", "task__input");

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("btn", "btn_edit");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  deleteButton.classList.add("btn", "btn_delete");
  deleteButtonImg.src = "remove.svg";
  deleteButtonImg.classList.add("btn__icon");
  deleteButtonImg.alt = "remove button icon";
  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox);
  listItem.append(label);
  listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
};

const addTask = function (event) {
  event.preventDefault();

  if (taskInput.value) {
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".btn_edit");
  const containsClass = listItem.classList.contains("list__item_edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("list__item_edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.btn_edit");
  const deleteButton = taskListItem.querySelector("button.btn_delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
