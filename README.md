# Task List Program

This project's main purpose is to at minimum produce a barebones task list program in the browser. This project should do me good in the future and to refresh all my skill within web development that has been dormant for tooooo long. 
Also other people can read what I write. Isn't that cool?
I will be using ChatGPT to figure out concepts and arguments to use in my code, but NONE of the code is copy-pasted. Everything is manually written by me and if there's something new that I didn't understand from before I will either document it here or comment it directly in the code!
Researching all the individual parts manually constantly when encountering hiccups or obstacles is extremely time consuming. 

## Core Features

- Fancy background with a gradient animation across the webpage
- Submission field with a functional "add" button. ENTER key in the input field also works.
- Generation of new task list objects using JavaScript.
- Styling completed tasks and hovering effects on buttons like DELETE and ADD.
- My cool and awesome new name and signature at the bottom of the page

### HTML code
Barebones website code with all the essentials:
- Webpage title
- Title text on the actual site
- Local submission form and ADD button
- Borders around each gridbox element
- Styled buttons and crossed out text for checked items
- My signature and unicode for the copyright icon:
```html
&#169;
```


## CSS / Styling sheet
For the whole document, I'm justifying all the content to the center for easy scaling and readability. Who wants to use a website where everything justified to the left?
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

## JavaScript - coreTaskList
TBC

## JavaScript - localStorageHandler
TBC

### List items
For some reason, gradients are not supported for borders. So I must come up with an alternative solution:
- Use **border-image-source** to define the gradient
- Use **border-image-slice: 1;** to fill the border with the gradient
- Use **border-style: solid;** to make it into a solid color. I might make this transparent instead (tehe, get it?)
### Body 
- I'm using Comic Sans MS font for easy readability for dyslexic people, and because it looks funny. Why not, right?
- Text-align is centred
- The background consists of 5 different colors which combined creates a hue. 

## Additional Features

- Local saving of task list data
- Align task list items into grid boxes with CSS

