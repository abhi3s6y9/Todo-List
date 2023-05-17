let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function addTaskToDOM (task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        
        <i class="fa-regular fa-square-minus delete" data-id="${task.id}"></i>
    `;

    tasksList.append(li);
}


function renderList () {
    tasksList.innerHTML = '';

    for(let i=0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}


function markTaskAsComplete (taskId) {
    // filter function will return array of task
    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task marked as complete");
        return;
    }

    showNotification("Could not mark the Task as complete");
}


// To delete a task from array and show notification
function deleteTask (taskId) {
    // Create a new task array from the existing tasks array by using filter function of array
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    });

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


// Task should be added after the user fills the required field and presses Enter
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
