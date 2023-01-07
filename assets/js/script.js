const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const statusInput = document.getElementById("status-input");
const priorityInput = document.getElementById("priority-input");
const dateInput = document.getElementById("date-input");
const submitInput = document.getElementById("submit-input");
const orderId = document.getElementById("order-id");
const orderAz = document.getElementById("order-az");
const orderDate = document.getElementById("order-date");
const filterStatus = document.getElementById("btn-status");
const filterPriority = document.getElementById("btn-priority");
const selectStatus = document.getElementById("select-status");
const selectPriority = document.getElementById("select-priority");
const showAll = document.getElementById("show-all");
const inputFilterDate = document.getElementById("filter-date");
const filterDate = document.getElementById("btn-filter-date");
const inputFilterString = document.getElementById("filter-string");
const filterString = document.getElementById("btn-filter-string");

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

function saveStorage(name, obj) {
  sessionStorage.setItem(name, JSON.stringify(obj));
  return true;
}

function getStorageTask(obj) {
  var obj = {};
  if (typeof sessionStorage.myTask !== "undefined") {
    obj = JSON.parse(sessionStorage.myTask);
  }
  return obj;
}

function getStorageOldTask(obj) {
  var obj = {};
  if (typeof sessionStorage.oldTask !== "undefined") {
    obj = JSON.parse(sessionStorage.oldTask);
  }
  return obj;
}

function getStorageEditTask(obj) {
  var obj = {};
  if (typeof sessionStorage.editTask !== "undefined") {
    obj = JSON.parse(sessionStorage.editTask);
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

let task01 = new Task(
  "1",
  "Tela de agendamento",
  "Criação da tela de nova tarefa, incluindo atributos da tarefa.",
  "Média",
  "19/12/2022 16:00",
  "Finalizado"
);

let priorityStyle = (option, element) => {
  switch (option) {
    case "Mínima":
      if (element.classList.contains("status-1")) {
        element.classList.remove("status-2");
        element.classList.remove("status-3");
        element.classList.remove("status-4");
      } else {
        element.classList.add("status-1");
      }
      break;
    case "Média":
      if (element.classList.contains("status-2")) {
        element.classList.remove("status-1");
        element.classList.remove("status-3");
        element.classList.remove("status-4");
      } else {
        element.classList.add("status-2");
      }
      break;
    case "Máxima":
      if (element.classList.contains("status-3")) {
        element.classList.remove("status-1");
        element.classList.remove("status-2");
        element.classList.remove("status-4");
      } else {
        element.classList.add("status-3");
      }
      break;
    case "Urgente":
      if (element.classList.contains("status-4")) {
        element.classList.remove("status-1");
        element.classList.remove("status-2");
        element.classList.remove("status-3");
      } else {
        element.classList.add("status-4");
      }
      break;
  }
};

let statusStyle = (option, element) => {
  switch (option) {
    case "Pendente":
      element.classList.contains("bg-warning")
        ? element.classList.remove("bg-success")
        : element.classList.add("bg-warning");
      break;
    case "Finalizado":
      element.classList.contains("bg-success")
        ? element.classList.remove("bg-warning")
        : element.classList.add("bg-success");
      break;
  }
};

orderId.addEventListener("click", () => {
  let icon = orderId.getElementsByTagName("i")[0];

  let parent = document.getElementById("table-body");

  if (icon.classList.contains("fa-arrow-down-1-9")) {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        parseInt(String(a.id).substring(3)) >
        parseInt(String(b.id).substring(3))
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
    icon.classList.replace("fa-arrow-down-1-9", "fa-arrow-up-1-9");
  } else {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        parseInt(String(a.id).substring(3)) <
        parseInt(String(b.id).substring(3))
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
    icon.classList.replace("fa-arrow-up-1-9", "fa-arrow-down-1-9");
  }
});

orderAz.addEventListener("click", () => {
  let icon = orderAz.getElementsByTagName("i")[0];

  let parent = document.getElementById("table-body");

  if (icon.classList.contains("fa-arrow-down-a-z")) {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        a.textContent.replace(/[\n]/gm, "").split("  ")[4] >
        b.textContent.replace(/[\n]/gm, "").split("  ")[4]
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
    icon.classList.replace("fa-arrow-down-a-z", "fa-arrow-up-a-z");
  } else {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        a.textContent.replace(/[\n]/gm, "").split("  ")[4] <
        b.textContent.replace(/[\n]/gm, "").split("  ")[4]
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
    icon.classList.replace("fa-arrow-up-a-z", "fa-arrow-down-a-z");
  }
});

let dateAsc = true;

orderDate.addEventListener("click", () => {
  let parent = document.getElementById("table-body");
  if (dateAsc) {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        Date.parse(
          a.textContent.replace(/[\n]/gm, "").split("    ")[5].split(" ")[0]
        ) >
        Date.parse(
          b.textContent.replace(/[\n]/gm, "").split("    ")[5].split(" ")[0]
        )
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
  } else {
    Array.from(parent.getElementsByTagName("tr"))
      .sort((a, b) =>
        Date.parse(
          a.textContent.replace(/[\n]/gm, "").split("    ")[5].split(" ")[0]
        ) <
        Date.parse(
          b.textContent.replace(/[\n]/gm, "").split("    ")[5].split(" ")[0]
        )
          ? 1
          : -1
      )
      .forEach((tr) => parent.appendChild(tr));
  }
  dateAsc = !dateAsc;
});

filterString.addEventListener("click", () => {
  let parent = document.getElementById("table-body");

  if (String(inputFilterString.value) === "") {
    Array.from(parent.getElementsByTagName("tr")).forEach(
      (tr) =>
        void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  } else {
    Array.from(parent.getElementsByTagName("tr")).forEach((tr) =>
      String(tr.textContent)
        .replace(/[\n]/gm, "")
        .split("  ")[4]
        .toLowerCase()
        .includes(String(inputFilterString.value).toLowerCase()) ||
      String(tr.textContent)
        .replace(/[\n]/gm, "")
        .split("  ")[5]
        .toLowerCase()
        .includes(String(inputFilterString.value).toLowerCase())
        ? void (tr.classList.contains("hide") && tr.classList.remove("hide"))
        : void (!tr.classList.contains("hide") && tr.classList.add("hide"))
    );
  }
});

filterDate.addEventListener("click", () => {
  let parent = document.getElementById("table-body");
  if (inputFilterDate.value === "") {
    Array.from(parent.getElementsByTagName("tr")).forEach(
      (tr) =>
        void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  } else {
    Array.from(parent.getElementsByTagName("tr")).forEach((tr) =>
      !tr.textContent.includes(
        inputFilterDate.value.split("-").reverse().join("/")
      )
        ? void (!tr.classList.contains("hide") && tr.classList.add("hide"))
        : void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  }
});

filterPriority.addEventListener("click", () => {
  let parent = document.getElementById("table-body");
  if (selectPriority.value === "Prioridade") {
    Array.from(parent.getElementsByTagName("tr")).forEach(
      (tr) =>
        void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  } else {
    Array.from(parent.getElementsByTagName("tr")).forEach((tr) =>
      !tr.textContent.includes(priorityTask(selectPriority.value))
        ? void (!tr.classList.contains("hide") && tr.classList.add("hide"))
        : void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  }
});

filterStatus.addEventListener("click", () => {
  let parent = document.getElementById("table-body");
  if (selectStatus.value === "Status") {
    Array.from(parent.getElementsByTagName("tr")).forEach(
      (tr) =>
        void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  } else {
    Array.from(parent.getElementsByTagName("tr")).forEach((tr) =>
      !tr.textContent.includes(statusTask(selectStatus.value))
        ? void (!tr.classList.contains("hide") && tr.classList.add("hide"))
        : void (tr.classList.contains("hide") && tr.classList.remove("hide"))
    );
  }
});

showAll.addEventListener("click", () => {
  let parent = document.getElementById("table-body");
  Array.from(parent.getElementsByTagName("tr")).forEach(
    (tr) => void (tr.classList.contains("hide") && tr.classList.remove("hide"))
  );
});

function create(element) {
  let tableBody = document.getElementById("table-body");
  let tr = document.createElement("tr");
  tr.setAttribute("id", `tr_${element.id}`);
  tr.innerHTML = `<td class="text-center col-sm-0">
    <label
      class="bg-secondary id-badge d-flex justify-content-center align-items-center text-light rounded-3 fw-bold px-2"
      id="task${element.id}-id"
    ></label>
  </td>
  <td class="col-sm-2" id="task${element.id}-title"></td>
  <td class="col-sm-5" id="task${element.id}-description"></td>
  <td class="col-sm-1">
    <label
      class="w-100 text-center px-2 py-1 rounded-1"
      id="task${element.id}-priority"
    ></label>
  </td>
  <td class="col-sm-2">
    <span
      class="d-flex justify-content-center text-wrap"
      id="task${element.id}-date"
    ></span>
  </td>
  <td class="col-sm-1">
    <label
      class="w-100 text-center text-white px-2 py-1 rounded-1 bg-success"
      id="task${element.id}-status"
    ></label>
  </td>
  <td class="col-sm-1">
    <div class="d-flex justify-content-center align-items-center">
      <button
        class="p-1 actions btn btn-light link-secondary text-center text-decoration-none text-nowrap"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Editar"
        id="task${element.id}-edit"
      >
        <i class="fa-solid pe-none fa-file-pen fa-lg mx-1"></i>
      </button>
      <div class="spacer-sm mx-1"></div>
      <button
        class="p-1 actions btn btn-light link-secondary text-center text-decoration-none text-nowrap"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Detalhes"
        id="task${element.id}-show"
      >
        <i class="fa-solid pe-none fa-circle-info fa-lg mx-1"></i>
      </button>
      <div class="spacer-sm mx-1"></div>
      <button
        class="p-1 actions btn btn-light link-secondary text-center text-decoration-none text-nowrap"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Deletar"
        id="task${element.id}-del"
        form action = "./deletar.html"
      >
        <i class="fa-solid pe-none fa-trash fa-lg mx-1"></i>
      </button>
    </div>
  </td>`;
  tableBody.appendChild(tr);
}

let contentMenu = () => {
  let actionLink = document.querySelectorAll(".actions");

  actionLink.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      let elementId = event.target.id;
      let thisTask = new Task(
        `${
          document.getElementById(String(elementId).replace(/-.*/, "-id"))
            .innerText
        }`,
        `${
          document.getElementById(String(elementId).replace(/-.*/, "-title"))
            .innerText
        }`,
        `${
          document.getElementById(
            String(elementId).replace(/-.*/, "-description")
          ).innerText
        }`,
        `${
          document.getElementById(String(elementId).replace(/-.*/, "-priority"))
            .innerText
        }`,
        `${
          document.getElementById(String(elementId).replace(/-.*/, "-date"))
            .innerText
        }`,
        `${
          document.getElementById(String(elementId).replace(/-.*/, "-status"))
            .innerText
        }`
      );

      saveStorage("thisTask", thisTask);
      if (String(elementId).includes("edit")) {
        location.href = "./editar.html";
      } else if (String(elementId).includes("show")) {
        location.href = "./detalhes.html";
      } else if (String(elementId).includes("del")) {
        location.href = "./deletar.html";
      }
    });
  });
};

let removeTask = () => {
  if (sessionStorage.getItem("isDelete") == "true") {
    let delId = `tr_${sessionStorage.getItem("delId")}`;
    document.getElementById(delId).remove();
  }
};

window.onload = function () {
  if (sessionStorage.myTask !== undefined) {
    let innerTable;

    let tableBody = document.getElementById("table-body");

    if (sessionStorage.getItem("oldTask")) {
      let oldTask;
      tableBody.innerHTML = getStorageOldTask(innerTable);
    }

    contentMenu();

    if (sessionStorage.getItem("isEdit") == "true") {
      let editTask;
      let taskEdit = new Task(
        `${getStorageEditTask(editTask).id}`,
        `${getStorageEditTask(editTask).title}`,
        `${getStorageEditTask(editTask).description}`,
        `${getStorageEditTask(editTask).priority}`,
        `${getStorageEditTask(editTask).date}`,
        `${getStorageEditTask(editTask).taskStatus}`
      );

      contentMenu();

      eval(
        `task${taskEdit.id}Id = document.getElementById("task${taskEdit.id}-id")`
      );

      eval(
        `task${taskEdit.id}Title = document.getElementById("task${taskEdit.id}-title")`
      );

      eval(
        `task${taskEdit.id}Description = document.getElementById("task${taskEdit.id}-description")`
      );

      eval(
        `task${taskEdit.id}Priority = document.getElementById("task${taskEdit.id}-priority")`
      );

      eval(
        `task${taskEdit.id}Date = document.getElementById("task${taskEdit.id}-date")`
      );

      eval(
        `task${taskEdit.id}Status = document.getElementById("task${taskEdit.id}-status")`
      );

      if (eval(`task${taskEdit.id}Id`) !== null) {
        eval(`task${taskEdit.id}Id`).innerText = taskEdit.id;

        eval(`task${taskEdit.id}Title`).innerText = taskEdit.title;

        eval(`task${taskEdit.id}Description`).innerText = taskEdit.description;

        eval(`task${taskEdit.id}Priority`).innerText = taskEdit.priority;

        priorityStyle(taskEdit.priority, eval(`task${taskEdit.id}Priority`));

        eval(`task${taskEdit.id}Date`).innerText = taskEdit.date;

        eval(`task${taskEdit.id}Status`).innerText = taskEdit.taskStatus;

        statusStyle(taskEdit.taskStatus, eval(`task${taskEdit.id}Status`));
      }
    }

    if (sessionStorage.getItem("isDelete") == "true") {
      document.getElementById("table-body").innerHTML;
      removeTask();
    }

    if (sessionStorage.getItem("isCreate") == "true") {
      let task;

      let newTask = new Task(
        `${getStorageTask(task).id}`,
        `${getStorageTask(task).title}`,
        `${getStorageTask(task).description}`,
        `${getStorageTask(task).priority}`,
        `${getStorageTask(task).date}`,
        `${getStorageTask(task).taskStatus}`
      );

      create(newTask);

      contentMenu();

      eval(
        `task${newTask.id}Id = document.getElementById("task${newTask.id}-id")`
      );

      eval(
        `task${newTask.id}Title = document.getElementById("task${newTask.id}-title")`
      );

      eval(
        `task${newTask.id}Description = document.getElementById("task${newTask.id}-description")`
      );

      eval(
        `task${newTask.id}Priority = document.getElementById("task${newTask.id}-priority")`
      );

      eval(
        `task${newTask.id}Date = document.getElementById("task${newTask.id}-date")`
      );

      eval(
        `task${newTask.id}Status = document.getElementById("task${newTask.id}-status")`
      );

      if (eval(`task${newTask.id}Id`) !== null) {
        sessionStorage.setItem("oldNum", newTask.id);

        eval(`task${newTask.id}Id`).innerText = newTask.id;

        eval(`task${newTask.id}Title`).innerText = newTask.title;

        eval(`task${newTask.id}Description`).innerText = newTask.description;

        eval(`task${newTask.id}Priority`).innerText = newTask.priority;

        priorityStyle(newTask.priority, eval(`task${newTask.id}Priority`));

        eval(`task${newTask.id}Date`).innerText = newTask.date;

        eval(`task${newTask.id}Status`).innerText = newTask.taskStatus;

        statusStyle(newTask.taskStatus, eval(`task${newTask.id}Status`));
      }
    }
    innerTable = tableBody.innerHTML;
    saveStorage("oldTask", innerTable);
    sessionStorage.setItem("isCreate", false);
    sessionStorage.setItem("isEdit", false);
    sessionStorage.setItem("isDelete", false);
  }
};
