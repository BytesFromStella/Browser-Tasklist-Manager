DBstate = 0; // 0 = active, 1 = inactive, flip to use. Will be connected to an eventlistener later on

const config = {
    // Complete config file with a custom user for this specific purpose.
    user: 'taskManager',
    password: 'unsecuredPassword312',
    server: 'localhost:1433',
    database: 'tasklistDB',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

const db = {
    sendTask: async function(taskID, taskData) { // Running async here to prevent a hang from bad networking
        if (DBstate == 0) {return;}
        try {
            console.log("Sending task...")
            let response = await fetch(`http://localhost:5000/saveTask`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "DeleteAll":"false",
                    
                },
                body: JSON.stringify({
                    taskID: taskID,
                    title: taskData.title,
                    description: taskData.description,
                    completed: taskData.completed,
                    deadline: taskData.deadline,
                    priority: taskData.priority,
                    completionDate: taskData.completionDate
                })
            
            });
            
        }
        catch(e) {
            console.log("Failed to send task data to server/backend")
        }
    },

    retrieveTask: async function(taskID) {
        if (DBstate == 0) {return;}
        try {
            console.log("Retrieving task...")
            let response = await fetch(`http://localhost:5000/retrieveTask`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "DeleteAll":"false",
                    
                },
                body: JSON.stringify({
                    taskID: taskID, // Object keys are treated like strings by default
        

                })
            }); // Running async here to prevent a hang from bad networking
            
        }
        catch(e) {
            console.log("Failed to retrieve task data from server/backend")
        }
    },


    editTask: async function(taskID, taskData) {
        if (DBstate == 0) {return;}
        try {
            console.log("Editing task...")
            let response = await fetch(`http://localhost:5000/editTask`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    "DeleteAll":"false",
                    
                },
                body: JSON.stringify({
                    taskID: taskData.taskID,
                    title: taskData.title,
                    description: taskData.description,
                    completed: taskData.completed,
                    deadline: taskData.deadline,
                    priority: taskData.priority,
                    completionDate: taskData.completionDate
                })
            }); 
        }
        catch(e) {
            console.log("Failed to update task data on server/backend")
        }
    },

    deleteTask: async function(taskID) {
        if (DBstate == 0) {return;}
        try {
            console.log("Editing task...")
            let response = await fetch(`http://localhost:5000/deleteTask`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "DeleteAll":"false",
                    
                },
                body: JSON.stringify({
                    taskID: taskID
                })
            }); 
        }
        catch(e) {
            console.log("Failed to delete task data on server/backend")
        }
    },


    deleteAll: async function() {
        if (DBstate == 0) {return;}
        try {
            console.log("Editing task...")
            let response = await fetch(`http://localhost:5000/deleteTask`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    "DeleteAll":"false",
                    
                },
                body: JSON.stringify({
                    taskID: taskID
                })
            }); 
        }
        catch(e) {
            console.log("Failed to delete task data on server/backend")
        }
    }
        // This function will be used to send the task data to the server

        // The server will then store the data in a database
        // The server will send a response back to the client
        // The client will then display the task on the page
        // The server will also send the task ID back to the client
        // The client will then use the task ID to save the task to localStorage
        // }
        // catch(noConnection) {
        //     console.error("No SQL connection available. Flipping state. Task will be saved to localStorage instead");
        //     this.saveTask(taskID, taskData);
        //     DBstate = 0;
        // }
};
