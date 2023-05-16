const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function renderList () {}

function markTaskAsComplete (taskId) {}

function deleteTask (taskId) {}

// To add the Task in the tasks array and call renderList function after that
function addTask (task) {}

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

