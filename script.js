$(document).ready(function () {
    // Load tasks from localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
        addTaskToDOM(task.text, task.completed);
      });
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      const tasks = [];
      $("#taskList .task-item").each(function () {
        const text = $(this).find("span").text();
        const completed = $(this).find("span").hasClass("completed");
        tasks.push({ text, completed });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Add task to the DOM
    function addTaskToDOM(text, completed = false) {
      const taskItem = $(`
        <li class="task-item">
          <span class="${completed ? 'completed' : ''}">${text}</span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </li>
      `);
      $("#taskList").append(taskItem);
  
      // Add event listeners for marking complete and deleting
      taskItem.find("span").on("click", function () {
        $(this).toggleClass("completed");
        saveTasks();
      });
      taskItem.find(".delete-btn").on("click", function () {
        $(this).parent().fadeOut(300, function () {
          $(this).remove();
          saveTasks();
        });
      });
          // Edit task
    taskItem.find(".edit-btn").on("click", function () {
        const taskSpan = $(this).siblings("span");
        const currentText = taskSpan.text();
        const newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
          taskSpan.text(newText.trim());
          saveTasks();
        }
      });
    }
  
    // Add task on button click
    $("#addTaskBtn").on("click", function () {
      const taskText = $("#taskInput").val().trim();
      if (taskText !== "") {
        addTaskToDOM(taskText);
        saveTasks();
        $("#taskInput").val("");
      }
    });

    $("#clearAllBtn").on("click", function () {
        if (confirm("Are you sure you want to clear all tasks?")) {
            $("#taskList").empty(); // Remove all tasks from the DOM
            localStorage.removeItem("tasks"); // Clear tasks from localStorage
        }
    });
      
    // Load tasks on page load
    loadTasks();
  });
  