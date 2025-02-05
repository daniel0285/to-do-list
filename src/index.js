"strict mode";
import "./styles.scss";

const projects = [
  {
    projectTitle: "Default",
    tasks: [
      {
        title: "Task #1",
        description: "Description Here",
        dueDate: "Today",
        priority: "Important",
        status: "Not Finished",
      },
    ],
  },
];

class Task {
  constructor(title, description, dueDate, priority, status) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }
}
