const STORAGE_KEY = 'task_manager_tasks';
let tasks = [];
let timersPaused = false;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');

  function moveTask(from, to) {
    if (to < 0 || to >= tasks.length) return;
    const [moved] = tasks.splice(from, 1);
    tasks.splice(to, 0, moved);
    saveTasks();
    renderTasks();
  }

  function formatTime(ms) {
    if (ms <= 0) return '00:00:00';
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function renderTasks() {
    list.innerHTML = '';
    const now = Date.now();
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      let liClass = 'task-item';
      if (task.completed) liClass += ' completed';
      if (!task.completed && task.timerUp) liClass += ' timer-up';
      li.className = liClass;
      li.setAttribute('role', 'listitem');
      li.setAttribute('tabindex', '0');

      // Timer display and input
      let timerDisplay = '';
      if (!task.completed) {
        const msLeft = (task.due || now) - now;
        timerDisplay = `<span class="task-timer">${formatTime(msLeft)}</span>`;
      }

      li.innerHTML = `
        <span>${task.text}</span>
        ${timerDisplay}
        <input type="number" class="timer-input" min="0" max="168" step="0.01" value="${task.hours}" title="Set timer (hours)" aria-label="Set timer (hours)" style="width:4em; margin-left:0.5em;" />
        <div class="task-actions">
          <button class="action up" aria-label="Move up" title="Move up" tabindex="0">&#8593;</button>
          <button class="action down" aria-label="Move down" title="Move down" tabindex="0">&#8595;</button>
          <button class="action complete" aria-label="Mark as completed" title="Complete" tabindex="0">&#10003;</button>
          <button class="action delete" aria-label="Delete task" title="Delete" tabindex="0">&#128465;</button>
        </div>
      `;
      li.querySelector('.up').onclick = () => moveTask(idx, idx - 1);
      li.querySelector('.down').onclick = () => moveTask(idx, idx + 1);
      li.querySelector('.complete').onclick = () => {
        tasks[idx].completed = !tasks[idx].completed;
        saveTasks();
        renderTasks();
      };
      li.querySelector('.delete').onclick = () => {
        tasks.splice(idx, 1);
        saveTasks();
        renderTasks();
      };
      // Timer input handlers: pause updates on focus/hover, resume on blur/mouseout
      const timerInput = li.querySelector('.timer-input');
      timerInput.onfocus = timerInput.onmouseenter = () => { timersPaused = true; };
      timerInput.onblur = timerInput.onmouseleave = () => { timersPaused = false; updateTimers(); };
      timerInput.onchange = (e) => {
        let hours = parseFloat(timerInput.value);
        if (isNaN(hours) || hours < 0) hours = 0;
        if (hours > 168) hours = 168;
        tasks[idx].hours = hours;
        tasks[idx].due = Date.now() + hours * 3600 * 1000;
        tasks[idx].timerUp = false;
        saveTasks();
        renderTasks();
      };
      list.appendChild(li);
    });
  }

  function updateTimers() {
    if (timersPaused) return;
    const now = Date.now();
    let changed = false;
    tasks.forEach(task => {
      if (!task.completed && task.due && !task.timerUp) {
        if (now >= task.due) {
          task.timerUp = true;
          changed = true;
        }
      }
    });
    renderTasks();
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        tasks = arr.map(t => ({
          text: t.text,
          completed: !!t.completed,
          hours: typeof t.hours === 'number' ? t.hours : 24,
          due: typeof t.due === 'number' ? t.due : Date.now() + 24 * 3600 * 1000,
          timerUp: !!t.timerUp
        }));
      }
    } catch {}
  }

  loadTasks();
  renderTasks();
  // Start timer updates every second
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimers, 1000);
  form.onsubmit = function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      const now = Date.now();
      tasks.push({
        text: value,
        completed: false,
        hours: 24,
        due: now + 24 * 3600 * 1000,
        timerUp: false
      });
      input.value = '';
      saveTasks();
      renderTasks();
    }
  };

  loadTasks();
  renderTasks();
});
