import { projects } from "./index";

export const currentDisplay = document.querySelector("#currentDisplay > div");
export const inputDialog = document.getElementById("inputDialog");

export function createTask(task, index, projectIndex) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task-item ${task.priority.toLowerCase()}`;
  // taskDiv.id = index;
  taskDiv.dataset.projectIndex = `${projectIndex}${index}`;

  const status = document.createElement("p");
  const title = document.createElement("h3");
  const date = document.createElement("p");
  const viewBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  status.textContent = task.status;
  title.textContent = task.title;
  date.textContent = task.date;
  viewBtn.className = "btn js-view";
  viewBtn.textContent = "View";
  editBtn.className = "btn js-edit";
  editBtn.textContent = "Edit";
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn js-delete";

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
  const index = e.target.dataset.projectIndex;
  changeHeaderContent(text, index);

  currentDisplay.innerHTML = "";

  currentDisplay.append(createTaskElements(projects[index].tasks, index));
}

export function toggleForm() {
  const projectForm = document.getElementById("projectForm");
  projectForm.classList.toggle("hidden");
}

export function viewTaskDetails(e) {
  const viewDialog = document.getElementById("viewDialog");
  const content = document.querySelector("#viewDialog > div");

  const task = getTaskID(e);

  content.innerHTML = `<h3>${task.title}</h3>
                       <p>${task.description}</p>
                       <p>${task.date}</p>
                       <p>${task.priority}</p>
                       <p>${task.status}</p>`;

  viewDialog.showModal();
}

function getTaskID(e) {
  const taskTarget = e.target.closest("div").dataset.projectIndex.split("");
  const PID = parseInt(taskTarget[0]);
  const TID = parseInt(taskTarget[1]);

  return projects[PID].tasks[TID];
}

export function closeModal(e) {
  const targetModal = e.target.closest("dialog");
  targetModal.querySelector("div").innerHTML = "";
  targetModal.close();
}
