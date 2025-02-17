import { projects } from "./index";

export const currentDisplay = document.querySelector(
  "#currentDisplay > .project-tasks"
);
export const inputDialog = document.getElementById("inputDialog");
const editDialog = document.getElementById("editDialog");

export function createTask(task, index, projectIndex) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task-item ${task.priority.toLowerCase()}`;
  taskDiv.dataset.projectIndex = `${projectIndex}-${index}`;

  const status = document.createElement("input");
  const title = document.createElement("h3");
  const date = document.createElement("p");
  const viewBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  status.setAttribute("type", "checkbox");
  status.className = "status-checkbox";
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

export function insertTaskNode(data, taskID, projectID) {
  currentDisplay.append(createTask(data, taskID, projectID));
  inputDialog.close();
}

export function createProjectButton(title, index) {
  const list = document.createElement("li");
  const btn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  btn.innerText = title;
  list.dataset.projectIndex = index;
  btn.className = "js-project-btn";
  deleteBtn.innerText = "X";
  deleteBtn.className = "js-delete-project";
  list.append(btn, deleteBtn);

  return list;
}

export function changeHeaderContent(text, index = 0) {
  const projectTitle = document.querySelector(".js-project-title");
  projectTitle.innerText = text;
  projectTitle.dataset.projectIndex = index;
}

export function displayAllTasks() {
  clearCurrentDisplay();
  const fragment = document.createDocumentFragment();
  changeHeaderContent("Home");

  projects.forEach((project, index) => {
    fragment.append(createTaskElements(project.tasks, index));
  });

  currentDisplay.append(fragment);
}

export function filterByProject(target) {
  const text = target.textContent;
  const index = target.closest("li").dataset.projectIndex;
  changeHeaderContent(text, index);

  clearCurrentDisplay();
  currentDisplay.append(createTaskElements(projects[index].tasks, index));
}

export function toggleForm() {
  const projectForm = document.getElementById("projectForm");
  projectForm.classList.toggle("hidden");
}

export function viewTaskDetails(target) {
  const viewDialog = document.getElementById("viewDialog");
  const content = document.querySelector("#viewDialog > div");

  const task = getTaskAttribute(target).details;

  content.innerHTML = `<h3>${task.title}</h3>
                       <p>${task.description}</p>
                       <p>${task.date}</p>
                       <p>${task.priority}</p>
                       <p>${task.status}</p>`;

  viewDialog.showModal();
}

export function closeModal(target) {
  const targetModal = target.closest("dialog");
  targetModal.close();

  if (targetModal.querySelector("form")) {
    resetForm(targetModal);
  }
}

function resetForm(target) {
  target.querySelector("form").reset();

  if (target.querySelector(".IDs")) {
    target.querySelector("input#PID").value = "";
    target.querySelector("input#TID").value = "";
  }
}

export function deleteTaskNode(target) {
  const task = getTaskAttribute(target);
  target.closest("div").remove();
  const projectTasks = document.querySelectorAll(
    "#currentDisplay > .project-tasks > .task-item"
  );
  projectTasks.forEach((el, index) => {
    el.dataset.projectIndex = `${task.PID}-${index}`;
  });
}

export function openEditDialog(target) {
  const task = getTaskAttribute(target);

  const taskID = editDialog.querySelector("#TID");
  const projectID = editDialog.querySelector("#PID");
  const title = editDialog.querySelector("#title");
  const description = editDialog.querySelector("#description");
  const date = editDialog.querySelector("#date");
  const priority = editDialog.querySelector("#priority");

  taskID.value = task.TID;
  projectID.value = task.PID;
  title.value = task.details.title;
  description.value = task.details.description;
  date.value = task.details.date;
  priority.value = task.details.priority || "Medium";

  editDialog.showModal();
}

export function removeProjectTasks(target) {
  const PID = target.closest("li").dataset.projectIndex;
  const currentProject =
    document.querySelector(".js-project-title").dataset.projectIndex;
  if (currentProject === PID) {
    displayAllTasks();
  }
  removeProjectButton(target);
}

function removeProjectButton(target) {
  return target.closest("li").remove();
}

function clearCurrentDisplay() {
  currentDisplay.innerHTML = "";
}

export function getTaskAttribute(target) {
  const taskTarget = target.closest("div").dataset.projectIndex.split("-");
  const PID = parseInt(taskTarget[0]);
  const TID = parseInt(taskTarget[1]);
  const details = projects[PID].tasks[TID];

  return { details, PID, TID };
}

function createTaskElements(tasks, index) {
  const fragment = document.createDocumentFragment();
  const projectIndex = index;

  tasks.forEach((task, index) => {
    fragment.append(createTask(task, index, projectIndex));
  });

  return fragment;
}
