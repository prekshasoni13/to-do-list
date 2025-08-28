document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Display tasks on load
    renderTasks();

    // Add task
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    });

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task ${task.completed ? "completed" : ""}`;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            // Toggle complete
            li.querySelector("input").addEventListener("change", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            // Edit task
            li.querySelector(".edit").addEventListener("click", () => {
                const newTask = prompt("Edit task:", task.text);
                if (newTask && newTask.trim() !== "") {
                    task.text = newTask.trim();
                    saveTasks();
                    renderTasks();
                }
            });

            // Delete task
            li.querySelector(".delete").addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(li);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
