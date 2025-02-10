import { projects } from "./index";

const currentDisplay = document.querySelector("#currentDisplay > div");

export function createTask(task, index, projectIndex) {
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

function createTaskElements(tasks, index) {
  const fragment = document.createDocumentFragment();
  const projectIndex = index;

  tasks.forEach((task, index) => {
    fragment.append(createTask(task, index, projectIndex));
  });

  return fragment;
}

export function createProjectButton(title, index) {
  const list = document.createElement("li");
  const btn = document.createElement("button");

  btn.innerText = title;
  btn.dataset.projectIndex = index;
  btn.className = "js-project-btn";
  list.append(btn);

  return list;
}

export function changeHeaderContent(text, index = 0) {
  const projectTitle = document.querySelector(".project-title");
  projectTitle.innerText = text;
  projectTitle.dataset.projectIndex = index;
}

export function displayAllTasks() {
  currentDisplay.innerHTML = "";
  const fragment = document.createDocumentFragment();
  changeHeaderContent("Home");

  projects.forEach((project, index) => {
    fragment.append(createTaskElements(project.tasks, index));
  });

  currentDisplay.append(fragment);
}

export function filterByProject(e) {
  const text = e.target.textContent;
  const projectIndex = e.target.dataset.projectIndex;
  changeHeaderContent(text, projectIndex);

  currentDisplay.innerHTML = "";
  currentDisplay.append(
    createTaskElements(projects[projectIndex].tasks, projectIndex)
  );
}

export function toggleForm() {
  const projectForm = document.getElementById("projectForm");
  projectForm.classList.toggle("hidden");
}
