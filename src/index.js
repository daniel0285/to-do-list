"strict mode";
import "./styles.scss";
const projects = [
  {
    title: "Default",
    tasks: [
      {
        title: "Task #1",
        description: "Description Here",
        date: "Today",
        priority: "Important",
        status: "Not Finished",
      },
      {
        title: "Task #2",
        description: "Description Here",
        date: "Today",
        priority: "Important",
        status: "Not Finished",
      },
      {
        title: "Task #3",
        description: "Description Here",
        date: "Today",
        priority: "Important",
        status: "Not Finished",
      },
    ],
  },
  {
    title: "Default 2",
    tasks: [
      {
        title: "Task #1 from default 2",
        description: "Description Here",
        date: "Today",
        priority: "Important",
        status: "Not Finished",
      },
    ],
  },
];

class Task {
  constructor(title, description, date, priority, status) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.status = status;
  }
}

const currentDisplay = document.getElementById("currentDisplay");

document.body.addEventListener("click", (e) => {
  if (e.target.id === "addBtn") {
    dialog.showModal();
  }

  if (e.target.id === "home") {
    displayAllTasks();
  }

  if (e.target.id === "projectBtn") {
    toggleForm();
  }

  if (e.target.className === "js-project-btn") {
    filterByProject(e);
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.id === "inputForm") {
    insertTask(e);
  }

  if (e.target.id === "projectForm") {
    const form = new FormData(e.target);
    const project = Object.fromEntries(form);
    projects.push({ title: project.title, tasks: [] });

    const projectList = document.getElementById("projects");
    const list = document.createElement("li");
    const btn = document.createElement("button");

    btn.innerText = project.title;
    btn.dataset.projectIndex = projects.length - 1;
    btn.className = "js-project-btn";
    list.append(btn);
    projectList.append(list);

    toggleForm();
    e.target.reset();
  }
});

function filterByProject(e) {
  currentDisplay.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const text = e.target.textContent;
  // The code below finds the index of the target based on the text content
  const projectIndex = projects.map((task) => task.title).indexOf(text);

  projects[projectIndex].tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.id = index;
    taskDiv.dataset.projectIndex = projectIndex;

    const status = document.createElement("p");
    status.textContent = task.status;
    const title = document.createElement("h3");
    title.textContent = task.title;
    const date = document.createElement("p");
    date.textContent = task.date;

    taskDiv.append(title, date, status);
    fragment.append(taskDiv);
    currentDisplay.append(fragment);
  });
}

function displayAllTasks() {
  currentDisplay.innerHTML = "";
  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const projectIndex = index;

    project.tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.id = index;
      taskDiv.dataset.projectIndex = projectIndex;

      const status = document.createElement("p");
      status.textContent = task.status;
      const title = document.createElement("h3");
      title.textContent = task.title;
      const date = document.createElement("p");
      date.textContent = task.date;

      taskDiv.append(title, date, status);
      fragment.append(taskDiv);
    });
    currentDisplay.append(fragment);
  });
}

function toggleForm() {
  const projectForm = document.getElementById("projectForm");
  projectForm.classList.toggle("hidden");
}

function insertTask(e) {
  const dialog = document.getElementById("dialog");
  const form = new FormData(e.target);
  const taskData = Object.fromEntries(form);
  projects[0].tasks.push(
    new Task(
      taskData.title,
      taskData.description,
      taskData.date,
      taskData.priority,
      null
    )
  );
  dialog.close();
  e.target.reset();
}
