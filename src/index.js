"use strict";
import "./styles.scss";
import * as TDLDom from "./DOM";

export const projects = [
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
    TDLDom.inputDialog.showModal();
  }

  if (e.target.id === "home") {
    TDLDom.displayAllTasks();
  }

  if (e.target.id === "projectBtn") {
    TDLDom.toggleForm();
  }

  if (e.target.className === "js-project-btn") {
    TDLDom.filterByProject(e.target);
  }

  if (e.target.classList.contains("js-view")) {
    TDLDom.viewTaskDetails(e.target);
  }

  if (e.target.classList.contains("js-edit")) {
    console.log("edit");
  }

  if (e.target.classList.contains("js-close-btn")) {
    TDLDom.closeModal(e.target);
  }

  if (e.target.classList.contains("js-delete")) {
    deleteTask(e.target);
  }

  if (e.target.classList.contains("js-delete-project")) {
    deleteProject(e.target);
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

function getFormData(e) {
  const form = new FormData(e.target);
  const data = Object.fromEntries(form);
  return data;
}

function createNewProject(e) {
  const project = getFormData(e);
  const projectList = document.getElementById("projects");

  projects.push({ title: project.title, tasks: [] });
  const index = projects.length === 0 ? 0 : projects.length - 1;

  projectList.append(TDLDom.createProjectButton(project.title, index));
  TDLDom.toggleForm();
  e.target.reset();
}

function insertTask(e) {
  const taskData = getFormData(e);

  const currentProject = document.querySelector("#currentDisplay > h2");
  const PID = currentProject.dataset.projectIndex;

  projects[PID].tasks.push(
    new Task(
      taskData.title,
      taskData.description,
      taskData.date,
      taskData.priority,
      null
    )
  );

  const TID = projects[PID].tasks.length === 0 ? 0 : projects[PID].tasks.length;
  TDLDom.insertTaskNode(taskData, TID, PID);
  e.target.reset();
}

function deleteTask(e) {
  const task = TDLDom.getTask(e);

  const projectArray = projects[task.PID].tasks;
  projectArray.length === 1
    ? projectArray.pop()
    : projectArray.splice(task.TID, 1);

  TDLDom.deleteTaskNode(e);
}

function deleteProject(target) {
  const index = target.closest("li").dataset.projectIndex;
  projects.length === 1 ? projects.pop() : projects.splice(index, 1);
  TDLDom.removeProjectTasks(target);
}
