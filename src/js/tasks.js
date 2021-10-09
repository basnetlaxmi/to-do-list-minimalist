import '../style.css';

const tasks = [
  {
    index: 1,
    description: 'Play Music',
    completed: false,
  },
  {
    index: 2,
    description: 'Edit Video',
    completed: false,
  },
  {
    index: 3,
    description: 'Play Game',
    completed: false,
  },
];

function task(t) {
  const completeClass = t.completed ? 'strike' : '';
  const completeChecked = t.completed ? 'checked' : '';
  return `<ul class="list">
      <li class="bordered-bottom">
      <div class="details"> 
      <input type="checkbox" class="checkbox" name="option" id="${t.index}" ${completeChecked} >
      <label for="option1" class="${completeClass}">${t.description}</label>
      </div>
      <div class="icon">
      <i class="fas fa-ellipsis-v color"></i>
      </div>
     </li>
     </ul>`;
}
let getTask;
if (localStorage.getItem('taskList') != null) {
  getTask = JSON.parse(window.localStorage.getItem('taskList'));
} else {
  getTask = tasks;
}

const changeState = (e) => {
  const taskId = Number(e.id);
  const task = getTask.find((t) => t.index === taskId);
  task.completed = !task.completed;
  const updatedTasks = getTask.filter((t) => t.index !== taskId);
  updatedTasks.push(task);
  window.localStorage.setItem('taskList', JSON.stringify(updatedTasks));
};

function handleCheck() {
  const checkBoxes = document.querySelectorAll('.checkbox');
  checkBoxes.forEach((checkbox) => checkbox.addEventListener('change', () => {
    changeState(checkbox);
    // eslint-disable-next-line no-use-before-define
    displayTasks();
  }));
}
function displayTasks(taskArray = getTask) {
  const list = document.querySelector('#list-items');
  const sortTasks = taskArray.sort((a, b) => a.index - b.index);
  list.innerHTML = sortTasks.map((t) => task(t)).join('');
  handleCheck();
}
export { tasks, task, displayTasks };