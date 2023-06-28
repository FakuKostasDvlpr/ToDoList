const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const tasksList = document.querySelector(".tasks-list");
const deleteBtn = document.querySelector(".deleteAll-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveLocalStorage = (tasksList) => {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
};

const createTask = (task) => {
  return `<li>${task.name}<img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-name="${task.name}"></li>`;
};

const renderTasksList = (todoList) => {
    tasksList.innerHTML = todoList.map((task) => createTask(task)).join();
  	
  };

const hideDeleteAll = (tasksList) => {
  //si tasklist.length es 0, agrega el delete button y dale visibilidad hidden
  if (!tasksList.length) {
    deleteBtn.classList.add("hidden");
    return;
  }
  deleteBtn.classList.remove("hidden");
};

const addTask = (e) => {
  e.preventDefault();
  //funcion que agarra el name de la task, .trim borro espacios .replace borro dobles espacios
  const taskName = input.value.trim().replace(/\s\s+/g, " ");
  //validaciones
  if (!taskName.length) {
    alert("che bld tekivocaste");
    return;
  }else if (
    tasks.some((task) => {
      return  task.name.toLowerCase() === taskName.toLowerCase();
    })
  ) {
    alert("ya existe una tarea igual");
    return;
  };

  tasks = [...tasks, { name: taskName }];
  input.value = "";
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
};

const removeTask = (e) => {
  if(!e.target.classList.contains("delete-btn")){
    return;
  }
    const filterName = e.target.dataset.name;
    tasks = tasks.filter((task) => task.name !== filterName);
    renderTasksList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
};

const removeAll = () =>{
  tasks = [];
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAll(tasks);
}

const init = () => {
  hideDeleteAll(tasks);
  renderTasksList(tasks);
  addForm.addEventListener("submit", addTask);
  tasksList.addEventListener("click", removeTask);
  deleteBtn.addEventListener("click", removeAll);
};

init();