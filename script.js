var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed");
var emptyButton = document.getElementById("empty-list");
var saveButton = document.getElementById("save-list");

addButton.addEventListener("click",addTodoItem);
clearButton.addEventListener("click",clearItem);
emptyButton.addEventListener("click",emptyItem);
saveButton.addEventListener("click",saveItem);

var todoinput = document.getElementById("todo-input");
var todolist = document.getElementById("todo-list");

function toggleTodoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else{
        this.classList.add("completed");
    }
}

function newTodoItem(textIn,completed){
    var todoItem = document.createElement("li");
    var todoText = document.createTextNode(textIn);
    todoItem.appendChild(todoText);

    if(completed) {
        todoItem.classList.add("completed");
    }

    todolist.appendChild(todoItem);
    todoItem.addEventListener("dblclick", toggleTodoItemState);
}

function addTodoItem(){
    var itemText = todoinput.value;
    newTodoItem(itemText,false);
    todoinput.value="";
}

function clearItem(){
    var completedItems = todolist.getElementsByClassName("completed")
    while (completedItems.length > 0){
        completedItems.item(0).remove();
    }
}

function emptyItem(){
    var todoitems = todolist.children;
    while (todoitems.length > 0){
        todoitems.item(0).remove();
    }
}

function saveItem(){
    var todos = [];
    for (var i = 0; i < todolist.children.length; i++){
        var todo = todolist.children.item(i);

        var todoInfo = {
            "task": todo.innerText,
            "completed": todo.classList.contains("completed")
        };
        todos.push(todoInfo);
    }
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadList(){
    if(localStorage.getItem("todos") != null){
        var todos = JSON.parse(localStorage.getItem("todos"));
        for(var i = 0; i < todos.length;i++){
            var todo = todos[i];
            newTodoItem(todo.task,todo.completed);
        }
    }
}

document.getElementById('todo-input').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        if (todoinput!=""){
            addTodoItem();
        }
    }
    if(event.ctrlKey && event.keyCode === 's'){
        alert("saving")
    }
});

loadList() 