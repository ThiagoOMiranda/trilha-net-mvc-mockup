const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const priorityInput = document.getElementById("priority-input");
const dateInput = document.getElementById("date-input");
const submitInput = document.getElementById("submit-input");

let num = 0;

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

let priorityStyle = (option, element) => {
  switch (option) {
    case "Mínima":
      element.classList.add("status-1");
      break;
    case "Média":
      element.classList.add("status-2");
      break;
    case "Máxima":
      element.classList.add("status-3");
      break;
    case "Urgente":
      element.classList.add("status-4");
      break;
  }
};

let statusStyle = (option, element) => {
  switch (option) {
    case "Pendente":
      element.classList.add("bg-warning");
      break;
    case "Finalizado":
      element.classList.add("bg-success");
      break;
  }
};

let dateFormat = (dateTime) => {
  const dataString = String(dateTime).replace("T", " ");

  const [date, time] = dataString.split(" ");

  const [YYYY, MM, DD] = date.split("-");

  const [HH, mm] = time.split(":");

  return `${DD}/${MM}/${YYYY} ${HH}:${mm}`;
};

submitInput.addEventListener("click", function () {
  if (
    titleInput.value &&
    descriptionInput.value &&
    statusInput.value !== "Status" &&
    priorityInput.value !== "Prioridade" &&
    dateInput.value !== null &&
    dateInput.value !== ""
  ) {
    sessionStorage.getItem("oldNum")
      ? (num = parseInt(sessionStorage.getItem("oldNum")) + 1)
      : (num += 1);

    let task = new Task(
      `${num}`,
      `${upperFirstLetter(titleInput.value)}`,
      `${upperFirstLetter(descriptionInput.value)}`,
      `${priorityTask(priorityInput.value)}`,
      `${dateFormat(dateInput.value)}`,
      `${statusTask(statusInput.value)}`
    );

    saveStorage("myTask", task);
    location.href = "./Index.html";
    sessionStorage.setItem("isCreate", true);
    sessionStorage.setItem("isEdit", false);
    sessionStorage.setItem("isDelete", false);
  } else {
    alert("Por favor preencha, todos os campos!");
  }
});
