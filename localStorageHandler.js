// LOCAL CLIENT STORAGE HANDLER

const storageHandler = {
    handleClick: function(event) {
        let storeTaskItem = this.newTask; // Accesses the current instance of newTask from coreTaskList.js
        let storeTaskID = this.taskID;
        // Testing line
        localStorage.setItem(storeTaskID, storeTaskItem);

        while (localStorage.getItem(storeTaskID !== null)) { //  "while" is good for looping logics and not conditional logics where you might use "if" 
            storeTaskID++                                                                       // This way of error handling works good, but the order of tasks might end up different than original
                                        // localStorage will return NULL if the key (storeTaskID) is duplicate. 
        }
        
        
    }
}

window.onload = function() {
    // Loading handler will go here 
}