// todo listesi dizisini oluşturun
let todoList = [];

const pelem = document.querySelector('.theP'); 
const dater = document.querySelector('.dater'); 
const deleteCheckedButton = document.querySelector('.delete-checked-button'); 

rendertodo()
function rendertodo() {
 // yerel depolamadan "todoList" anahtarının değerini alın ve bir diziye dönüştürün
 let storedTodos = JSON.parse(localStorage.getItem("todoList"));

 // todoList dizisinin tanımlı olup olmadığını kontrol edin
 if (storedTodos === null) {

  // todoList dizisini boş bir dizi olarak başlatın
  storedTodos = [];
 }

 // storedTodos dizisini todoList değişkenine atayın
 todoList = storedTodos;

 let todohtml = ''; 

 todoList.forEach(function(todoObj,index) { // (todoObj, index) => {...}... olarak da olur
 const {todoname, dueDate, completed} = todoObj; 
 //<div class='todo-item'></div>
 let text = 
 `
 
 <div> <span id='todo-${index}' class='todo-text ${completed ? 'completed' : ''}'>${todoname}</span> </div>
 
 <div> <span id='date-${index}' class='todo-date ${completed ? 'completed' : ''}'>${dueDate}</span> </div>

 <div> <button class='delete-button' onclick='deleteTodo(${index});'>delete</button> </div>
 
 <div> <input type='checkbox' id='check-${index}' ${completed ? 'checked' : ''} onclick='toggleCompleted(${index});'> </div>

 `;
 
 todohtml += text; 
 
 });

 pelem.innerHTML = todohtml; 

 for (let i = 0; i < todoList.length; i++) {

 let todoText = document.getElementById(`todo-${i}`) || null; 

 if (todoText !== null) {

 todoText.addEventListener('dblclick', function() { 
 deleteTodo(i); 

 });

 };

 let date = document.getElementById(`date-${i}`) || null; // use a different id for the date element

 if (date !== null) {

  date.addEventListener('dblclick', function() { // add an event listener to the date element
 deleteTodo(i); 
 
 });
 
 };
 
 let checkbox = document.getElementById(`check-${i}`) || null; // use a different id for the checkbox element
 
 if (checkbox !== null) {
 checkbox.addEventListener('dblclick', function() { // add an event listener to the checkbox element
 deleteTodo(i); 
 
 });
 };
 }

}

const inputtext = document.querySelector('.input-text'); 

function enterKeyPressed(event) { 

 if (event.keyCode == 13) { 
 addTodo(); 
 return true;
 } else {
 return false;
 }
 rendertodo()
}

function addTodo() { 

 let todoname = inputtext.value; 
 let dueDate = dater.value; 
 
 
 todoList.push({todoname,dueDate, completed: false}); 
 inputtext.value = ''; 
 dater.value = ''; 
  
  
 // todo listesini yerel depolamada güncelleyin
 localStorage.setItem("todoList", JSON.stringify(todoList));
 rendertodo()
}


function deleteTodo(index) {

 todoList.splice(index, 1); 
  
 // todo listesini yerel depolamada güncelleyin
 localStorage.setItem("todoList", JSON.stringify(todoList));
 rendertodo()
}


function deleteChecked() {

  if (null) {
    
  } else {
   for (let i = todoList.length - 1; i >= 0; i--) { 
 if (todoList[i].completed) { 
 deleteTodo(i); 
 }
 } 
 }

 // todo listesini yerel depolamada güncelleyin
 localStorage.setItem("todoList", JSON.stringify(todoList));
 rendertodo()
}


function toggleCompleted(index) {

  let checkbox = document.getElementById(`check-${index}`);
  let checked = checkbox.checked;
  todoList[index].completed = checked;
  let text = document.getElementById(`todo-${index}`);
  let date = document.getElementById(`date-${index}`) || null; // use index instead of i
  if (checked) {
    text.classList.add('completed');
    date.classList.add('completed'); // add the completed class to the date element
  } else {
    text.classList.remove('completed');
    date.classList.remove('completed'); // remove the completed class from the date element
  }

 // todo listesini yerel depolamada güncelleyin
 localStorage.setItem("todoList", JSON.stringify(todoList));
 rendertodo()
}

deleteCheckedButton.addEventListener('click', function() {
 deleteChecked(); 
 rendertodo()
});

// define a function to delete all the items
function deleteAll() {
 // use a filter method to create an empty array
 let emptyArray = todoList.filter(item => false);
 // assign the empty array back to the todo list array
 todoList = emptyArray;

 // yerel depolamadan "todoList" anahtarını silin
 localStorage.removeItem("todoList");
 rendertodo(); 
}


// let todoList = [];
// localStorage.setItem("todoList", JSON.stringify(todoList));

// const pelem = document.querySelector('.theP'); 
// const dater = document.querySelector('.dater'); 
// const deleteCheckedButton = document.querySelector('.delete-checked-button'); 

// rendertodo()
// function rendertodo() {
//  let todoList = JSON.parse(localStorage.getItem("todoList"));

//  if (todoList === null) {

//   todoList = [];
// }



 

//  let todohtml = ''; 

//  todoList.forEach(function(todoObj,index) { // (todoObj, index) => {...}... olarak da olur
//  const {todoname, dueDate, completed} = todoObj; 
//  //<div class='todo-item'></div>
//  let text = 
//  `
 
//  <div> <span id='todo-${index}' class='todo-text ${completed ? 'completed' : ''}'>${todoname}</span> </div>
 
//  <div> <span id='date-${index}' class='todo-date ${completed ? 'completed' : ''}'>${dueDate}</span> </div>

//  <div> <button class='delete-button' onclick='deleteTodo(${index});'>delete</button> </div>
 
//  <div> <input type='checkbox' id='check-${index}' ${completed ? 'checked' : ''} onclick='toggleCompleted(${index});'> </div>

//  `;
 
//  todohtml += text; 
 
//  });

//  pelem.innerHTML = todohtml; 

//  for (let i = 0; i < todoList.length; i++) {

//  let todoText = document.getElementById(`todo-${i}`) || null; 

//  if (todoText !== null) {

//  todoText.addEventListener('dblclick', function() { 
//  deleteTodo(i); 

//  });

//  };

//  let date = document.getElementById(`date-${i}`) || null; // use a different id for the date element

//  if (date !== null) {

//   date.addEventListener('dblclick', function() { // add an event listener to the date element
//  deleteTodo(i); 
 
//  });
 
//  };
 
//  let checkbox = document.getElementById(`check-${i}`) || null; // use a different id for the checkbox element
 
//  if (checkbox !== null) {
//  checkbox.addEventListener('dblclick', function() { // add an event listener to the checkbox element
//  deleteTodo(i); 
 
//  });
//  };
//  }

// }

// const inputtext = document.querySelector('.input-text'); 

// function enterKeyPressed(event) { 

//  if (event.keyCode == 13) { 
//  addTodo(); 
//  return true;
//  } else {
//  return false;
//  }

// }

// function addTodo() { 

//  let todoname = inputtext.value; 
//  let dueDate = dater.value; 
 
 
//  todoList.push({todoname,dueDate, completed: false}); 
//  inputtext.value = ''; 
//  dater.value = ''; 
  

//  // todo listesini yerel depolamada güncelleyin
//  localStorage.setItem("todoList", JSON.stringify(todoList));
// rendertodo();/////////////////////////////////////////////////////////
// }


// function deleteTodo(index) {

//  todoList.splice(index, 1); 
  
//  localStorage.setItem("todoList", JSON.stringify(todoList));
// rendertodo();
// }


// function deleteChecked() {

//   if (null) {
    
//   } else {
//    for (let i = todoList.length - 1; i >= 0; i--) { 
//  if (todoList[i].completed) { 
//  deleteTodo(i); 
//  }
//  } 
//  }

//  localStorage.setItem("todoList", JSON.stringify(todoList));
//  rendertodo()
// }


// function toggleCompleted(index) {

//   let checkbox = document.getElementById(`check-${index}`);
//   let checked = checkbox.checked;
//   todoList[index].completed = checked;
//   let text = document.getElementById(`todo-${index}`);
//   let date = document.getElementById(`date-${index}`) || null; // use index instead of i
//   if (checked) {
//     text.classList.add('completed');
//     date.classList.add('completed'); // add the completed class to the date element
//   } else {
//     text.classList.remove('completed');
//     date.classList.remove('completed'); // remove the completed class from the date element
//   }

//  localStorage.setItem("todoList", JSON.stringify(todoList));
//  rendertodo()
// }

// deleteCheckedButton.addEventListener('click', function() {
//  deleteChecked(); 
//  rendertodo()
// });

// // define a function to delete all the items
// function deleteAll() {
//  // use a filter method to create an empty array
//  let emptyArray = todoList.filter(item => false);
//  // assign the empty array back to the todo list array
//  todoList = emptyArray;

//  localStorage.removeItem("todoList");
//  rendertodo(); 
// }


// let todoList = []; 

// const pelem = document.querySelector('.theP'); 
// const dater = document.querySelector('.dater'); 
// const deleteCheckedButton = document.querySelector('.delete-checked-button'); 
// rendertodo(); 

// function rendertodo() {
//  let todohtml = ''; 

//  todoList.forEach(function(todoObj,index) { // (todoObj, index) => {...}... olarak da olur
//  const {todoname, dueDate, completed} = todoObj; 
//  //<div class='todo-item'></div>
//  let text = 
//  `
 
//  <div> <span id='todo-${index}' class='todo-text ${completed ? 'completed' : ''}'>${todoname}</span> </div>
 
//  <div> <span id='date-${index}' class='todo-date ${completed ? 'completed' : ''}'>${dueDate}</span> </div>

//  <div> <button class='delete-button' onclick='deleteTodo(${index});'>delete</button> </div>
 
//  <div> <input type='checkbox' id='check-${index}' ${completed ? 'checked' : ''} onclick='toggleCompleted(${index});'> </div>

//  `;
 
//  todohtml += text; 
 
//  });

//  /*
//  for (let i = 0; i < todoList.length; i++) { 
//  const todoObj = todoList[i]; 
//  const {todoname, dueDate, completed} = todoObj; 
//  //<div class='todo-item'></div>
//  let text = 
//  `
 
//  <div> <span id='todo-${i}' class='todo-text ${completed ? 'completed' : ''}'>${todoname}</span> </div>
 
//  <div> <span id='date-${i}' class='todo-date ${completed ? 'completed' : ''}'>${dueDate}</span> </div>

//  <div> <button class='delete-button' onclick='deleteTodo(${i});'>delete</button> </div>
 
//  <div> <input type='checkbox' id='check-${i}' ${completed ? 'checked' : ''} onclick='toggleCompleted(${i});'> </div>

//  `;
 
//  todohtml += text; 
 
//  }*/

 

//  pelem.innerHTML = todohtml; 

//  for (let i = 0; i < todoList.length; i++) {

//  let todoText = document.getElementById(`todo-${i}`) || null; 

//  if (todoText !== null) {

//  todoText.addEventListener('dblclick', function() { 
//  deleteTodo(i); 

//  });

//  };

//  let date = document.getElementById(`date-${i}`) || null; // use a different id for the date element

//  if (date !== null) {

//   date.addEventListener('dblclick', function() { // add an event listener to the date element
//  deleteTodo(i); 
 
//  });
 
//  };
 
//  let checkbox = document.getElementById(`check-${i}`) || null; // use a different id for the checkbox element
 
//  if (checkbox !== null) {
//  checkbox.addEventListener('dblclick', function() { // add an event listener to the checkbox element
//  deleteTodo(i); 
 
//  });
//  };
//  }

//  //console.log(document.querySelectorAll('.delete-button'));
//  /*
//  document.querySelectorAll('.deletebutton')
//   .forEach((deleteCheckedButton, index) => {  delete button daki onclicki sildirmeli test edilmedi
//     deleteCheckedButton.addEventListener('click', () => {
//       deleteTodo(index);
//     })
//   })
//  */
// }

// const inputtext = document.querySelector('.input-text'); 

// function enterKeyPressed(event) { 

//  if (event.keyCode == 13) { 
//  addTodo(); 
//  return true;
//  } else {
//  return false;
//  }

// }

// /*
// document.querySelector('.js-addtodobutton')  addtodo nun onclickini silebilirsin bununla
//   .addEventListener('click', () => {
//     addTodo();
//   });
// */ 

// function addTodo() { 

//  let todoname = inputtext.value; 
//  let dueDate = dater.value; 
 
 
//  todoList.push({todoname,dueDate, completed: false}); 
//  inputtext.value = ''; 
//  dater.value = ''; 
//  rendertodo(); 

// }


// function deleteTodo(index) {

//  todoList.splice(index, 1); 
//  rendertodo(); 

// }


// function deleteChecked() {

//   if (null) {
    
//   } else {
//    for (let i = todoList.length - 1; i >= 0; i--) { 
//  if (todoList[i].completed) { 
//  deleteTodo(i); 
//  }
//  } 
//  }
 
// }


// function toggleCompleted(index) {

//   // use index instead of i
//   let checkbox = document.getElementById(`check-${index}`);
//   let checked = checkbox.checked;
//   todoList[index].completed = checked;
//   let text = document.getElementById(`todo-${index}`);
//   let date = document.getElementById(`date-${index}`) || null; // use index instead of i
//   if (checked) {
//     text.classList.add('completed');
//     date.classList.add('completed'); // add the completed class to the date element
//   } else {
//     text.classList.remove('completed');
//     date.classList.remove('completed'); // remove the completed class from the date element
//   }

// }

// deleteCheckedButton.addEventListener('click', function() {

//  deleteChecked(); 
 
// });

// // define a function to delete all the items
// function deleteAll() {
//  // use a filter method to create an empty array
//  let emptyArray = todoList.filter(item => false);
//  // assign the empty array back to the todo list array
//  todoList = emptyArray;
//  rendertodo();
// }


