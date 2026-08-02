// =========================================
// TaskFlow 2.0
// =========================================

// =========================================
// Configuration
// =========================================

const API_URL = "http://127.0.0.1:8000";

// =========================================
// Global State
// =========================================

let allTasks = [];
let currentFilter = "all";

// =========================================
// DOM Elements
// =========================================

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");

const addTaskBtn = document.getElementById("addTaskBtn");

const searchInput = document.getElementById("searchInput");

const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Filter Buttons

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

// =========================================
// Utility Functions
// =========================================

// Format Due Date

function formatDate(date){

    if(!date){

        return "No Due Date";

    }

    return new Date(date).toLocaleString();

}

// Check if Task is Overdue

function isOverdue(task){

    if(!task.due_date){

        return false;

    }

    return (
        !task.completed &&
        new Date(task.due_date) < new Date()
    );

}

// Dashboard Statistics

function updateStatistics(tasks){

    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

// =========================================
// Toast Notifications
// =========================================

function showToast(message, type = "success"){

    const toastContainer = document.getElementById("toastContainer");

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Keep visible for 5 seconds

    setTimeout(() => {

        toast.style.animation = "fadeOut .4s ease forwards";

        setTimeout(() => {

            toast.remove();

        },400);

    },5000);

}

// =========================================
// Render Functions
// =========================================

// Display a Single Task Card

function displayTask(task){

    const priorityClass = task.priority.toLowerCase();

    const card = document.createElement("div");

    card.className = task.completed
        ? "task-card completed"
        : "task-card";

    card.innerHTML = `

        <h3>${task.title}</h3>

        <p>${task.description || "No description provided."}</p>

        <div class="task-info">

            <span class="badge ${priorityClass}">
                ${task.priority}
            </span>

            <span>
                📅 ${formatDate(task.due_date)}
            </span>

        </div>

        ${
            isOverdue(task)
            ?
            `
            <div class="overdue-badge">

                ⚠ OVERDUE

            </div>
            `
            :
            ""
        }

        <div class="actions">

            <button
                class="complete-btn"
                onclick="completeTask(${task.id})">

                ${
                    task.completed
                    ? "✔ Completed"
                    : "✔ Complete"
                }

            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">

                Delete

            </button>

        </div>

    `;

    taskList.appendChild(card);

}



// Render Multiple Tasks

function renderTasks(tasks){

    taskList.innerHTML = "";

    if(tasks.length === 0){

        taskList.innerHTML = `

            <div class="empty-state">

                <h3>📭 No Tasks Found</h3>

                <p>Create a task or change your search.</p>

            </div>

        `;

        return;

    }

    tasks.forEach(displayTask);

}

// =========================================
// Filtering
// =========================================

function applyFilters(){

    let filteredTasks = [...allTasks];

    // Apply Status Filter

    if(currentFilter === "pending"){

        filteredTasks = filteredTasks.filter(task => !task.completed);

    }

    else if(currentFilter === "completed"){

        filteredTasks = filteredTasks.filter(task => task.completed);

    }

    // Apply Search Filter

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    if(keyword){

        filteredTasks = filteredTasks.filter(task =>

            task.title.toLowerCase().includes(keyword) ||

            (task.description || "")
                .toLowerCase()
                .includes(keyword)

        );

    }

    renderTasks(filteredTasks);

}



// =========================================
// Active Filter Button
// =========================================

function setActiveFilter(activeButton){

    document.querySelectorAll(".filter-btn")
        .forEach(button =>

            button.classList.remove("active")

        );

    activeButton.classList.add("active");

}

// =========================================
// API Functions
// =========================================

// Load Tasks

async function loadTasks(){

    try{

        const response = await fetch(`${API_URL}/tasks`);

        allTasks = await response.json();

        updateStatistics(allTasks);

        applyFilters();

    }
    catch(error){

        console.error(error);

        taskList.innerHTML = `
            <div class="empty-state">
                <h3>⚠ Error</h3>
                <p>Unable to load tasks.</p>
            </div>
        `;

    }

}



// Create Task

async function createTask(task){

    await fetch(`${API_URL}/tasks`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(task)

    });

}



// Complete Task

async function completeTask(id){

    await fetch(`${API_URL}/tasks/${id}/complete`,{

        method:"PATCH"

    });

    await loadTasks();

}



// Delete Task

async function deleteTask(id){

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if(!confirmed){

        return;

    }

    await fetch(`${API_URL}/tasks/${id}`,{

        method:"DELETE"

    });

    await loadTasks();

}

// =========================================
// Event Listeners
// =========================================

// Add Task

addTaskBtn.addEventListener("click", async () => {

    if (titleInput.value.trim() === "") {

         showToast("Please enter a task title.", "error");

        return;

    }

    const task = {

        title: titleInput.value.trim(),

        description: descriptionInput.value.trim(),

        priority: priorityInput.value,

        due_date: dueDateInput.value
            ? new Date(dueDateInput.value).toISOString()
            : null

    };

    await createTask(task);

    showToast("Task created successfully!");

    titleInput.value = "";
    descriptionInput.value = "";
    priorityInput.value = "Medium";
    dueDateInput.value = "";

    await loadTasks();

});


// Live Search

searchInput.addEventListener("input", () => {

    applyFilters();

});

// =========================================
// Filter Buttons
// =========================================

allBtn.addEventListener("click", () => {

    currentFilter = "all";

    setActiveFilter(allBtn);

    applyFilters();

});

pendingBtn.addEventListener("click", () => {

    currentFilter = "pending";

    setActiveFilter(pendingBtn);

    applyFilters();

});

completedBtn.addEventListener("click", () => {

    currentFilter = "completed";

    setActiveFilter(completedBtn);

    applyFilters();

});

// =========================================
// Initialize Application
// =========================================

loadTasks();