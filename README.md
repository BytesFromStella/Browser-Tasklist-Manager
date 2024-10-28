# Task List Program

This project's main purpose is to at minimum produce a barebones task list program in the browser.

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
- My signature and unicode for the copyright icon
```html
&#169;
```

## Additional Features

- Local saving of task list data
- Align task list items into grid boxes with CSS

## Colorshift Animation

The colorshift animation is quite straightforward in how it works.

```css
animation: colorShift 8s ease infinite alternate;
```
- Animation: Specifies that this object will use an animation.
- 8s: The duration of the animation. It can be tweaked to be faster or slower.
- ease: A built-in timing function used in CSS that controls the curvature of the speed (slow start, speeds up in the middle, slows down near the end).
- infinite: Specifies that the animation will run infinitely.
- alternate: The animation will play from 0% to 100%, then back from 100% to 0%.