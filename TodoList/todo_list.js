const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllTaskBtn = document.getElementById("clearAllTaskBtn");

let tasks = [];

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
clearAllTaskBtn.addEventListener("click", clearAllTask);


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText});
        taskInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>`;
        li.querySelector("input").addEventListener("change", () => toggleTask(index));
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

function clearAllTask() {
    tasks.splice(0, tasks.length);
    displayTasks();
}