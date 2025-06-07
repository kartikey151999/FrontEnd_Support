document.addEventListener('DOMContentLoaded', () => {
    // Select all interactive boxes
    const interactiveBoxes = document.querySelectorAll('.interactive-box');

    // Add a click event listener to each box
    interactiveBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Check if the clicked box already has the 'active' class
            const isActive = box.classList.contains('active');

            // First, collapse any currently active box
            interactiveBoxes.forEach(otherBox => {
                // Remove 'active' class from all boxes
                otherBox.classList.remove('active');
                // Uncheck the radio button if it's not the clicked box
                const radio = otherBox.querySelector('input[type="radio"]');
                if (radio && otherBox !== box) {
                    radio.checked = false;
                }
            });

            // If the clicked box was not active, expand it and check its radio button
            if (!isActive) {
                box.classList.add('active');
                const radio = box.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                }
            } else {
                // If it was active, and we just collapsed it, ensure the radio button is unchecked.
                // This handles the case where clicking an already active box collapses it.
                const radio = box.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = false;
                }
            }
        });

        // Prevent click events on the radio button from propagating to the parent box
        // This ensures clicking the radio button itself doesn't cause a double-toggle or unexpected behavior.
        const radioInput = box.querySelector('input[type="radio"]');
        if (radioInput) {
            radioInput.addEventListener('click', (event) => {
                event.stopPropagation(); // Stop the event from bubbling up to the box
                // Manually handle active state based on radio button click
                interactiveBoxes.forEach(otherBox => {
                    if (otherBox !== box) {
                        otherBox.classList.remove('active');
                    }
                });
                if (radioInput.checked) {
                    box.classList.add('active');
                } else {
                    box.classList.remove('active');
                }
            });
        }
    });

    // Initialize: set the first box as active and checked on page load
    const firstBox = document.getElementById('box1');
    if (firstBox) {
        firstBox.classList.add('active');
        const firstRadio = firstBox.querySelector('input[type="radio"]');
        if (firstRadio) {
            firstRadio.checked = true;
        }
    }
});