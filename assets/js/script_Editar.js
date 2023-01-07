const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const priorityInput = document.getElementById("priority-input");
const dateInput = document.getElementById("date-input");
const submitInput = document.getElementById("submit-input");

let num;

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

function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

let priorityTaskValue = (option) => {
  switch (option) {
    case "Mínima":
      return "1";
    case "Média":
      return "2";
    case "Máxima":
      return "3";
    case "Urgente":
      return "4";
  }
};

let statusTaskValue = (option) => {
  switch (option) {
    case "Pendente":
      return "1";
    case "Finalizado":
      return "2";
  }
};

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

    titleInput.value = showTask.title;
    descriptionInput.value = showTask.description;
    dateInput.value = datetimeLocalFormat(showTask.date);
    priorityInput.value = priorityTaskValue(showTask.priority);
    statusInput.value = statusTaskValue(showTask.taskStatus);

    submitInput.addEventListener("click", function () {
      if (
        titleInput.value &&
        descriptionInput.value &&
        statusInput.value !== "Status" &&
        priorityInput.value !== "Prioridade" &&
        dateInput.value !== null &&
        dateInput.value !== ""
      ) {
        num = parseInt(getThisStorageTask(thisTask).id);

        let task = new Task(
          `${num}`,
          `${upperFirstLetter(titleInput.value)}`,
          `${upperFirstLetter(descriptionInput.value)}`,
          `${priorityTask(priorityInput.value)}`,
          `${dateFormat(dateInput.value)}`,
          `${statusTask(statusInput.value)}`
        );

        saveStorage("editTask", task);
        location.href = "./index.html";
        sessionStorage.setItem("reload", true);
      } else {
        alert("Por favor preencha, todos os campos!");
      }
      sessionStorage.setItem("isEdit", true);
      sessionStorage.setItem("isCreate", false);
      sessionStorage.setItem("isDelete", false);
    });
  }
};
