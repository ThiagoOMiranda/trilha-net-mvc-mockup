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

function getStorageThisTask(obj) {
  var obj = {};
  if (typeof sessionStorage.thisTask !== "undefined") {
    obj = JSON.parse(sessionStorage.thisTask);
  }
  return obj;
}

let priorityTask = (option) => {
  switch (option) {
    case "1":
      return "Mínima";
    case "2":
      return "Média";
    case "3":
      return "Máxima";
    case "4":
      return "Urgente";
  }
};

let statusTask = (option) => {
  switch (option) {
    case "1":
      return "Pendente";
    case "2":
      return "Finalizado";
  }
};

let dateFormat = (dateTime) => {
  const dataString = String(dateTime).replace("T", " ");

  const [date, time] = dataString.split(" ");

  const [YYYY, MM, DD] = date.split("-");

  const [HH, mm] = time.split(":");

  return `${DD}/${MM}/${YYYY} ${HH}:${mm}`;
};

let datetimeLocalFormat = (dateTime) => {
  const dataString = String(dateTime);

  const [date, time] = dataString.split(" ");

  const [DD, MM, YYYY] = date.split("/");

  const [HH, mm] = time.split(":");

  return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
};

("2018-06-12T19:30");
("01/04/2023 07:00");

window.onload = function () {
  if (sessionStorage.thisTask !== undefined) {
    let thisTask;

    let showTask = new Task(
      `${getStorageThisTask(thisTask).id}`,
      `${getStorageThisTask(thisTask).title}`,
      `${getStorageThisTask(thisTask).description}`,
      `${getStorageThisTask(thisTask).priority}`,
      `${getStorageThisTask(thisTask).date}`,
      `${getStorageThisTask(thisTask).taskStatus}`
    );

    titleInput.innerText = showTask.title;
    descriptionInput.innerText = showTask.description;
    dateInput.innerText = showTask.date;
    priorityInput.innerText = showTask.priority;
    statusInput.innerText = showTask.taskStatus;

    submitInput.addEventListener("click", function () {
      sessionStorage.setItem("delId", showTask.id);
      sessionStorage.setItem("isDelete", true);
      sessionStorage.setItem("isEdit", false);
      sessionStorage.setItem("isCreate", false);
      location.href = "./index.html";
    });
  }
};
