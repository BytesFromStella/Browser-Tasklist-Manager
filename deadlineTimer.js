
// Add coloring scheme
let currentTimeDate = new Date();
let currentTimeHour = currentTimeDate.getHours();

const deadlineHandler = {
    /* Logic and conditional handling for styling goes here */ 
    
    taskBorderStyle: function(target, border, deadline) {
        target.style.borderImageSource = `${border}`; // Pointer for styling later based on deadlines defined
        target.style.borderImageSlice = "1";
        target.style.borderStyle = "solid"; // Optional
    },

    differenceInSeconds: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*1000; /* From milliseconds */
        return output;
    },

    differenceInMinutes: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*60*1000; /* From milliseconds */
        return output;
    },

    differenceInHours: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*60*60*1000; /* From milliseconds */
        return output;
    },
    differenceInDays: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*24*60*60*1000; /* From milliseconds */
        return output;
    },
    
    /* time limit applied (yellow gradient) */
    timelimitApplied: function(target, targetBorder, deadline) {
        let deadlineDate = new Date(deadline); // This function name is already defined in coreTaskList.js, but won't overwrite due to scoping
                                                                                  // It will point to the deadline date object in coreTaskList.js
        let defaultDeadline = new Date("1970-01-01T00:00:00Z"); // Industry standard default date

        /* Gold to Light Goldenrod Yellow */
        if(deadlineDate > defaultDeadline) {
            targetBorder = taskBorderStyle("linear-gradient(30deg, #FFD700, #FFF8DC)");
            console.log("Time limit defined. Applying yellow gradient");
        }
        /* less than 1 day */
        if (this.differenceInHours(deadlineDate, currentTimeHour) < 24) {
            targetBorder = "linear-gradient(30deg, #FFD700, #FFF8DC)"; /* Sky Blue to Steel Blue */
            console.log("Less than 1 day left. Applying skyblue-steelblue");
        }
        
        /* less than 1 hour */
        if (this.differenceInHours(deadlineDate, currentTimeHour) < 1) {
            targetBorder = "linear-gradient(30deg, #FFA500, #FF6347)"; /* Orange to Tomato */
            console.log("Less than 1 hour left. Applying orange-tomato");
        }
    
        /* Completed items (green) [use checkbox condition handling] */
        if(newCheckbox.checked == true) {
            targetBorder = "linear-gradient(30deg, #32CD32, #7FFF00)"; /* Lime Green to Chartreuse */
            console.log("Task complete. Applying limegreen-chartreuse");
        }
    
        /* Expired item (red) */
        if(deadlineDate > currentTimeDate) {
            targetBorder = "linear-gradient(30deg, #FF4500, #B22222)" /* Orange Red to Firebrick */
            console.log("Task expired. Applying red-firebrick ");
        }
    }

    }


