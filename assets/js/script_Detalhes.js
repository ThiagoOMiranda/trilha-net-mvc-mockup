const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const priorityInput = document.getElementById("priority-input");
const dateInput = document.getElementById("date-input");
const submitInput = document.getElementById("submit-input");

class Task {
  constructor(id, title, description, priority, date, taskStatus) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.taskStatus = taskStatus;
  }
}

function saveStorage(name, obj) {
  sessionStorage.setItem(name, JSON.stringify(obj));
  return true;
}

function getThisStorageTask(obj) {
  var obj = {};
  if (typeof sessionStorage.thisTask !== "undefined") {
    obj = JSON.parse(sessionStorage.thisTask);
  }
  return obj;
}

window.onload = function () {
  if (sessionStorage.thisTask !== undefined) {
    let thisTask;

    let showTask = new Task(
      `${getThisStorageTask(thisTask).id}`,
      `${getThisStorageTask(thisTask).title}`,
      `${getThisStorageTask(thisTask).description}`,
      `${getThisStorageTask(thisTask).priority}`,
      `${getThisStorageTask(thisTask).date}`,
      `${getThisStorageTask(thisTask).taskStatus}`
    );

    titleInput.innerText = showTask.title;
    descriptionInput.innerText = showTask.description;
    dateInput.innerText = showTask.date;
    priorityInput.innerText = showTask.priority;
    statusInput.innerText = showTask.taskStatus;
  }
};
