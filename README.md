# Task List Program

This project's main purpose is to at minimum produce a barebones task list program in the browser. This project should do me good in the future and to refresh all my skill within web development that has been dormant for tooooo long. 
Also other people can read what I write. Isn't that cool?
I will be using ChatGPT models to figure out concepts and arguments to use in my code, but none of the code is directly copy-pasted. Everything is manually written by me and if there's something new that I didn't understand from before I will either document it here or comment it directly in the code!
Why use a chatGPT model for this? Researching all the individual parts manually constantly when encountering hiccups or obstacles is extremely time consuming. It'll also make consulting about decisions and the next steps required very fluent, as well as giving me checklists for the new features and what it needs. This way I know what syntax to use where and how to structure it.

## Core Features

- Fancy background with a gradient animation across the webpage
- Submission field with a functional "add" button. ENTER key in the input field also works.
- Generation of new task list objects using JavaScript.
- Styling completed tasks and hovering effects on buttons like DELETE and ADD.
- My cool and awesome new name and signature at the bottom of the page
- Local saving and loading of task elements

### HTML code
Barebones website code with all the essentials:
- Webpage title
- Title text on the top of the displayed website
- Local submission form and ADD button
- An unordered list for new entries to appear in
- Styled buttons and crossed out text for checked items
- My signature and unicode for the copyright icon:
```html
&#169; Stella Tvenning
```
It also contains a hidden error message if the user doesn't allow cookies or have localStorage disabled.

## CSS / Styling sheet
For the whole document, I'm justifying all the content to the center for easy scaling and readability. Who wants to use a website where everything justified to the left?
Better styling work and documentation will be added at a later point 

### Scoping (CSS)
The formatting and scoping logic used in the styling sheet is pretty standard.
Pointer declaration, followed by same-line opening curly-bracket. Afterwards, a line shift with all the values using an indent.

### Object structuring
Every list item is currently display in a gridbox. This might change later to be centred on 75% of the canvas, and the other 25% being a menu of sorts.
The objects currently are allowed to have different heights, but this will change in the future. They are still aligned correctly.

### Colorshift Animation
The colorshift animation is quite straightforward in how it works.
```css
animation: colorShift 8s ease infinite alternate;
```
- Animation: Specifies that this object will use an animation.
- 8s: The duration of the animation. It can be tweaked to be faster or slower.
- ease: A built-in timing function used in CSS that controls the curvature of the speed (slow start, speeds up in the middle, slows down near the end).
- infinite: Specifies that the animation will run infinitely.
- alternate: The animation will play from 0% to 100%, then back from 100% to 0%.

### List items
For some reason, gradients are not supported for borders. So I must come up with an alternative solution:
- Use **border-image-source** to define the gradient
- Use **border-image-slice: 1;** to fill the border with the gradient
- Use **border-style: solid;** to make it into a solid color. I might make this transparent instead (tehe, get it?)

### Body 
- I'm using Comic Sans MS font for easy readability for dyslexic people, and because it looks funny. Why not, right?
- Text-align is centred
- The background consists of 5 different colors which combined creates a hue that scrolls across the background back and forth with a preset width of 500% for smooth scrolling. 

## Promises
Promises are objects that represent values of an operation that might be successful or unsuccessful. This is useful for running code that gets data which will be displayed later, while also allowing other parts of the code to keep running. The end result could be a HTTP status code (500, 404, 400 and so on...), potentially a 1 or 0.

Promises are very powerful when used to read files, retrieve data from an API or write new data. Any operation that might take a while (1-30+ seconds) is worthy of this.
There's three statements for a promise block:
- Pending: Operation hasn't finished yet
- Fulfilled: Operation was successful
- Rejected: Operation failed and a catch, reason or error is given.
### Promise syntax
The syntax for constructing a promise operation is like this:
```javascript
const loadTasks = new Promise(resolve, reject) => {
     if (success) {
    resolve('The operation was successful!');
  } else {
    reject('There was an error.');
  }
}
```
To call the constructed promise (the statement defined above), you simply use
```javascript
loadTask
.then(value => { return 1})
.catch(error => { console.error("promise failed") })
```
### Promise catch/then/finally
If you do not specify a catch block, the program will hang if the operation fails. Therefore it's critical to remember this logic.
``.then()`` blocks are code that is executed sequentially. If any of the statements fail, it'll hop right to the catch block.
``.finally()`` blocks are *always* executed. They are used in cleanup tasks or status reporting.    

## Javascript - Indentation and spacing logic
The indentation logic used in the different scripts are quite straightforward. I space each type of variable, declaration or object with a single lineshift, then followed by a double lineshift to make the code more readable. The indentation scope stays the same throughout the scripts with very few exceptions.

## JavaScript - coreTaskList
This script coreTaskList (CTL) originally had all the handlers and code inside handleClick. This was later refactored and modularized to be more reusable in other areas like localStorageHandler (LSH). The key-value pairs are generated here and it calls the function from the LSH-script.

The code defines all the HTML-IDs like the checkbox, label and button at the start as a constant. We don't want to modify the types before they are used in a new entry.

As long as we grab the ID of an object, we can pass new key-value pairs to the JSON-stored object.

The deadline consists of two parameters:
- Date
- Time
Together, they're joined with a "T" in the middle to create an ISO 8601 JSON string date object. JS has native support for this and can be passed to a database as a universal time standard.

## Javascript - deadlineTimer.js
The rest of the logic based around timers and deadlines is processed in ``deadlineTimer.js``.
Here we will create a function that updates all the timers every second to hide any desync. (No need to update more than every 1000 ms).

## JavaScript - localStorageHandler
Every function has a condition check called storageTest. It will attempt to write and remove an entry to localStorage. The condition check used in each function uses the following template:
```javascript
if (!this.storageTest()) { 
            console.error("Cannot complete operation. Check localStorage permissions");
            return;
        }
```
This will make the function return the error message in the console and since the condition check was false, it'll also display HTML with red error text. Oooo, red text is scaaaaaaaaary!
The exclamation mark "negates" the boolean, effectively making it a negative condition check. So if the condition check returns false, it'll execute the catch block in the existing condition check and the block in the respective function called. In this case:
```javascript
            console.error("Cannot complete operation. Check localStorage permissions");
```
If you cannot use localStorage, any IDs generates will probably be duplicate or invalid, but it won't incapacitate the application or cause a hang.

I defined 4 seperate functions that the storageHandler uses:

### saveTask
Runs every time a new DOM(list)-item is created. The script created a key-value pair; taskID is the key and taskData is the value.
taskData consists of the task ID, title and completion status (boolean).
It is structured like this:
**id: taskID,**
 **title: title,**
**completed: completed** 

#### saveTask: Refactored, now allows adding new data
By adding another variable to saveTask, you can call saveTask to edit or add data points. Let's say you check an item off from your task list. Wouldn't you want to update in localStorage? 
By calling storageHandler.saveTask(...ID, ...key:value pair), you'll be able to add new points to the entry.
This is called a **spread operator**


### loadAllTask
This tasks retrives all the key-value pairs from the built-in localStorage in the browser.
I used a for-loop to iterate over every value since the ID's are generated in a chronological order. The function will retrieve all the IDs based on the length of the total items in localStorage (using localStorage.length). It will retrieve all the items EVEN if an ID is deleted.
Beware that the index starts at 1, not 0. The zero index will be reserved for potential future use.
Let's say the total amount of items is 5. You delete ID 2, 3 and 4. (ID 0 is not generated) The total item count reminaing is then 2. localStorage will grab all the pairs regardless of gaps.

## generateUniqueID
This function will generate a unique ID every time a DOM object is created and saved into localStorage. The id is structed as "ID-{number}" inside localStorage.
That means no task can have the ID value 0. They always start from 1. This will have no impact on further code and features and is merely an aestethic decision.

## deleteTask
This function is called inside handleClick in coreTaskList. It will simply grab the ID from the task and delete the HTML object and the key-value pair with the coresponding JSON-object in localStorage.

## deleteAll
The event listener is located directly in the HTML element (in-line event listener). This functions does 3 simple things:
1 - Does an alert with a confirm-prompt
2 - If true/confirmed; get the HTML-element where all the elements are stored and clears it. Gives the user feedback that the list has been cleared. Otherwise the operation is aborted.
3 - If true/confirmed: executes the built-in command ``localStorage.clear()``


## MVC-concept 
I will explain how an MVC-style coding would apply to a project like this, and how it would be executed.
The MVC-concept does not apply very well to this application considering the scale, BUT it could still be applied if the code were to be refactored for the purposes of commercial use, long-term scaling or mass development of features. This would modularize the code, make it easily accessible for newcomers/contributors and give developers the ability to add new features without borking it because you changed the controller. 

### Model
__The model is the backend of your application. Everything regarding data flow and logic is run in the model file.__

This concept would be responsible for manipulating and organizing data stored. Like the ``localStorageHandler.js`` file. It's main purpose is to store, retrieve and modify data passed by the user into the task list application, as well as running a test function to see if this is possible at all. When the API for random image boxes is implemeneted, it would also go into the model.

The model enforces data rules, such as ensuring valid data types. For instance, if a string is passed into an integer-based function, the model can throw an error or return feedback for debugging.

State management would also be important. Handling ``localStorage`` data would be a good example. If the user was modifying an object (task list item) it would keep the new information and immediately save it. Something like being able to resume editing a new item to add to your task list would be something the model is good at.
**Example code:**
```javascript
const storageHandler = {
    storageTest: function() { // Simply test if storing works to prevent other errors
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        }   catch (e) {
            document.getElementById("storageUnavailable").style.display = "block"; // Makes the error message visible
            return false;   
        }
    },
```
The ``try`` block would be cut up and put into the model, while the catch block would go into the view file since it's responsible for everything regarding UI.

### View
__The view is responsible for displaying and rendering data and elements.__
In the code block above this section, the ``catch(e)`` block would be defined within the view. This could be done with a state tracker using a true/false value OR an integer depending on what you wanna use it for. When the catch block runs it would adjust this state to false and make the UI element display. 

In this project it would be things like the list item generation function ``createTaskElement()``. All rendering of HTML element goes into the view. Another good example would be the function ``checkboxStyling()`` that has the purpose of updating the strikethrough styling on list objects. Like when they are loaded into the application from ``localStorage``, the function checks if the object is completed or not.
Alot of state trackers would go into the View as well.

Any logic functionality should be avoided in the view files. It's only purpose is to display, hide, transform or modify data for the UI-elements.

### Controller
__Any communication between the view and the model would go in the controller.__
This means it would process things like login information, calling functions to display the pages and so on. It's the "ham in the sandwich" for your application. It also delegates tasks to the view and model. The view would cause the trigger, the controller executes the required code/functions, then operates the task given.

The controller can serve simple operations by itself. Like compact logic on gathering information and user input, then sending it to the correct block. In the Task List Application it would do things like error handling, applying event listeners for the buttons and processing user input.

### Server/Services
Contains all the routing information like IPs and API-paths, as well as using RESTful coding principles.


## Additional Features
Will be written down here

    