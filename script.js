addTasks = function() {
    const task = {
        name: document.querySelector('#task-name').value,
        description: document.querySelector('#task-desc').value,
        dueDate: document.querySelector('#task-date').value,
        dueTime: document.querySelector('#task-time').value,
        importance: document.querySelector('input[name="importance"]:checked')?.value || "No importance level selected"
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
   userInput = document.createElement("ul");
   //grabbing task name
   tname = document.createElement("li");
   tname.textContent = document.querySelector('#task-name').value;
   userInput.appendChild(tname);
   //grabbing task description
   description = document.createElement("li");
   description.textContent = document.querySelector('#task-desc').value;
   userInput.appendChild(description);
   //grabbing due date
   date = document.createElement("li");
   date.textContent = document.querySelector('#task-date').value;
   userInput.appendChild(date);
   //grabbing due time
   time = document.createElement("li");
   time.textContent = document.querySelector('#task-time').value;
   userInput.appendChild(time);  
   //grabbing importance level
    let choice = document.createElement("li");
    let selectedChoice = document.querySelector('input[name="importance"]:checked');
    choice.textContent = selectedChoice ? `Importance Level: ${selectedChoice.value}` : "No importance level selected";
       userInput.appendChild(choice);

    
   const outputContainer = document.getElementById("output");
   if (!outputContainer) {
       const newContainer = document.createElement("div");
       newContainer.id = "output";
       newContainer.appendChild(userInput);
       document.body.appendChild(newContainer);
   } else {
       outputContainer.innerHTML = ""; 
       outputContainer.appendChild(userInput);
   }

}

window.onload = function() {
    const taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="task-detail.html?taskId=${index}">${task.name}</a>`;
        taskList.appendChild(li);
    });
}

window.onload = function() {
    
    const taskList = document.getElementById("task-list");
    if (taskList) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach((task, index) => {
            let li = document.createElement('li');
            li.innerHTML = `<a href="task-detail.html?taskId=${index}">${task.name}</a>`;
            taskList.appendChild(li);
        });
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('taskId');
    if (taskId != null) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let task = tasks[taskId];

        if (task) {
            
            document.getElementById('task-detail').innerHTML = `
                <h2>${task.name}</h2>
                <p>${task.description}</p>
                <p>Due Date: ${task.dueDate}</p>
                <p>Due Time: ${task.dueTime}</p>
                <p>Importance: ${task.importance}</p>
            `;

            
            const form = document.getElementById('edit-form');
            form.onsubmit = function(e) {
                e.preventDefault();
                const editInfo = document.getElementById('edit-info').value;

                task.description += '\n' + editInfo;  
                tasks[taskId] = task;  
                localStorage.setItem('tasks', JSON.stringify(tasks));

                alert("Task updated!");
            }
        }
    }

    
    const settingsList = document.getElementById("settings-list");
    if (settingsList) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach((task, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${task.name}  <button onclick="deleteTask(${index})">Delete</button>`;
            settingsList.appendChild(li);
        });

        const deleteAllButton = document.createElement('button');
        deleteAllButton.textContent = "Delete All Tasks";
        deleteAllButton.classList.add('delete-all');
        deleteAllButton.onclick = deleteAllTasks;
        document.body.appendChild(deleteAllButton);
    }
}


function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload(); 
}


function deleteAllTasks() {
    localStorage.removeItem('tasks');
    window.location.reload(); 
}