import { TDLDom } from "./DOM";
import { CONSTANTS } from "./constants";
import { Storage } from "./storage";
import { Controller } from "./logic";

export function ToDoListHandler() {
  TDLDom.displayAllProjects();
  TDLDom.displayAllTasks();

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
      const index = e.target.closest("li").dataset.projectIndex;
      TDLDom.filterByProject(index);
      console.log(index);
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
      Controller.deleteTask(e.target);
      Storage.storeData();
    }

    if (e.target.classList.contains(CONSTANTS.CLASS_NAMES.DELETE_PROJECT)) {
      Controller.deleteProject(e.target);
      Storage.storeData();
    }
  });

  document.body.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.id === CONSTANTS.FORM_IDS.INPUT) {
      Controller.insertTask(e.target);
      Storage.storeData();
    }

    if (e.target.id === CONSTANTS.FORM_IDS.PROJECT) {
      Controller.createNewProject(e.target);
      Storage.storeData();
    }

    if (e.target.id === CONSTANTS.FORM_IDS.EDIT) {
      Controller.editTaskDetails(e.target);
      Storage.storeData();
    }
  });

  document.body.addEventListener("change", (e) => {
    if (e.target.className === CONSTANTS.CLASS_NAMES.STATUS_CHECKBOX) {
      Controller.updateTaskStatus(e.target);
      Storage.storeData();
    }
  });
}
