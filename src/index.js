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
  // {
  //   title: "Default 2",
  //   tasks: [
  //     {
  //       title: "Task #1 from default 2",
  //       description: "Description Here",
  //       date: "Today",
  //       priority: "Important",
  //       status: "Not Finished",
  //     },
  //   ],
  // },
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
    createNewProject(e);
  }
});

function createNewProject(e) {
  const form = new FormData(e.target);
  const project = Object.fromEntries(form);
  const projectList = document.getElementById("projects");

  projects.push({ title: project.title, tasks: [] });
  const index = project.length - 1;

  projectList.append(createProjectButton(project.title, index));
  toggleForm();
  e.target.reset();
}

function createProjectButton(title, index) {
  const list = document.createElement("li");
  const btn = document.createElement("button");

  btn.innerText = title;
  btn.dataset.projectIndex = index;
  btn.className = "js-project-btn";
  list.append(btn);

  return list;
}

function createTaskElements(tasks, index) {
  const fragment = document.createDocumentFragment();
  const projectIndex = index;

  tasks.forEach((task, index) => {
    fragment.append(createTask(task, index, projectIndex));
  });

  return fragment;
}

function createTask(task, index, projectIndex) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task-item ${task.priority.toLowerCase()}`;
  taskDiv.id = index;
  taskDiv.dataset.projectIndex = projectIndex;

  const status = document.createElement("p");
  const title = document.createElement("h3");
  const date = document.createElement("p");
  const viewBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  status.textContent = task.status;
  title.textContent = task.title;
  date.textContent = task.date;
  viewBtn.className = "btn view";
  viewBtn.textContent = "View";
  editBtn.className = "btn edit";
  editBtn.textContent = "Edit";
  deleteBtn.textContent = "Delete";

  taskDiv.append(title, date, status, viewBtn, editBtn, deleteBtn);
  return taskDiv;
}

const currentDisplay = document.querySelector("#currentDisplay > div");

function filterByProject(e) {
  const text = e.target.textContent;
  const projectIndex = e.target.dataset.projectIndex;
  changeHeaderContent(text, projectIndex);

  currentDisplay.innerHTML = "";
  currentDisplay.append(
    createTaskElements(projects[projectIndex].tasks, projectIndex)
  );
}

function changeHeaderContent(text, index = 0) {
  const projectTitle = document.querySelector(".project-title");
  projectTitle.innerText = text;
  projectTitle.dataset.projectIndex = index;
}

function displayAllTasks() {
  currentDisplay.innerHTML = "";
  const fragment = document.createDocumentFragment();
  changeHeaderContent("Home");

  projects.forEach((project, index) => {
    fragment.append(createTaskElements(project.tasks, index));
  });

  currentDisplay.append(fragment);
}

function toggleForm() {
  const projectForm = document.getElementById("projectForm");
  projectForm.classList.toggle("hidden");
}

function insertTask(e) {
  const dialog = document.getElementById("dialog");
  const form = new FormData(e.target);
  const taskData = Object.fromEntries(form);

  const currentProject = document.querySelector("#currentDisplay > h2");
  let index = currentProject.dataset.projectIndex;

  projects[index].tasks.push(
    new Task(
      taskData.title,
      taskData.description,
      taskData.date,
      taskData.priority,
      null
    )
  );

  currentDisplay.append(
    createTask(taskData, projects[index].tasks.length - 1, index)
  );
  dialog.close();
  e.target.reset();
}

console.log(projects[0]);
