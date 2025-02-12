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
    TDLDom.filterByProject(e);
  }

  if (e.target.classList.contains("js-view")) {
    TDLDom.viewTaskDetails(e);
  }

  if (e.target.classList.contains("js-close-btn")) {
    TDLDom.closeModal(e);
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
  const index = projects.length === 0 ? 1 : projects.length - 1;
  console.log(projects);

  projectList.append(TDLDom.createProjectButton(project.title, index));
  TDLDom.toggleForm();
  e.target.reset();
}

function insertTask(e) {
  const taskData = getFormData(e);

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
    TDLDom.createTask(taskData, projects[index].tasks.length - 1, index)
  );
  TDLDom.inputDialog.close();
  e.target.reset();
}
