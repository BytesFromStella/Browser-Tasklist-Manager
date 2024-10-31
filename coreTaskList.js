// CORE TASK LIST GENERATION FUNCTIONALITY

// Defining static variables that contain the values submitted, that we want to interact with //
var taskID = 0; // Initializing the ID counter 
const addTask = document.getElementById("submitButton");
const submitText = document.getElementById("taskField");
const deleteButton = document.getElementById("taskDelete");

function handleClick(event) {
    // Test message to show the function runs when you click "add"
    console.log("This actually works, good job");

    // Defining each element need for creating a new list item
    taskID++; console.log(taskID);
    var newTask = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const deleteTask = document.createElement("button");
    const taskLabel = document.createElement("label");

    // We reference the constant(/variable) and define the type it's supposed to be
    newCheckbox.type = "checkbox";
    newCheckbox.id = "taskComplete";

    // Defining the delete button
    deleteTask.type = "button";
    deleteTask.id = "taskDelete";
    deleteTask.textContent = "Delete";

     // the || symbol is an OR operator. If there isn't a value, it'll use "New task" to catch any empty entries //
    taskLabel.id = "taskPoint";
    taskLabel.textContent = submitText.value || "New task";

    newTask.appendChild(newCheckbox);
    newTask.appendChild(taskLabel);
    newTask.appendChild(deleteTask);
    
    document.getElementById("taskList").appendChild(newTask);
    
    
    // Clear the value for potential later use
    submitText.value = "";
    console.log(newTask, newCheckbox, deleteTask);
    
    // You have to keep the delete function inside the handleClick function to attach it to EACH list element individually
    function deleteFunc(event){
        event.target.parentNode.remove();
    }
    
    
    deleteTask.addEventListener("click", deleteFunc);
    
}

// Ensures the function is global (can be accessed anywhere). You do not specify the parameter for the function when making it global
window.handleClick = handleClick;

addTask.addEventListener("click", handleClick);  // Adding this AFTER the function so it doesn't call something undefined.
submitText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleClick();
       event.preventDefault; // Prevents the browser from treating this as a web submission form
    }
});