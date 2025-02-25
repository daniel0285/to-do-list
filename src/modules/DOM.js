"use strict";
import { CONSTANTS } from "./constants";
import { projects } from "./logic";
import { format } from "date-fns";

export class TDLDom {
  static currentDisplay = document.querySelector(
    "#currentDisplay > .project-tasks"
  );
  static inputDialog = document.getElementById("inputDialog");
  static editDialog = document.getElementById("editDialog");

  static createTask(task, index, projectIndex) {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task-item ${task.priority.toLowerCase()}`;
    taskDiv.dataset.projectIndex = `${projectIndex}-${index}`;

    const status = document.createElement("input");
    const title = document.createElement("h3");
    const date = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    const [month, day, year] = task.date.split("-");
    const formattedDate = format(
      new Date(year, month - 1, day),
      "MMM dd, yyyy"
    );

    status.setAttribute("type", "checkbox");
    status.className = CONSTANTS.CLASS_NAMES.STATUS_CHECKBOX;
    if (task.status === CONSTANTS.STATUS.COMPLETE) {
      status.checked = true;
      taskDiv.classList.add(CONSTANTS.CLASS_NAMES.COMPLETE);
    } else {
      status.checked = false;
    }
    title.textContent = task.title;
    date.textContent = formattedDate;
    editBtn.className = `btn ${CONSTANTS.CLASS_NAMES.EDIT}`;
    editBtn.textContent = CONSTANTS.TEXT.EDIT;
    deleteBtn.textContent = CONSTANTS.TEXT.DELETE;
    deleteBtn.className = `btn ${CONSTANTS.CLASS_NAMES.DELETE}`;

    taskDiv.append(status, title, date, editBtn, deleteBtn);
    return taskDiv;
  }

  static createTaskElements(tasks, index) {
    const fragment = document.createDocumentFragment();
    const projectIndex = index;

    tasks.forEach((task, index) => {
      fragment.append(this.createTask(task, index, projectIndex));
    });

    return fragment;
  }

  static insertTaskNode(data, taskID, projectID) {
    this.currentDisplay.append(this.createTask(data, taskID, projectID));
    this.inputDialog.close();
  }

  static createProjectButton(title, index) {
    const item = document.createElement("li");
    item.dataset.projectIndex = index;
    const btn = document.createElement("button");
    btn.textContent = title;
    btn.className = CONSTANTS.CLASS_NAMES.PROJECT_BTN;

    if (item.dataset.projectIndex !== "0") {
      const deleteBtn = document.createElement("button");
      deleteBtn.className = CONSTANTS.CLASS_NAMES.DELETE_PROJECT;
      deleteBtn.textContent = CONSTANTS.TEXT.DELETE_ICON;
      item.append(btn, deleteBtn);
    } else {
      item.append(btn);
    }

    return item;
  }

  static displayAllProjects() {
    const projectList = document.querySelector("ul#projects");
    const fragment = document.createDocumentFragment();

    projects.forEach((el, index) => {
      fragment.append(this.createProjectButton(el.title, index));
    });
    projectList.append(fragment);
  }

  static changeHeaderContent(text, index = 0) {
    const projectTitle = document.querySelector(".js-project-title");
    projectTitle.innerText = text;
    projectTitle.dataset.projectIndex = index;
  }

  static displayAllTasks() {
    this.clearCurrentDisplay();
    this.changeHeaderContent(CONSTANTS.TEXT.HOME);
    const fragment = document.createDocumentFragment();

    projects.forEach((project, index) => {
      fragment.append(this.createTaskElements(project.tasks, index));
    });

    this.currentDisplay.append(fragment);
  }

  static filterByProject(index) {
    const text = projects[index].title;
    this.changeHeaderContent(text, index);
    this.clearCurrentDisplay();
    this.currentDisplay.append(
      this.createTaskElements(projects[index].tasks, index)
    );
  }

  static changeCurrentSelected(target) {
    const selected = document.querySelector(".selected");
    selected.classList.remove("selected");
    target.closest("li").classList.add("selected");
  }

  static toggleForm() {
    const projectForm = document.getElementById("projectForm");
    projectForm.classList.toggle("hidden");
  }

  static viewTaskDetails(target) {
    const viewDialog = document.getElementById("viewDialog");
    const content = document.querySelector("#viewDialog > div");
    const task = this.getTaskAttribute(target).details;
    const [month, day, year] = task.date.split("-");
    const formattedDate = format(
      new Date(year, month - 1, day),
      "MMM dd, yyyy"
    );
    content.innerHTML = `<h3>${task.title}</h3>
                       <p>Description: ${task.description}</p>
                       <p>Deadline: ${formattedDate}</p>
                       <p>Importance: ${task.priority}</p>
                       <p>Status: ${task.status}</p>`;
    viewDialog.showModal();
  }

  static closeModal(target) {
    const targetModal = target.closest("dialog");
    targetModal.close();

    if (targetModal.querySelector("form")) {
      this.resetForm(targetModal);
    }
  }

  static resetForm(target) {
    target.querySelector("form").reset();

    if (target.querySelector(".IDs")) {
      target.querySelector("input#PID").value = "";
      target.querySelector("input#TID").value = "";
    }
  }

  static openEditDialog(target) {
    const task = this.getTaskAttribute(target);
    this.populateEditForm(task);
    this.editDialog.showModal();
  }

  static populateEditForm(task) {
    const taskID = editDialog.querySelector("#TID");
    const projectID = editDialog.querySelector("#PID");
    const title = editDialog.querySelector("#title");
    const description = editDialog.querySelector("#description");
    const date = editDialog.querySelector("#date");
    const priority = editDialog.querySelector(
      `#priority > option[value=${task.details.priority}]`
    );

    const [month, day, year] = task.details.date.split("-");
    const formattedDate = format(new Date(year, month - 1, day), "yyyy-MM-dd");

    taskID.value = task.TID;
    projectID.value = task.PID;
    title.value = task.details.title;
    description.value = task.details.description;
    date.value = formattedDate;
    priority.selected = true;
  }

  static updateTaskNode(data) {
    const currentTaskNode = document.querySelector(
      `div[data-project-index="${data.PID}-${data.TID}"]`
    );
    const editedTaskNode = this.createTask(data, data.TID, data.PID);
    currentTaskNode.replaceWith(editedTaskNode);
  }

  static removeProjectTasks(target) {
    const PID = target.closest("li").dataset.projectIndex;
    const currentProject =
      document.querySelector(".js-project-title").dataset.projectIndex;
    if (currentProject === PID) {
      this.displayAllTasks();
    }
    this.removeProjectButton(target);
  }

  static removeProjectButton(target) {
    return target.closest("li").remove();
  }

  static clearCurrentDisplay() {
    this.currentDisplay.innerHTML = "";
  }

  static getTaskAttribute(target) {
    const taskTarget = target
      .closest(".task-item")
      .dataset.projectIndex.split("-");
    const PID = parseInt(taskTarget[0]);
    const TID = parseInt(taskTarget[1]);
    const details = projects[PID].tasks[TID];

    return { details, PID, TID };
  }

  static setFooterText() {
    const footer = document.querySelector("footer > p");

    footer.textContent = `Copyright © ${new Date().getFullYear()} daniel`;
  }
}
