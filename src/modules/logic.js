import { TDLDom } from "./DOM";
import { CONSTANTS } from "./constants";
import { Storage } from "./storage";
import { format } from "date-fns";

export const projects = Storage.retrieveData();

class Task {
  constructor(title, description, date, priority, status) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.status = status;
  }
}

export class Controller {
  static getFormData(target) {
    const form = new FormData(target);
    const data = Object.fromEntries(form);
    return data;
  }

  static createNewProject(target) {
    const project = this.getFormData(target);
    const projectList = document.getElementById("projects");

    projects.push({ title: project.title, tasks: [] });
    const index = projects.length === 0 ? 0 : projects.length - 1;

    projectList.append(TDLDom.createProjectButton(project.title, index));
    TDLDom.toggleForm();
    target.reset();
  }

  static insertTask(target) {
    const taskData = this.getFormData(target);

    const currentProject = document.querySelector(
      "#currentDisplay > .project-header > h2"
    );
    const PID = currentProject.dataset.projectIndex;

    const [year, month, day] = taskData.date.split("-");
    const formattedDate = format(new Date(year, month - 1, day), "MM-dd-yyyy");

    projects[PID].tasks.push(
      new Task(
        taskData.title,
        taskData.description,
        formattedDate,
        taskData.priority,
        CONSTANTS.STATUS.INCOMPLETE
      )
    );

    const TID =
      projects[PID].tasks.length !== 0 ? projects[PID].tasks.length - 1 : 0;

    TDLDom.insertTaskNode(projects[PID].tasks[TID], TID, PID);
    target.reset();
  }

  static deleteTask(target) {
    const task = TDLDom.getTaskAttribute(target);
    const projectArray = projects[task.PID].tasks;
    projectArray.length === 1
      ? projectArray.pop()
      : projectArray.splice(task.TID, 1);
    this.updateDisplay();
  }

  static updateDisplay() {
    const header = document.querySelector(".js-project-title");
    const index = Number(header.dataset.projectIndex);
    header.textContent === "Home"
      ? TDLDom.displayAllTasks()
      : TDLDom.filterByProject(index);
  }

  static deleteProject(target) {
    const index = target.closest("li").dataset.projectIndex;
    projects.length === 1 ? projects.pop() : projects.splice(index, 1);
    TDLDom.removeProjectTasks(target);
  }

  static updateTaskStatus(target) {
    const targetTask = target.closest("div");
    const data = TDLDom.getTaskAttribute(target);
    const currentTaskData = projects[data.PID].tasks[data.TID];

    targetTask.classList.toggle(CONSTANTS.CLASS_NAMES.COMPLETE);

    currentTaskData.status = targetTask.classList.contains(
      CONSTANTS.CLASS_NAMES.COMPLETE
    )
      ? CONSTANTS.STATUS.COMPLETE
      : CONSTANTS.STATUS.INCOMPLETE;
  }

  static editTaskDetails(target) {
    const formData = this.getFormData(target);
    const currentTask = projects[formData.PID].tasks[formData.TID];

    const [year, month, day] = formData.date.split("-");
    const formattedDate = format(new Date(year, month - 1, day), "MM-dd-yyyy");
    formData.date = formattedDate;

    currentTask.title = formData.title;
    currentTask.description = formData.description;
    currentTask.date = formData.date;
    currentTask.priority = formData.priority;

    TDLDom.closeModal(target);
    TDLDom.updateTaskNode(formData);
  }
}
