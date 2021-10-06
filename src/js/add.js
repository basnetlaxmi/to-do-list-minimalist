const updateIndex = (array) => array.map((el, i) => {
  const newEl = el;
  newEl.index = i + 1;
  return newEl;
});

export function addItem(taskName) {
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