document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskList = document.querySelector('.task-list');

  function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.done ? 'done' : '';
      li.innerHTML = `
        <div>
          <strong>${task.title}</strong><br>
          <small>${task.description}</small>
        </div>
        <div>
          <button onclick="markDone(${index})">✔</button>
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskForm.title.value.trim();
    const description = taskForm.description.value.trim();
    if (!title) return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, description, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
    loadTasks();
  });

  window.markDone = function(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  };

  window.deleteTask = function(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  };

  loadTasks();
});
