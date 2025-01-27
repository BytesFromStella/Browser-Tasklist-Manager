# **High Priority**
Stuff that I absolutely need to add to make it go from barebones to fleshed out. 
## ~~Title and item description~~
~~Allow the user to input both a title and description for each item.~~
COMPLETED 05.11.2024

## ~~Add local storage of input data~~
- ~~Allow the user to close the page and reopen it at a later point to resume use~~
COMPLETED 04.11.2024

## ~~Add error message if the user has disabled device storage~~
~~Simply display some red text on the page encouraging the user to renable the feature and why they should do that. Functionality will be saved in localStorageHandler since it's relevant to the built-in localStorage in JS.~~
COMPLETED 10.11.2024

## ~~Color marking of deadlines (using gradients)~~
~~Change the gradient around the list item box depending on the state of the item~~
COMPLETED 12.01.25

### ~~Add a date for completion or a custom time limit / timer. ~~
COMPLETED 12.01.25
~~This time should use "in x amount of days/hours/minutes".
Should also allow you to change the "time remaining" to the set date and time by hovering your mouse over it.~~

## Add a menu
Either to each element or on the right side when you select an element

## ~~Ensure readability of the website~~
~~Assess whether all the text is readable and that the user is able to navigate around the site using only the keyboard or when using accessibility tools.~~
COMPLETED 12.01.25 (I coincidentally solved this while working on the deadline logic. Everything is responsive now)

## ~~Clear ALL button~~
~~Erases all tasks currently being displayed and stored in the local client~~
COMPLETED 22.11.24 (slow implementation cus sick and busy)

# **Medium Priority**
Stuff that I could add, but isn't necessarily essential.

# ~~Create a quick start guide for the application GitHub page~~
~~This will make it so people who are less adept at using GitHub (or computers in general) will have an easier time trying out the application I made.~~
COMPLETED 19.01.25

## Create a more responsive, dynamic and aestethicly pleasing experience
- ~~Replace the deadline timer with a completion date. Make sure to remove the striking text tranformation when you do so.~~
    Completed 23.01.25
- Implement order numbers.
- Add responsive design with mobile phone scaling.
- Implement drag and drop for tasks.
- Implement automatic sorting algorithms for order numbers. If none present, generate one. 
Use priority as default, and use a drag&drop to assign a value. Decide if there should be a default value for order based on when it's generated. Add a fallback function to this using priority, will only run if an item is falsey
- Add an alertbox confirmation when a user tries to uncheck a completion box
- Add CSS- or JS-code to jump to items that have been created. Potential play an animation like a zoom-bounce or flash. Maybe even flashing the border between two colors (like red and green, rapidly).

# Incorporate a backend
Incorporate a backend using Flask and Python. 
- Use Flask to generate new pages. It will push out a new page when you select an option from a menu.
- Optional: Incorporate data sanitizing using Python

## Task editing
Allow existing tasks to be edited by either hitting an "edit" button or double-clicking the list item.

## Reorganize tasks
Allow tasks to be moved around based on importance/priority by the user.

# **Low Priority**
Other cool stuff that I might come up with will go here.
## Link to a personal website with my portfolio (and make the website of course)
This is where I would babble about myself and the stuff I've made so far. Like a menu with the different projects containing a description, snapshot and title like you would see on YouTube.
## Adding images 
Allow adding and linking images to tasks that are automatically resized to the task box. These images shouldn't be stored by itself, but should point to the path used for the image. That means you can link an image from the internet or link one from your local computer.
Could also make it allow drag&drop into each task box.
## Random image picker
Click a button to randomly select an image that is pulled from an API. Try to use an API that pulls random ass memes. Because that would be funny asf.
## Star/rain animation~~ and different hues~~
~~Allow the user to toggle between preset hues for the background with a few buttons. Alternatively I'll allow the user to pick the hue themself.~~
COMPLETED Hues 12.01.25
Added a dark mode instead. Might shelf this feature

