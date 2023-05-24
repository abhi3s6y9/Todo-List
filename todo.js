let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const addTaskButton = document.getElementById('add-button');
const tasksCounter = document.getElementById('tasks-counter');


// Function to add the task list to web page
function addTaskToDOM (task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}"> ${task.text} </label>
        <i class="fa-regular fa-square-minus" id="delete" data-id="${task.id}" style="color:red;"></i>
    `;

    tasksList.append(li);
}


// Function to loop over the tasks array and call addTaskToDOM function to show list on web page one by one. 
// Then it will update the tasksCounter as well from the length of tasks array
function renderList () {
    tasksList.innerHTML = '';

    for(let i=0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}


// Function to toggle the boolean property "done" of task object
function markTaskAsComplete (taskId) {
    // filter function will return array of task objects
    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();

        if(currentTask.done)
            showNotification("Task marked as complete");
        else
            showNotification("Task unchecked");

        return;
    }

    showNotification("Could not mark the Task as complete");
}


// To delete a task from array and show notification
function deleteTask (taskId) {
    // Create a new task array from the existing tasks array by using filter function of array
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId;
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
            showNotification('Task text cannot be empty');
            return;
        }

        // Task object
        const task = {
            text, // short hand for "text: text"
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }

}


// Function for Add button
function handleInputButton(e){
    if(e){
        const text = addTaskInput.value;

        if(!text){
            showNotification("Text cannot be empty!");
            return;
        }

        // Task object
        const task = {
            text, // short hand for "text: text"
            id: Date.now().toString(),
            done: false
        }

        addTaskInput.value = '';
        addTask(task);
    }
}


// Function for Event delegation to see functionality in action
function handleClickListener(e) {
    const target = e.target;

    if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
    else if(target.id === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
}


function initializeApp () {
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    addTaskButton.addEventListener('click', handleInputButton);
    document.addEventListener('click', handleClickListener);
}

initializeApp();