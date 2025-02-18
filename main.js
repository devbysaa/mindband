/* CODE REFERENCES
CodingNepal, Create A Draggable Card Slider in HTML CSS & JavaScript | Infinite Image Slider in JavaScript. YouTube video, 30:28.
https://www.youtube.com/watch?v=6QE8dXq9SOE

Font Awesome. n.d. Font Awesome. https://fontawesome.com

GSAP. n.d. GSAP. https://gsap.com

Lenis Dark Room Engineering. n.d. Lenis. https://lenis.darkroom.engineering

Powell, Kevin. 2022. Basic, Intermediate & Pro animated hamburger icons. YouTube video, 59:40.
https://www.youtube.com/watch?v=R00QiudbD4Y

Shoelace. n.d. Shoelace. https://shoelace.style

Simon, Gary. 2023. Create Modern Text Scroll Animations. YouTube video, 20:42.
https://www.youtube.com/watch?v=VeTwNnZUPlw
*/

/*
   =========================================
   GSAP SCROLL TRIGGER & LENIS SMOOTH SCROLL
   =========================================
*/

// Register the GSAP ScrollTrigger plugin to enable animations based on scrolling
gsap.registerPlugin(ScrollTrigger);

// Ensure ScrollTrigger updates element positions correctly after the page loads
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

/* Select all elements with the class `.reveal-type`.
   These elements contain text that will animate when they appear in the viewport */
const splitTypes = document.querySelectorAll('.reveal-type');

/* Loop through each `.reveal-type` element to apply animations.
   This ensures that every text block is animated separately */
splitTypes.forEach((char) => {
    /* Use SplitType to break the text inside each `.reveal-type` element into individual characters.
       This allows us to animate each character separately for a smoother effect */
    const text = new SplitType(char, {types: 'chars'});

    /* Animate each character when the user scrolls to the text block.
       - The characters will fade in with a small delay between each one
       - The animation timing is linked to scrolling */
    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,      // The animation starts when this element enters the viewport
            start: 'top 95%',   // Begins when the top of the element is 95% visible
            end: 'bottom 10%',  // Ends when the bottom of the element is 10% visible
            scrub: 0.3,         // Smoothly follows scroll movement instead of playing instantly
            markers: false      // Set to `true` to see visual markers for debugging
        },
        opacity: 0.4, // Characters start slightly transparent and fade in
        stagger: 0.1  // Each character appears with a small delay to create a typing effect
    });
});

/*
   ==========================================
   LENIS SMOOTH SCROLL SETUP
   ==========================================
*/

// Initialise Lenis to create a smooth scrolling effect
const lenis = new Lenis();

/* Lenis needs to update continuously to maintain smooth scrolling
   - `requestAnimationFrame` is used to update Lenis on every frame of the animation
   - This makes scrolling feel smoother by preventing sudden jumps
*/
function raf(time) {
    lenis.raf(time); // Update Lenis smooth scrolling logic
    requestAnimationFrame(raf); // Call the function again on the next animation frame
}

// Start the continuous animation loop for Lenis smooth scrolling
requestAnimationFrame(raf);

/*
   ==========================================
   HEADER SECTION - BURGER MENU SVG ANIMATION
   ==========================================
*/

/* Select the hidden checkbox that acts as the toggle for the burger menu.
   The checkbox is hidden visually but still functional due to the `for`
   attribute on the <label> element */
const burgerToggle = document.getElementById('burger-toggle');

/* Select the two lines that make up the burger icon: the top and bottom lines.
   These lines will be animated to turn into an "X" when the menu opens */
const topBar = document.querySelector('.bar.top');
const bottomBar = document.querySelector('.bar.bottom');

/* Add an event listener to the burger toggle checkbox.
   The `change` event is triggered whenever the checkbox is checked (menu open)
   or unchecked (menu closed) */
burgerToggle.addEventListener('change', function () {
    // Check if the checkbox is checked (menu open state)
    if (this.checked) {
        /* If the menu is opening, apply the `close-burger-menu` animation to both bars.
           This animation performs two main actions:
           1. Temporarily hides the lines by increasing `stroke-dashoffset`
           2. Rotates the lines to form an "X" shape by applying the `rotate` CSS property

           Animation Duration: 0.7s
           Animation Fill Mode: forwards (keeps the lines in their final 'X' position after
           the animation completes) */
        topBar.style.animation = 'close-burger-menu 0.7s forwards';
        bottomBar.style.animation = 'close-burger-menu 0.7s forwards';
    } else {
        /* If the menu is closing, apply the `open-burger-menu` animation to both bars.

           This animation performs the reverse of the above:
           1. Temporarily hides the lines by increasing `stroke-dashoffset`
           2. Rotates the lines back to their original horizontal positions

           Animation Duration: 0.7s
           Animation Fill Mode: forwards (keeps the lines in their final horizontal position after
           the animation completes) */
        topBar.style.animation = 'open-burger-menu 0.7s forwards';
        bottomBar.style.animation = 'open-burger-menu 0.7s forwards';
    }
});

/*
   =================================
   HEADER SECTION - DARK MODE SWITCH
   =================================
*/

// Select the dark mode shoelace switch element
const darkModeSwitch = document.querySelector('.darkmode-switch');

// Select images that need to change in dark mode
const brainScribble = document.getElementById('brain-scribble');
const starScribble = document.getElementById('star-scribble');
const greenWatches = document.getElementById('green-watches');
const arrowScribble = document.getElementById('arrow-scribble');

/* Listen for changes to the dark mode toggle switch.
   - `sl-change` is the event triggered when the user toggles the switch */
darkModeSwitch.addEventListener('sl-change', (event) => {

    /* Check if the dark mode switch is turned on.
       - `event.target.checked` returns `true` if dark mode is enabled */
    if (event.target.checked) {

        /* Apply dark mode colors to the website by updating CSS variables.
           - These values change the background, text, and element colors
           - `document.documentElement.style.setProperty('--variable-name', 'value')`
             directly modifies CSS variables */
        document.documentElement.style.setProperty('--bg-colour', '#2c2b2f');
        document.documentElement.style.setProperty('--text-colour-one', '#e0e0e0');
        document.documentElement.style.setProperty('--text-colour-two', '#bdbdbd');
        document.documentElement.style.setProperty('--icon-background', '#333');
        document.documentElement.style.setProperty('--element-colour', '#e0e0e0');

        // This replaces the default images with darker versions for better contrast
        brainScribble.src = "/images/brain-scribble-dark.svg";
        starScribble.src = "/images/star-scribble-dark.svg";
        greenWatches.src = "/images/green-watches-dark.svg";
        arrowScribble.src = "/images/arrow-scribble-dark.svg";

    } else {
        // If dark mode is turned off, revert to the default light mode colors
        document.documentElement.style.setProperty('--bg-colour', '#ffffff');
        document.documentElement.style.setProperty('--text-colour-one', '#393346');
        document.documentElement.style.setProperty('--text-colour-two', '#a7a3af');
        document.documentElement.style.setProperty('--icon-background', '#e9e7ee');
        document.documentElement.style.setProperty('--element-colour', '#393346');

        // Reset images to their original light mode versions
        brainScribble.src = "/images/brain-scribble.svg";
        starScribble.src = "/images/star-scribble.svg";
        greenWatches.src = "/images/green-watches.svg";
        arrowScribble.src = "/images/arrow-scribble.svg";
    }
});

/*
   ================================================
   HOW IT WORKS SECTION - SHOELACE DIALOG COMPONENT
   ================================================
*/

// Select all dialog elements with the class `.dialog-overview`
const dialogs = document.querySelectorAll('.dialog-overview');

// Iterate over each dialog and add event listeners for open/close actions
dialogs.forEach(dialog => {
    // Select the shoelace button element immediately after the shoelace dialog element
    const openButton = dialog.nextElementSibling;

    // Select the close button within the dialog
    const closeButton = dialog.querySelector('.close-dialog');

    // Add event listener to open the dialog
    openButton.addEventListener('click', () => {
        dialog.show();
    });

    // Add event listener to close the dialog
    closeButton.addEventListener('click', async () => {
        await dialog.hide();
    });
});

/*
   =============================================
   FEATURES SECTION - WATCH FACE CAROUSEL SLIDER
   =============================================
*/

/* Select the container element that holds all the watch face elements.
   This is the slider that will be moved horizontally to create the carousel effect */
const watchWrapper = document.getElementById('watch-wrapper');

// Select all arrow buttons (left and right). These buttons control the slider movement
const arrowButtons = document.querySelectorAll('.icon-container');

// Initialise the current index of the slider. This index represents which set of watch faces is currently displayed
let scrollIndex = 0;

/* Iterate through all the arrow buttons (left and right) and add event listeners to each.
   Each button click will trigger the `scrollSlider` function with a direction value:
   - `-1` for the left arrow (move slider left)
   - `1` for the right arrow (move slider right) */
arrowButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Check if the clicked button is the left arrow
        if (button.id === "left-arrow") {
            // If left arrow is clicked, move the slider to the left
            scrollSlider(-1);
        }
        // Check if the clicked button is the right arrow
        else if (button.id === "right-arrow") {
            // If right arrow is clicked, move the slider to the right
            scrollSlider(1);
        }
    });
});

/* Scroll the slider horizontally by updating the CSS `transform` property of the `watch-wrapper`.
   The slider moves either to the left or right based on the `direction` argument */
function scrollSlider(direction) {
    // Calculate the number of watch faces currently visible based on screen size
    const visibleWatchFaces = getVisibleWatchFaces();
    const watchFaceWidth = getWatchFaceWidth();

    // Count the total number of available watch face elements
    const totalWatchFaces = watchWrapper.querySelectorAll('.watch-face').length;

    /* Update the scroll index by adding the direction
       - If direction = -1 (left), scrollIndex is decreased
       - If direction = 1 (right), scrollIndex is increased */
    scrollIndex += direction;

    /* Implement boundary wrapping:
       - If the user tries to go past the first set of watch faces (scrollIndex < 0),
       wrap the slider to the last possible visible position

       - If the user tries to go past the last set of watch faces,
       wrap the slider back to the start */
    if (scrollIndex < 0) {
        // Wrap around to the last set of watch faces
        scrollIndex = totalWatchFaces - visibleWatchFaces;
    } else if (scrollIndex > totalWatchFaces - visibleWatchFaces) {
        // Wrap around to the first set of watch faces
        scrollIndex = 0;
    }

    /* Calculate how far the slider should move.
       The distance is calculated by multiplying the current index by the width of one watch face.
       For example, if `scrollIndex = 2` and each watch face is 300px wide, the slider moves 600px */
    const scrollAmount = scrollIndex * watchFaceWidth;

    /* Apply the CSS `transform` property to move the slider.
       `transform: translateX(-${scrollAmount}px)` moves the slider to the left by `scrollAmount` pixels.
       The `transition` property ensures the slider moves smoothly over 0.5 seconds */
    watchWrapper.style.transition = 'transform 0.5s ease';
    watchWrapper.style.transform = `translateX(-${scrollAmount}px)`;
}

/* Determine how many watch faces should be visible on the screen based on the window width.
   This function ensures responsiveness for different device sizes.
   Returns:
   - 1 for screens up to 620px (small mobile devices)
   - 2 for screens up to 768px (mobile and smaller tablets)
   - 3 for screens up to 1024px (desktops and large tablets)
   - 4 for screens wider than 1024px (desktops) */
function getVisibleWatchFaces() {
    // Check the window's width and return the corresponding number of visible watch faces
    if (window.innerWidth <= 620) {
        return 1; // For small mobile devices
    }
    if (window.innerWidth <= 768) {
        return 2; // For mobile devices and smaller tablets
    }
    if (window.innerWidth <= 1024) {
        return 3; // For desktops and large tablets
    }
    return 4; // For large desktops
}

/* Calculate and return the width of a single watch face element.
   The width of one watch face is needed to determine how far the slider should move */
function getWatchFaceWidth() {
    // Select the first watch face element and get its width using the `clientWidth` property
    const firstWatchFace = watchWrapper.querySelector('.watch-face');
    return firstWatchFace.clientWidth;
}

/* Add an event listener that runs whenever the browser window is resized.
   When the window size changes, the number of visible watch faces changes,
   so the slider needs to be reset to the first watch face to avoid layout issues */
window.addEventListener('resize', () => {
    // Reset the slider to the first watch face when the window is resized
    scrollIndex = 0;

    // Reset the slider's transform property to show the first set of watch faces
    watchWrapper.style.transform = `translateX(0px)`;
});


/*
   ===================================================
   FEATURES SECTION - CLICK WATCH FACE FOR DESCRIPTION
   ===================================================
*/

/* This ia an array of objects, with each object representing a feature of the MindBand
   SmartWatch. Each object stores the id of the <img> element of a watch face, a Font Awesome
   icon, the colour of the icon and a description. */
const watchFeatures = [
    {
        id: "health-monitoring-and-fitness",
        icon: "fa-person-running",
        colour: "#FF5D6D",
        descriptions: [
            "MindBand tracks key health metrics like heart rate, activity levels, and blood pressure. " +
            "It provides real-time updates to help you stay aware of your body’s performance. Receive insights " +
            "on your fitness trends and get notified if irregular patterns are detected. " +
            "Whether you’re exercising or relaxing, MindBand helps you prioritise your well-being."
        ]
    },
    {
        id: "smart-home-control",
        icon: "fa-lightbulb",
        colour: "#d58dff",
        descriptions: [
            "Easily control your smart home devices with just a thought. MindBand connects to compatible devices " +
            "like lights, thermostats, and speakers for seamless operation. Forget voice commands or apps — just think " +
            "of the action, and MindBand will do the rest. Adjust the temperature or switch off the lights without " +
            "lifting a finger."
        ]
    },
    {
        id: "watch-control",
        icon: "fa-gears",
        colour: "#FFD862",
        descriptions: [
            "Control your smartwatch functions with just a thought. Open notifications, set alarms, or send messages " +
            "without tapping or swiping. MindBand recognises your brainwave patterns and responds instantly, making smartwatch " +
            "navigation more intuitive than ever."
        ]
    },
    {
        id: "sleep-tracking",
        icon: "fa-moon",
        colour: "#a175ff",
        descriptions: [
            "The MindBand Smartwatch utilises EEG sensors to track brainwave activity in real time, offering a deeper " +
            "understanding of sleep patterns. Unlike traditional wearables that rely on movement or heart rate, MindBand " +
            "directly monitors brain activity, detecting transitions between light sleep, deep sleep, and REM sleep with " +
            "high accuracy. Wake up to detailed insights and personalised recommendations. With better sleep awareness, " +
            "you can improve your nightly rest over time."
        ]
    },
    {
        id: "battery-life",
        icon: "fa-battery-half",
        colour: "#2FA931",
        descriptions: [
            "Enjoy extended use with MindBand’s long-lasting battery. It provides 48 hours of performance on a single charge " +
            "whether you're tracking workouts or controlling devices. No need to worry about frequent charging - MindBand is " +
            "designed to support your busy lifestyle with reliable, efficient power."
        ]
    },
    {
        id: "mood-detection",
        icon: "fa-face-smile",
        colour: "#B6A3CE",
        descriptions: [
            "MindBand detects subtle changes in your mood by analysing neural signals. It helps you track emotional patterns " +
            "throughout the day. The MindBand Smartwatch detects mood by analysing brainwave activity, heart rate variability (HRV), " +
            "and skin conductivity. Its EEG sensors track brain signals associated with emotions, distinguishing patterns linked to stress, " +
            "relaxation, or focus. Combined with HRV data, it identifies physiological responses to emotions like anxiety or calmness. " +
            "By understanding these trends, you can make adjustments to better manage stress and improve your mental well-being."
        ]
    },
    {
        id: "cellular-network",
        icon: "fa-tower-broadcast",
        colour: "#FFB200",
        descriptions: [
            "Stay connected wherever you go. MindBand supports cellular connectivity, allowing you to send messages, " +
            "make calls, and receive notifications. Even without your phone nearby, you’ll stay in touch with what matters " +
            "most. MindBand ensures you’re always connected and informed."
        ]
    }
];

// Selects the container where the selected feature's descriptions are displayed
const featuresDescription = document.getElementById('features-description');

/* This attaches a 'click' event listener to each watch face element. When clicked,
   the `handleWatchFaceClick` function is triggered, which updates the UI accordingly */
const watchFaces = document.querySelectorAll('.watch-face-image');
watchFaces.forEach(watchFace => {
    watchFace.addEventListener('click', handleWatchFaceClick);
});

/* This function retrieves a feature object from the 'watchFeatures' array based on its unique
   'id' value. It returns the full object */
function getFeatureById(id) {
    return watchFeatures.find(feature => feature.id === id);
}

/* Clears the content inside the feature description container to remove any
   previously displayed feature details before new content is displayed */
function clearFeatureDescription() {
    featuresDescription.innerHTML = "";
}

/* Formats the 'id' in the 'watchFeatures' array into a human-readable format
   by removing dash and capitalising the first word
   Example:
   - Input: "smart-home-control"
   - Output: "Smart home control" */
function formatHeadingFromId(id) {
    const formattedID = id.replace(/-/g, ' ');
    return formattedID.charAt(0).toUpperCase() + formattedID.slice(1);
}

/* Creates a heading <div> container to store the heading and an icon.
   A heading and Font Awesome icon is created and appended to the heading
   container.
   This is then appended to the container displaying the feature
   description */

function addFeatureHeadingWithIcon(text, iconClass, iconColour) {
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('feature-heading');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', iconClass, 'feature-icon'); // Create Font Awesome icon
    icon.style.color = iconColour; // Give icon a colour

    const heading = document.createElement('h3');
    heading.textContent = text;
    heading.classList.add('rubik');

    headingContainer.appendChild(icon);
    headingContainer.appendChild(heading);
    featuresDescription.appendChild(headingContainer);
}

/* This function loops through an array of descriptions, creating a `<p>` element for each one.
   Each paragraph is styled with the "responsive-text-small" class to maintain
   consistent formatting. The text content of each `<p>` is set to the description and then
   appended to the 'featureDescription' container */
function populateFeatureDescriptions(descriptions) {
    descriptions.forEach(description => {
        const paragraph = document.createElement('p');
        paragraph.classList.add('responsive-text-small');
        paragraph.textContent = description;
        featuresDescription.appendChild(paragraph);
    });
}

/* This function handles user interaction when a watch face is clicked.
   It extracts the `id` of the clicked element, retrieves the corresponding feature
   data using `getFeatureById()`, and updates the UI. Tt clears previous content, adds the feature heading
   with an icon, and populates the feature descriptions */
function handleWatchFaceClick(event) {
    const selectedId = event.target.id;
    const feature = getFeatureById(selectedId);

    clearFeatureDescription();
    addFeatureHeadingWithIcon(formatHeadingFromId(selectedId), feature.icon, feature.colour);
    populateFeatureDescriptions(feature.descriptions);
}