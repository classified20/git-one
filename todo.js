document.addEventListener("DOMContentLoaded", loadTasks);

        function loadTasks() {
            var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(function(task) {
                addTaskToDOM(task);
            });
        }

        function saveTasks() {
            var tasks = [];
            document.querySelectorAll("#todo-list li span").forEach(function(span) {
                tasks.push(span.textContent);
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function addTask() {
            var taskInput = document.getElementById("new-task");
            var taskValue = taskInput.value.trim();
            if (taskValue !== "") {
                addTaskToDOM(taskValue);
                saveTasks();
                taskInput.value = "";
            }
        }

        function addTaskToDOM(taskValue) {
            var ul = document.getElementById("todo-list");
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.textContent = taskValue;
            var editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit";
            editBtn.onclick = function() { editTask(this) };
            var removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = function() { removeTask(this) };
            var div = document.createElement("div");
            div.appendChild(editBtn);
            div.appendChild(removeBtn);
            li.appendChild(span);
            li.appendChild(div);
            ul.appendChild(li);
        }

        function removeTask(button) {
            var li = button.parentElement.parentElement;
            li.remove();
            saveTasks();
        }

        function editTask(button) {
            var li = button.parentElement.parentElement;
            var span = li.querySelector("span");
            var newTask = prompt("Edit Task:", span.textContent);
            if (newTask !== null && newTask.trim() !== "") {
                span.textContent = newTask.trim();
                saveTasks();
            }
        }