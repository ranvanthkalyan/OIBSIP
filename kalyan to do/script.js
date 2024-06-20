document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const descriptionInput = document.getElementById("description-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const completedList = document.getElementById("completed-list");

    addButton.addEventListener("click", () => {
        const task = todoInput.value.trim();
        const description = descriptionInput.value.trim();

        if (task !== "") {
            addTodoItem(task, description);
            todoInput.value = "";
            descriptionInput.value = "";
            todoInput.focus();
        }
    });

    function addTodoItem(task, description) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <span class="task-text">${task}</span>
                <p class="task-description">${description}</p>
            </div>
            <button class="close-button">X</button>
            <button class="toggle-button">&#10003;</button>`;
        
        todoList.appendChild(li);

        const closeButton = li.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            li.remove();
        });

        const toggleButton = li.querySelector(".toggle-button");
        toggleButton.addEventListener("click", () => {
            li.remove();
            moveToCompleted(task, description);
        });
    }

    function moveToCompleted(task, description) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <span class="task-text">${task}</span>
                <p class="task-description">${description}</p>
            </div>
            <button class="close-button">X</button>
            <button class="toggle-button">&lt;</button>`;

        completedList.appendChild(li);

        const closeButton = li.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            li.remove();
        });

        const toggleButton = li.querySelector(".toggle-button");
        toggleButton.addEventListener("click", () => {
            li.remove();
            addTodoItem(task, description);
        });
    }
});
``
