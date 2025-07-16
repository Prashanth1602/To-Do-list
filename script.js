document.addEventListener("DOMContentLoaded", () => {
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToDOM(task.text, task.completed);
    });
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList .task-item").forEach((item) => {
      const text = item.querySelector("span").textContent;
      const completed = item.querySelector("span").classList.contains("completed");
      tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToDOM(text, completed = false) {
    const taskList = document.getElementById("taskList");

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = text;
    if (completed) {
      taskSpan.classList.add("completed");
    }

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskSpan.addEventListener("click", () => {
      taskSpan.classList.toggle("completed");
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      taskItem.style.transition = "opacity 0.3s ease-out";
      taskItem.style.opacity = "0";
      setTimeout(() => {
        taskItem.remove();
        saveTasks();
      }, 300);
    });

    editButton.addEventListener("click", () => {
      const currentText = taskSpan.textContent;
      const newText = prompt("Edit your task:", currentText);
      if (newText !== null && newText.trim() !== "") {
        taskSpan.textContent = newText.trim();
        saveTasks();
      }
    });
  }

  document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTaskToDOM(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });

  document.getElementById("clearAllBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = ""; 
      localStorage.removeItem("tasks"); 
    }
  });

  loadTasks();
});