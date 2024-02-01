let tasks = [
    { id: 1, taskName: "Task 1" }
]
let isEditTask = false;
let editId;

let ulElem = document.querySelector(".task-list")
displayTasks();

// DISPLAY TASKS FUNCTION
function displayTasks() {
    let tasksHtml = tasks.map(task => {
        return /*html*/ `
            <li class="task list-group-item d-flex justify-content-between">
                <div>
                    <label id="${task.id}" class="form-check-label" for="firstCheckbox"
                    >${task.taskName}</label
                >
                </div>
                <ul class="icons d-flex align-items-center gap-3">
                    <a onclick='checkTask(this)' href="#"><i class="checkTask fa-solid fa-check"></i></a>
                    <a onclick='editTask(${task.id}, "${task.taskName}")' href="#"><i class="fa-solid fa-pen"></i></a>
                    <a onclick="deleteTask(${task.id})" href="#"><i class="fa-solid fa-trash"></i></a>
                </ul>
            </li>
        `;
    });

    ulElem.innerHTML = tasksHtml.join("");
};

let taskInputElem = document.querySelector(".taskInput");
let taskInputBtnElem = document.querySelector(".taskInputBtn");

taskInputBtnElem.addEventListener("click", addNewTask);
taskInputElem.addEventListener("keypress", function (e) {
    // console.log(e.key)
    if (e.key === "Enter") {
        addNewTask();
    }
});

// ADD NEW TASK FUNCTION
function addNewTask() {
    // console.log(taskInputElem.value)
    if (taskInputElem.value === "") {
        alert("Geben Sie bitte einen Taskname ein...")
    } else {

        if (!isEditTask) {
            tasks.push({ id: tasks[tasks.length - 1].id + 1, taskName: taskInputElem.value });
        } else {
            // Bearbeiten - Aktualisierung Task: Wenn isEditTask true, dann bearbeiten wir Task.

            for (let task of tasks) {
                if (task.id == editId) {
                    task.taskName = taskInputElem.value;
                }
                isEditTask = false;
            }
        }
        taskInputElem.value = "";
        displayTasks();
    }
};


// EDIT TASK FUNCTION: ADD TASK FUNCTION MUSS BEARBEITET WERDEN
function editTask(taskId, taskName) {
    isEditTask = true;

    editId = taskId;
    taskInputElem.value = taskName;
    taskInputElem.focus();
    taskInputElem.classList.add("active");

    // console.log("edit id", editId);
    // console.log("edit mode", isEditTask);
};

// Delete Task Function
function deleteTask(id) {
    // console.log(id);

    let deletedId;
    for (let index in tasks) {
        if (tasks[index].id == id) {
            deletedId = index;
        }
    }
    tasks.splice(deletedId, 1);
    displayTasks();
};



// CHECK TASK FUNCTION
function checkTask(selectedTask) {

    let taskLiElem = selectedTask.parentElement.parentElement;
    console.log(taskLiElem)

    let taskLabelElem = taskLiElem.querySelector(".form-check-label");
    console.log(taskLabelElem)

    taskLabelElem.classList.toggle("text-decoration-line-through")
};

// Delete all tasks function
// Animation for deleting all tasks
let allClearBtnElem = document.querySelector("#allClearBtn");
allClearBtnElem.addEventListener("click", function () {
      tasks.splice(0, tasks.length);
      displayTasks();
  });
