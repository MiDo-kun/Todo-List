// PROGRAM STRUCTURE  
// 1. Allow User to Add, Delete, Edit and Update current tasks
// 2. Send data to localstorage
// 3. retrieve the data and show in the document

const inputField = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const edit = document.querySelector('.edit');
const add = document.querySelector('.add');
var currentIndex = 0;

showTasks();

// Check if the user input something
inputField.addEventListener('focus', function () {
   inputField.addEventListener('keyup', function () {
      inputField.value === "" ? addBtn.classList.remove("active") : addBtn.classList.add("active");
   });
});

// Add task
function addTask() {
   let userTask = inputField.value;
   let date = addDate();
   let todoList = localStorage.getItem('Todo List');
   let todoDate = localStorage.getItem('Todo Date');

   if (todoList == null) {
      listArray = [];
      todoDate = [];
   } else {
      listArray = JSON.parse(todoList);
      todoDate = JSON.parse(todoDate);
   }

   listArray.push(userTask);
   todoDate.push(date);
   localStorage.setItem('Todo List', JSON.stringify(listArray));
   localStorage.setItem('Todo Date', JSON.stringify(todoDate));

   inputField.value = "";
   addBtn.classList.remove("active");
   showTasks();
}

// Edit task
function editTask(task) {
   add.style.display = "none";
   edit.style.display = "block";
   edit.classList.add('active');

   currentIndex = task;
   let listArray = JSON.parse(localStorage.getItem('Todo List'));
   listArray.reverse()
   inputField.value = listArray[task];
}

// Confirm task when editing is done
function confirmEditedTask() {
   let listArray = JSON.parse(localStorage.getItem('Todo List'));
   let todoDate = JSON.parse(localStorage.getItem('Todo Date'));
   let date = addDate();

   // Reverse the list first - DESC (document list == storageList) 
   listArray.reverse().splice(currentIndex, 1, inputField.value);
   todoDate.reverse().splice(currentIndex, 1, date);

   // Reverse the list again - ASC
   localStorage.setItem('Todo List', JSON.stringify(listArray.reverse()));
   localStorage.setItem('Todo Date', JSON.stringify(todoDate.reverse()));

   addBtn.classList.remove("active");
   add.style.display = "block";
   edit.style.display = "none";
   inputField.value = "";
   showTasks();
}

function deleteTask(task) {
   listArray = JSON.parse(localStorage.getItem('Todo List'));
   todoDate = JSON.parse(localStorage.getItem('Todo Date'));

   listArray.reverse().splice(task, 1);
   todoDate.reverse().splice(task, 1);

   localStorage.setItem('Todo List', JSON.stringify(listArray.reverse()));
   localStorage.setItem('Todo Date', JSON.stringify(todoDate.reverse()));

   showTasks();
}

// Show task per function
function showTasks() {
   const containerList = document.querySelector('.todoList');
   let container = "";

   let todoList = localStorage.getItem('Todo List');
   let todoDate = localStorage.getItem('Todo Date');

   if (todoList == null) {
      listArray = [];
      todoDate = [];
   } else {
      listArray = JSON.parse(localStorage.getItem('Todo List'));
      todoDate = JSON.parse(localStorage.getItem('Todo Date'));
      todoDate.reverse();
   }

   listArray.reverse().forEach(function (tasks, index) {
      container += ` <li class="tasks">
                        <span class=" date_created">Date: ${todoDate[index]}</span>
                        <span class="content">${tasks}</span>
                        <div class="option">
                           <span class="icon">
                              <i class="fas fa-pen" onclick="editTask(${index})"></i>
                              <i class="fas fa-times" onclick="deleteTask(${index})"></i>
                           </span>
                        </div>
                     </li> `;
   });
   containerList.innerHTML = container;

   // Show Options
   const tasks = document.querySelectorAll('.tasks');
   tasks.forEach(function (task) {
      task.addEventListener('click', function (specificList) {
         specificList.currentTarget.childNodes[5].classList.toggle('toggleOption')
      });
   });
}

// Adding date per todolist
function addDate() {
   let getMonthEntered = new Date().getMonth() + 1;
   let getDateEntered = new Date().getDate();
   let getYearEntered = new Date().getFullYear();

   checkDate(getMonthEntered);
   checkDate(getDateEntered);

   function checkDate(date) {
      if (date <= 9) {
         return (`0${date}`);
      }
      return date;
   }
   return (checkDate(getMonthEntered) + "/" + checkDate(getDateEntered) + "/" + getYearEntered);
}
