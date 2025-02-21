import { projects } from "./index";

export class Storage {
  static retrieveData() {
    return JSON.parse(localStorage.getItem("projects"));
  }

  static storeData() {
    return localStorage.setItem("projects", JSON.stringify(projects));
  }
}
