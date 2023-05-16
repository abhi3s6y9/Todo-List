let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function renderList () {}

function markTaskAsComplete (taskId) {}

// To delete a task from array and show notification
function deleteTask (taskId) {
    // Create a new task array from the existing tasks array by using filter function of array
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })

    // make the original tasks array point to newTasks array
    tasks = newTasks;

    renderList();
    showNotification("Task deleted successfully");
}

// To add the Task in the tasks array and call renderList function after that
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
    }

    showNotification("Task cannot be added");
}

// Function to show Notification when there is some error, task added or deleted
function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if(e.key == 'Enter'){
        const text = e.target.value;

        if (!text) {
            showNotification('Task text can not be empty');
            return;
        }

        // Task object
        const task = {
            text, // short hand for "text: text,"
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }

}

addTaskInput.addEventListener('keyup', handleInputKeypress);

