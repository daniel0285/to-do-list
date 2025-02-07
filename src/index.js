"strict mode";
import "./styles.scss";
const projects = [
  {
    title: "Default",
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
  {
    title: "Default 2",
    tasks: [
      {
        title: "Task #1 from default 2",
        description: "Description Here",
        dueDate: "Today",
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

const currentDisplay = document.getElementById("currentDisplay");
const inputForm = document.getElementById("inputForm");
const dialog = document.getElementById("dialog");

document.body.addEventListener("click", (e) => {
  if (e.target.id === "add") {
    dialog.showModal();
  }

  if (e.target.id === "home") {
    projects.forEach((project) => {
      console.log(project.title);
      project.tasks.forEach((task) => {
        console.log(`${task.title} ${task.description}`);
      });
    });
  }
});

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const taskData = Object.fromEntries(form);
  projects[0].tasks.push(
    new Task(
      taskData.title,
      taskData.description,
      taskData.date,
      taskData.priority,
      null
    )
  );
  dialog.close();
  inputForm.reset();
});
