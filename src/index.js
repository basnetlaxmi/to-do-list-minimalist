import './style.css';

const tasks = [
  {
    index: 2,
    description: 'Wash the dishes',
    completed: true,
  },
  {
    index: 3,
    description: 'Complete to-do-list',
    completed: true,
  },
  {
    index: 1,
    description: 'Play Game',
    completed: true,
  },
];

const list = document.querySelector('#list-items');
const sortTasks = tasks.sort((a, b) => a.index - b.index);
function task(t) {
  return `<ul class="list">
    <li class="bordered-bottom">
    <div class="details"> 
    <input type="checkbox" class="" name="option1" id=${t.index}>
    <label for="option1">${t.description}</label>
    </div>
    <div class="icon">
    <i class="fas fa-ellipsis-v color"></i>
    </div>
   </li>
   </ul>`;
}

list.innerHTML = sortTasks.map((t) => task(t)).join('');