DBstate = 0; // 0 = offline, 1 = online, flip to use. Will be connected to an eventlistener later on

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

const sql = require('mssql');

const db = {
    sendTask: async function(taskID, taskData) {
        try {
            console.log("Sending task...")
            let response = await fetch(`http://localhost:5000/saveTask/${taskID}`); // Running await here to prevent a hang from bad networking
            
        }
        catch(e) {

        }
    },

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
