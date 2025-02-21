import { projects } from "./index";

export class Storage {
  static retrieveData() {
    if (localStorage.getItem("projects")) {
      return JSON.parse(localStorage.getItem("projects"));
    } else {
      return [{ title: "Default", tasks: [] }];
    }
  }

  static storeData() {
    return localStorage.setItem("projects", JSON.stringify(projects));
  }
}
