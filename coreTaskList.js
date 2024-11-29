// CORE TASK LIST GENERATION FUNCTIONALITY

// Defining static variables that contain the values submitted, that we want to interact with //
var taskID = 0; // Initializing the ID counter 
const completeStatus = document.getElementById("taskComplete")
const addTask = document.getElementById("submitButton");
const submitText = document.getElementById("taskField");   // Title
const descriptionText = document.getElementById("taskDescriptionField"); // Description
const deleteButton = document.getElementById("taskDelete"); 
const deleteAllButton = document.getElementById("deleteAllButton");

const deadlineDatePointer = document.getElementById("deadlineDateField");
const deadlineTimePointer = document.getElementById("deadlineTimeField");
const deadlineDate = deadlineDatePointer.value || "1970-01.01"
const deadlineTime = deadlineDatePointer.value | "00:00:00"
var deadline = (deadlineDate+"T"+deadlineTime+"Z") || null; // Extract the time and date with .value. Adding T for ISO8601 string standard

function checkboxStyling(title, description, completed) {
    storageHandler.saveTask(taskID, {completed: completed.checked});
        if(completed.checked == true) {
            title.style.textDecoration = "line-through";
            title.style.textShadow = "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white";
            title.style.outline = "12px";
            description.style.textDecoration = "line-through";
            description.style.textShadow = "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white";
            description.style.outline = "12px";
        }
        else {
            title.style.textDecoration = "0";
            title.style.textShadow = "0";
            title.style.outline = "0";
            description.style.textDecoration = "0";
            description.style.textShadow = "0";
            description.style.outline = "0";
        }
}

function createTaskElement(taskID, title, description, completed, deadline, priority) {
    console.log("Creating new DOM object");

    // Creating each HTML object to append to the HTML document
    var newTask = document.createElement("li");
    newTask.id = taskID; // Creates a new attribute to the object. So it'll contain the HTML object AND the ID key-value pair
    
    // the || symbol is an OR operator. If there isn't a value, it'll use "New task" to catch any empty entries //
    const titleField = document.createElement("label");
    titleField.id = "taskPoint";
    titleField.textContent = title;

    // Description
    const descriptionField = document.createElement("p");
    descriptionField.textContent = description;

    // Deadline time and date
    const deadlineField = document.createElement("div")
    deadlineField.type = "div"
    deadlineField.id = "deadlineField"
    deadlineField.textContent = new Date(deadline);    
 
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = "taskDelete";
    deleteButton.textContent = "Delete"; 
    
    // Checkbox
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = completed; // To easily extract the boolean for later use
    function checkboxEvent() {checkboxStyling(titleField, descriptionField, newCheckbox)};
    checkboxEvent();

    // Adding an event listener so the state of the checkbox is saved
    newCheckbox.addEventListener("change", checkboxStyling);

    newTask.appendChild(titleField);
    newTask.appendChild(descriptionField);
    newTask.appendChild(newCheckbox);
    newTask.appendChild(deleteButton);
    

    // You have to define the delete function when creating the list item for it to work as intended.
    deleteButton.addEventListener("click", function() {
        newTask.remove();
        storageHandler.deleteTask(taskID);
    })


    return newTask;
}

function handleClick(event) {
    // Test message to show the function runs when you click "add"
    console.log("Running handleClick");
    const taskID = storageHandler.generateUniqueID();
    const title = submitText.value || "Task Title";
    const description = descriptionText.value || "";  // Default to an empty description
    const completed = false;
    const deadlineDT = createTaskElement.deadline;

    const newTask = createTaskElement(taskID, title, description, completed, deadline);
    document.getElementById("taskList").appendChild(newTask);

    // Clear both input fields for additional entries
    submitText.value = "";
    descriptionText.value = "";

    // Save to local storage
    storageHandler.saveTask(taskID, {
        id: taskID,
        title: title,
        description: description,
        completed: completed,
        deadline: deadlineDT
        /* Additional data points from e.g localStorageHandler can pass new key:value pairs into the localStorage JSON */
    })
}



// Event listeners
window.onload = function deleteAllTasks() {
    storageHandler.deleteAll();
    deleteAllButton.addEventListener("click", deleteAllTasks());
} 

addTask.addEventListener("click", handleClick);  // Adding this AFTER the function so it doesn't call something undefined.
submitText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleClick();
        event.preventDefault(); // Prevents the browser from treating this as a web submission form
    }
});


