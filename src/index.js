"use strict";
import "./styles.scss";
import * as TDLDom from "./DOM";
import { CONSTANTS } from "./constants";

export const projects = [
  {
    title: "Default",
    tasks: [
      {
        title: "Task #1",
        description: "Description Here",
        date: "2025-02-19",
        priority: "High",
        status: "Not Finished",
      },
      {
        title: "Task #2",
        description: "Description Here",
        date: "2025-02-19",
        priority: "Low",
        status: "Not Finished",
      },
      {
        title: "Task #3",
        description: "Description Here",
        date: "2025-02-19",
        priority: "Medium",
        status: "Not Finished",
      },
      {
        title: "Task #4",
        description: "Description Here",
        date: "2025-02-19",
        priority: "Medium",
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

document.body.addEventListener("click", (e) => {
  if (e.target.id === CONSTANTS.BUTTON_IDS.ADD) {
    TDLDom.inputDialog.showModal();
  }

  if (e.target.id === CONSTANTS.BUTTON_IDS.HOME) {
    TDLDom.displayAllTasks();
  }

  if (e.target.id === CONSTANTS.BUTTON_IDS.PROJECT) {
    TDLDom.toggleForm();
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.PROJECT_BTN)) {
    TDLDom.filterByProject(e.target);
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.VIEW)) {
    TDLDom.viewTaskDetails(e.target);
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.EDIT)) {
    TDLDom.openEditDialog(e.target);
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.CLOSE)) {
    TDLDom.closeModal(e.target);
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.DELETE)) {
    deleteTask(e.target);
    console.log(projects);
  }

  if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.DELETE_PROJECT)) {
    deleteProject(e.target);
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.id === CONSTANTS.FORM_IDS.INPUT) {
    insertTask(e.target);
  }

  if (e.target.id === CONSTANTS.FORM_IDS.PROJECT) {
    createNewProject(e.target);
  }

  if (e.target.id === CONSTANTS.FORM_IDS.EDIT) {
    editTaskDetails(e.target);
  }
});

document.body.addEventListener("change", (e) => {
  if (e.target.className === CONSTANTS.CLASS_NAMES.STATUS_CHECKBOX) {
    updateTaskStatus(e.target);
  }
});

function getFormData(target) {
  const form = new FormData(target);
  const data = Object.fromEntries(form);
  return data;
}

function createNewProject(target) {
  const project = getFormData(target);
  const projectList = document.getElementById("projects");

  projects.push({ title: project.title, tasks: [] });
  const index = projects.length === 0 ? 0 : projects.length - 1;

  projectList.append(TDLDom.createProjectButton(project.title, index));
  TDLDom.toggleForm();
  target.reset();
}

function insertTask(target) {
  const taskData = getFormData(target);

  const currentProject = document.querySelector("#currentDisplay > h2");
  const PID = currentProject.dataset.projectIndex;

  projects[PID].tasks.push(
    new Task(
      taskData.title,
      taskData.description,
      taskData.date,
      taskData.priority,
      CONSTANTS.STATUS.INCOMPLETE
    )
  );

  const TID =
    projects[PID].tasks.length !== 0 ? projects[PID].tasks.length - 1 : 0;

  TDLDom.insertTaskNode(taskData, TID, PID);
  target.reset();
  console.log(projects);
}

function deleteTask(target) {
  const task = TDLDom.getTaskAttribute(target);

  const projectArray = projects[task.PID].tasks;
  projectArray.length === 1
    ? projectArray.pop()
    : projectArray.splice(task.TID, 1);

  TDLDom.deleteTaskNode(target);
}

function deleteProject(target) {
  const index = target.closest("li").dataset.projectIndex;
  projects.length === 1 ? projects.pop() : projects.splice(index, 1);
  TDLDom.removeProjectTasks(target);
}

function updateTaskStatus(target) {
  const targetTask = target.closest("div");
  const data = TDLDom.getTaskAttribute(target);
  const currentTaskData = projects[data.PID].tasks[data.TID];

  targetTask.classList.toggle(CONSTANTS.CLASS_NAMES.COMPLETE);

  if (targetTask.classList.contains(CONSTANTS.CLASS_NAMES.COMPLETE)) {
    currentTaskData.status = CONSTANTS.STATUS.INCOMPLETE;
  } else {
    currentTaskData.status = CONSTANTS.STATUS.INCOMPLETE;
  }
}

function editTaskDetails(target) {
  const formData = getFormData(target);
  const currentTask = projects[formData.PID].tasks[formData.TID];

  currentTask.title = formData.title;
  currentTask.description = formData.description;
  currentTask.date = formData.date;
  currentTask.priority = formData.priority;

  TDLDom.closeModal(target);
  TDLDom.updateTaskNode(formData);
}
