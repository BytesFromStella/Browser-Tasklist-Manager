
// Add coloring scheme
let currentTimeDate = new Date();
let currentTimeHour = currentTimeDate.getHours();

const deadlineHandler = {
    /* Logic and conditional handling for styling goes here */ 
    
    taskBorderStyle: function(target, border, deadline) {
        target.style.borderImageSource = `${border}`; // Pointer for later styling based on deadlines defined
        target.style.borderImageSlice = "1";
        target.style.borderStyle = "solid"; // Optional
    },

    differenceInSeconds: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*1000; /* Minutes */
        return output;
    },

    differenceInMinutes: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*60*1000; /* Minutes */
        return output;
    },

    differenceInHours: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*60*60*1000; /* Minutes */
        return output;
    },
    differenceInDays: function(deadline, currentTimeDate) {
        let output = deadline - currentTimeDate;
        output = output*24*60*60*1000; /* Minutes */
        return output;
    },

    /* func no time limit (grey gradient) */
    noTimeLimit: function() {
        if(deadline == "1970-01-01T00:00:00Z") {
            let greyBorder = "linear-gradient(30deg, #8f8f8f, #cecece)"
            taskBorderStyle(target, greyBorder);
        }
    },

    /* time limit applied (yellow gradient) */
    timelimitApplied: function(target, border) {
        let deadline = new Date(deadline);
        let deadlineHour = deadline.getHours();
        let defaultDeadline = new Date("1970-01-01T00:00:00Z");
        if(deadline > defaultDeadline) {
            border = "linear-gradient(30deg, #FFD700, #FFF8DC)";
            console.log("Time limit defined. Applying yellow gradient");
        }
        /* less than 1 day */
        if (this.differenceInHours()) {
            
        }
        
        /* less than 1 hour */
    
        /* Completed items (green) [use checkbox condition handling] */
    
        /* Expired item (red) */
    }

    }


