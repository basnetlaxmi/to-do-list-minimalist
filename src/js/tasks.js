import '../style.css';

const tasks = [];

function task(t) {
  const completeClass = t.completed ? 'strike' : '';
  const completeChecked = t.completed ? 'checked' : '';
  return `<ul class="list">
      <li class="bordered-bottom">
        <div class="details"> 
            <input type="checkbox" class="checkbox" name="option" id="${t.index}" ${completeChecked}/>
            <input type="text" class=" taskName ${completeClass}"  data-index="${t.index}" value="${t.description}"/>
        </div>
        <div class="icons">
          <div class="dots" data-index="${t.index}">
            <i class="fas fa-ellipsis-v color"></i>
          </div>
          <div class="delete" data-index="${t.index}">
            <i class="far fa-trash-alt color"></i>
          </div>
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
  // eslint-disable-next-line no-use-before-define
  editTask();
  // show();
}
const updateIndex = (array) => array.map((el, i) => {
  const newEl = el;
  newEl.index = i + 1;
  return newEl;
});

function addItem(taskName) {
  let allTasks = getTask || tasks;
  const newTask = { index: 0, description: taskName, completed: false };
  allTasks.push(newTask);
  allTasks = updateIndex(allTasks);
  localStorage.setItem('taskList', JSON.stringify(allTasks));
}

const title = document.querySelector('.item');
const enter = document.getElementById('enter');

function handleAddTaskOnForm(e) {
  e.preventDefault();
  const taskName = title.value;
  if (taskName.length > 0) {
    addItem(taskName);
    title.value = '';
    displayTasks();
  }
}

title.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleAddTaskOnForm(e);
  }
});

enter.addEventListener('click', handleAddTaskOnForm);

function updateTaskName(taskInd, newName) {
  let allTasks = getTask || [];
  const thisTask = allTasks.find((t) => t.index === taskInd);
  thisTask.description = newName;
  allTasks = allTasks.filter((t) => t.index !== taskInd);
  allTasks.push(thisTask);
  localStorage.setItem('taskList', JSON.stringify(allTasks.sort((a, b) => a.index - b.index)));
}

function editTask() {
  const allTaskNames = document.querySelectorAll('.taskName');
  allTaskNames.forEach((tn) => {
    const taskInd = Number(tn.getAttribute('data-index'));
    tn.addEventListener('keydown', (e) => {
      const { key } = e;
      if (key === 'Enter' || key === 'Escape') {
        const newName = tn.value;
        updateTaskName(taskInd, newName);
        displayTasks();
      }
    });
  });
}

export { tasks, task, displayTasks };