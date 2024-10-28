This project's main purpose is to produce a barebones task list program in the browser.

Core features:

- Fancy background with a gradient animation
- Submission field with a functional "add"-button
- Generation of new task list objects using JavaScript
- Styling completed tasks and hovering effects on buttons.
- My signature at the bottom of the page


Additional features:

- Local saving of tasklist data
- Align task list items into gridboxes with CSS





Colorshift animation:

The colorshift animation is quite straightforward in how it works.

|| animation: colorShift 8s ease infinite alternate;||
Animation: specifies that this object will use an animation
8s: The DURATION of the animation. It can be tweaked to be faster or slower.
ease: Built-in timing function used in CSS. It controls the curviture of the speed. (slow start, speeds up in the middle, slows down near the end)
infinite: Specifies that the animation will run infinitely
Alternate: The animation will play from 0% to 100%, then back from 100% to 0%.

|| @keyframes colorShift ||
0%{}: This is the starting point of the animation. When the animation begins, the background position is set to 0% 50%, meaning it starts from the left edge of the background
100%: End point of the animation.