document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTask');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');

    let tasks = []; // Array to store tasks

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
            updateProgress();
        }
    }

    // Function to render tasks on the page
    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = task.completed ? 'completed' : '';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTaskComplete(index));

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.description;

            listItem.appendChild(checkbox);
            listItem.appendChild(taskSpan);
            taskList.appendChild(listItem);
        });
    }

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description !== '') {
            tasks.push({ description: description, completed: false });
            newTaskInput.value = ''; // Clear input field
            saveTasks();
            renderTasks();
            updateProgress();
        }
    });

    // Function to toggle task completion status
    function toggleTaskComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
        updateProgress();
    }

    // Function to update the progress bar and text
    function updateProgress() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        
        let percentage = 0;
        if (totalTasks > 0) {
            percentage = (completedTasks / totalTasks) * 100;
        }

        progressBarFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage.toFixed(0)}% Completed (${completedTasks}/${totalTasks})`;
    }

    // Load tasks when the page loads
    loadTasks();
});