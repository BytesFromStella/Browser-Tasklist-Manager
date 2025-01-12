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
let deadlineInput = [deadlineDatePointer, deadlineTimePointer];
let currentTimeDate = new Date();

let completedState = 0; // 0 is false, 1 is true. This is used for the intervals on the deadline timer.
    
//// TODO: Export and refactor to deadlineTimer.js
function parseDeadline(deadlineInput) {
    console.log("Starting parse");
    console.log(deadlineInput);
    console.log(deadlineInput);
    const deadlineDate = deadlineDatePointer.value || deadlineInput[0]?.value || false;
    const deadlineTime = deadlineTimePointer.value || deadlineInput[1]?.value || false; // Adding a ? creates a null-safe access to the variable
    
    try {console.log("Date and time pointer values: "+deadlineDatePointer.value+deadlineTimePointer.value)} catch {console.log("Date and time pointer values: "+deadlineDatePointer+deadlineTimePointer)};

    // CHECKING for existing pre-parsed date object.
    if (deadlineInput instanceof Date) {console.warn("Date object detected. Stopping parsing");return deadlineInput}
    console.log("If-statement passed, pre-existing date object not detected");
    console.log(deadlineDate.value, deadlineTime.value);
    // This line uses a TERNARY conditional operator. It will assign the right side operation if anything on the left side is falsey .
    let output = 
    // Extract the time and date with .value. Adding T for ISO8601 string standard. You can add Z at the end for UTC timezone.
    (deadlineInput instanceof Date && !isNaN(deadlineInput.getTime())) ? deadlineInput :  // Adds pre-existing parsed data as-is and checks the type and value, instead of parsing it again. Only applies when loading tasks
    (deadlineDate && deadlineTime) ? new Date(deadlineDate+"T"+deadlineTime) :
    (deadlineDate && !deadlineTime) ? new Date(deadlineDate+"T"+"23:59:59") :
    // If the date isn't provided, we need to zero-pad the date numbers. We only get a single digit returned for month and date (1:12:2024 as an example). Got chatGPT to write the syntax, but in theory it's a bunch of conditional operators using .length to check the digits.
    (!deadlineDate && deadlineTime) ? new Date(`${currentTimeDate.getFullYear()}-${String(currentTimeDate.getMonth() + 1).padStart(2, '0')}-${String(currentTimeDate.getDate()).padStart(2, '0')}T${deadlineTime}`) :
    "1970-01-01T00:00:00.000Z"; // Default fallback value
    console.log(output);
    return output;
}


function createTaskElement(taskID, title, description, completed, deadline, completedState, priority) {
    console.log("Creating new DOM object");
    
    // Creating each HTML object to append to the HTML document
    var newTask = document.createElement("li");
    newTask.id = taskID; // Creates a new attribute to the object. So it'll contain the HTML object AND the ID key-value pair
    newTask.className = "item"
    
    // the || symbol is an OR operator. If there isn't a value, it'll use "New task" to catch any empty entries 
    const titleField = document.createElement("label");
    titleField.className = "taskPoint";
    titleField.textContent = title;
    newTask.appendChild(titleField);

    // Priority
    const priorityField = document.createElement("div");
    const priorityBox = document.createElement("div");
    priorityBox.className = "priorityBox";
    priorityField.textContent = priority;
    priorityField.className = "priority";

    priorityField.appendChild(priorityBox); 
    priorityBox.style.backgroundColor = priority;

    newTask.appendChild(priorityField);
    
    // Description
    const descriptionField = document.createElement("p");
    descriptionField.textContent = description;
    descriptionField.className = "description"
    newTask.appendChild(descriptionField);
    
    // Deadline date and countdown field  
    let deadlineParsed = parseDeadline(deadline);
    console.log(deadlineParsed);
    const deadlineField = document.createElement("div")
    deadlineField.className = "deadline"<
    newTask.appendChild(deadlineField);

    let deadlineDateandTime = document.createElement("p");
    deadlineDateandTime.id = "deadlineDateandTime";
    deadlineDateandTime.className = "deadlineDateandTime";
    if (deadlineParsed != "1970-01-01T00:00:00.000Z") {
        deadlineDateandTime.innerHTML = 
            "Deadline: "+"<br>"+
            String(deadlineParsed.getMonth()+1).padStart(2, "0")+"."+
            String(deadlineParsed.getDate()).padStart(2, "0")+"."+
            String(deadlineParsed.getFullYear()) + " | "+
            String(deadlineParsed.getHours()).padStart(2, "0")+":"+
            String(deadlineParsed.getMinutes()).padStart(2, "0")+"<br>"
    }
    newTask.appendChild(deadlineDateandTime);

    // Checkbox
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = completed; // To easily extract the boolean for later use
    newCheckbox.id = "taskComplete";
    newCheckbox.className = "taskComplete";
    newTask.appendChild(newCheckbox);
    
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "taskDelete";
    deleteButton.textContent = "Delete"; 
    newTask.appendChild(deleteButton);
    // You have to define the delete function when creating the list item for it to work as intended.
    deleteButton.addEventListener("click", function() {
        newTask.remove();
        storageHandler.deleteTask(taskID);
        clearInterval(newTask.countdown);
    })

    function startCountdown(deadlineParsed, deadlineField) {
        newTask.countdown = setInterval(() => {
            now = new Date();
            let secLeft = deadlineHandler.differenceInSeconds(deadlineParsed, now);
            // If the deadline isn't expired, it'll show the time left.
            if (secLeft >= 0) {
                deadlineField.innerHTML =
                String(Math.trunc(deadlineHandler.differenceInDays(deadlineParsed, now)))+"d:"+
                String(Math.trunc(deadlineHandler.differenceInHours(deadlineParsed, now) % 24)).padStart(2, "0")+"h:"+
                String(Math.floor(deadlineHandler.differenceInMinutes(deadlineParsed, now) % 60)).padStart(2, "0")+"m:"+ //TODO: Rewrite this into a dynamic timer.
                String(Math.floor(deadlineHandler.differenceInSeconds(deadlineParsed, now) % 60)).padStart(2, "0")+"s left";
            }
            // If the deadline is expired, it'll show the time it's been expired for.
            else if (secLeft < 0){
                deadlineField.innerHTML = 
                "Expired by:<br>"+
                String(Math.trunc(Math.abs(deadlineHandler.differenceInDays(deadlineParsed, now))))+"d:"+
                String(Math.trunc(Math.abs(deadlineHandler.differenceInHours(deadlineParsed, now) % 24))).padStart(2, "0")+"h:"+
                String(Math.floor(Math.abs(deadlineHandler.differenceInMinutes(deadlineParsed, now) % 60))).padStart(2, "0")+"m:"+ //TODO: Rewrite this into a dynamic timer.
                String(Math.floor(Math.abs(deadlineHandler.differenceInSeconds(deadlineParsed, now) % 60))).padStart(2, "0")+"s";
            }
            else{
                throw new Error("Failed to initialize countdown interval");
                
            }
            // Updating task item borders
            deadlineHandler.timelimitApplied(newTask, deadlineParsed, completed);
        }, 1000); 
    }
    
    function stopCountdown() {
        console.log("Task completed. Interval not applied!");
        clearInterval(newTask.countdown);
        return;    
    }

    function checkboxStylingComplete(taskID, HTMLElement, completed) {
        storageHandler.saveTask(taskID, {completed: completed.checked});
        HTMLElement.style.textDecoration = "line-through";
        newTask.querySelector(".taskDelete").style.textDecoration = "none"; // This is a bug that causes the delete button to be crossed out as well
        HTMLElement.style.textShadow = "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white";
        HTMLElement.style.outline = "12px"
    }
    function checkboxStylingUncomplete(taskID, HTMLElement, completed) {
        storageHandler.saveTask(taskID, {completed: completed.checked});
        HTMLElement.style.textDecoration = "0";
        HTMLElement.style.textShadow = "0";
        HTMLElement.style.outline = "0";
    }
    
    function completedStateCheck(completedState, completed, taskID, deadlineParsed) {
        switch (completedState) {
            case 0: // Not completed, before deadline
                checkboxStylingUncomplete(taskID, newTask, completed);
                deadlineHandler.timelimitApplied(newTask, deadlineParsed, completed); // This will instantly refresh the border style to the uncompleted style
                startCountdown(deadlineParsed, deadlineField);
                storageHandler.saveTask(taskID, {completionDate: false});
                console.log("Task not completed. Applying intervals");
                break;
            case 1: // Not completed, after deadline
                checkboxStylingUncomplete(taskID, newTask, completed);
                deadlineHandler.timelimitApplied(newTask, deadlineParsed, completed); // This will instantly refresh the border style to the completed style          
                storageHandler.saveTask(taskID, {completionDate: false});
                startCountdown(deadlineParsed, deadlineField);
                console.log("Task completed. Interval not applied!");
                break;
            case 2: // Completed before deadline
                checkboxStylingComplete(taskID, newTask, completed, completedState);
                storageHandler.saveTask(taskID, {completed: completed.checked, completionDate: new Date()});
                stopCountdown(newTask); 
                break;
            case 3: // Completed after deadline
                checkboxStylingComplete(taskID, newTask, completed, completedState);
                storageHandler.saveTask(taskID, {completed: completed.checked, completionDate: new Date()});
                stopCountdown(newTask); 
                break;
            case 4: // No deadline set
                checkboxStylingUncomplete(taskID, newTask, completed, completedState);
                break;
            case 5:
                checkboxStylingComplete(taskID, newTask, completed, completedState);
                storageHandler.saveTask(taskID, {completed: completed.checked, completionDate: new Date()});
                break;
            case 99: // Fallback value 
                console.log("Invalid, false or default date object. Interval not applied!");
                break;
            default: 
                console.log("Something unexpected happened. CompletedState variable invalid. Interval not applied!");
                break;
        }
    }

    function checkboxEvent() {
        // Advanced condition check based on completion timing 
        currentTimeDate = new Date(); // Refresh the current time for the interval
        if (!deadlineParsed || deadlineParsed === "1970-01-01T00:00:00.000Z") { 
            completedState = 4;} // No deadline set
        else if (newCheckbox.checked == false 
            && deadlineParsed > currentTimeDate) 
            {completedState = 0;} // Not completed, before deadline
        else if (newCheckbox.checked == false 
            && deadlineParsed < currentTimeDate) 
            {completedState = 1;} // Not completed, after deadline
        else if (newCheckbox.checked == true 
            && deadlineParsed > currentTimeDate) 
            {completedState = 2;} // Completed, before deadline
        else if (newCheckbox.checked == true 
            && deadlineParsed < currentTimeDate) 
            {completedState = 3;} // Completed, after deadline
        else {completedState = 99;} // Default value for error handling
        
        console.log("Checkbox event triggered. Completion state: " + completedState); 
        completedStateCheck(completedState, newCheckbox, taskID, deadlineParsed);}; // Copilot is a great tool for writing code, but it's not perfect. It's important to understand the code you're writing. (That was written by copilot). Btw, this is also a ternary operator. If the checkbox is checked, it'll return 1, otherwise 0.
        
        // This will work because the HTML objects will return FALSE if nothing is inputted. When loading the application, the form is empty by default anyways, so this will work.
        newCheckbox.addEventListener("change", checkboxEvent);
        checkboxEvent();

    return newTask; 
}

function handleClick(event) {
    // Test message to show the function runs when you click "add"
    console.log("Running handleClick");
    const taskID = storageHandler.generateUniqueID();
    const title = submitText.value || "Task Title";
    const priority = document.getElementById("priorityField").value || "medium";
    const description = descriptionText.value || "";  // Default to an empty description
    const completed = false;
    const deadlineOutput = parseDeadline(deadlineInput) || false;


    const newTask = createTaskElement(taskID, title, description, completed, deadlineOutput, completedState, priority);
    document.getElementById("taskList").appendChild(newTask);

    // Clear both input fields for additional entries
    submitText.value = "";
    descriptionText.value = "";
    priorityField.value = "medium";
    deadlineDatePointer.value = "";
    deadlineTimePointer.value = "";

    // Save to local storage
    storageHandler.saveTask(taskID, {
        id: taskID,
        title: title,
        description: description,
        completed: completed,
        deadline: deadlineOutput,
        priority: priority
        /* Additional data points from e.g localStorageHandler can pass new key:value pairs into the localStorage JSON */
    })
}



// Event listeners
window.onload = function deleteAllTasks() {
    storageHandler.deleteAll();
    deleteAllButton.addEventListener("click", deleteAllTasks());
} 

addTask.addEventListener("click", handleClick);  // Adding this AFTER the function so it doesn't call something undefined.
descriptionText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleClick();
        event.preventDefault(); // Prevents the browser from treating this as a web submission form
    }
});

// Quick little feature added because it's hard to look at during the night. It has persistent storage as well.
document.addEventListener("DOMContentLoaded", function() {
    const darkmodeToggle = document.getElementById("darkmodeToggle");

    // Check if dark mode is already enabled in local storage
    if (localStorage.getItem("darkmode") === "enabled") {
        document.body.classList.add("darkmode");
        darkmodeToggle.checked = true;
    }

    darkmodeToggle.addEventListener("change", function() {
        if (darkmodeToggle.checked) {
            document.body.classList.add("darkmode");
            localStorage.setItem("darkmode", "enabled");
        } else {
            document.body.classList.remove("darkmode");
            localStorage.setItem("darkmode", "disabled");
        }
    });
});