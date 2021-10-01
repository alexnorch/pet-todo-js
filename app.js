// getting all required elements

const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button')

inputBox.addEventListener('keyup', function(){
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addBtn.classList.add('active')
    } else {
        addBtn.classList.remove('active')
    }
})

showTasks()

// if user click on the add button

addBtn.addEventListener('click', function(){
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localsStorage
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    listArr.push(userData); // pushing or adding user data
    localStorage.setItem('New Todo', JSON.stringify(listArr)); // transofrming js object a json string
    showTasks(); // calling showTasks function
    addBtn.classList.remove('active');
})

// function to add task list inside ul

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localsStorage
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length
    let newLiTag = '';
    if(listArr.length > 0) {
        deleteAllBtn.classList.add('active')
    } else {
        deleteAllBtn.classList.remove('active')
    }
    listArr.forEach((element,index) => {
        newLiTag  += `<li> ${element} <span onclick="deleteTask();"><i class="fas fa-trash"></i></span></li>`;
    })
    todoList.innerHTML = newLiTag // adding new li tag inside ul tag
    inputBox.value = '';
}

// function to delete taks list

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // delete or remove
    // after remove the li again uptrade the local storage
    localStorage.setItem('New Todo', JSON.stringify(listArr)); // transofrming js object a json string
    showTasks();
}

// delete all tasks

deleteAllBtn.addEventListener('click', function(){
    listArr = [];
    // after delete all task again uptade the local storage
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    showTasks();
})