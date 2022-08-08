
function getColorPicker(color) {
    return document.querySelector('#color-picker button[data-color=' + color + ']');
}

function getColorPicked(color) {
    return document.querySelector('#color-picked div[data-color=' + color + ']');
}

function getCurrentColor() {
    const colorPicker = document.querySelector('#color-picker button.picked');
    return {
        color: colorPicker.getAttribute('data-color'),
        picker: colorPicker,
        picked: document.querySelector('#color-picked div.picked')
    };
}

/**
 * Main function 
 */
(function() {

    /* --- Default value --- */

    if (!localStorage.getItem('preferedColor')) {
        localStorage.setItem('preferedColor', 'blue');
    }

    /* --- Load color --- */

    getColorPicker(localStorage.getItem('preferedColor')).classList.add('picked');
    getColorPicked(localStorage.getItem('preferedColor')).classList.add('picked');
    document.querySelectorAll('.link').forEach((elt) => elt.setAttribute('data-color', localStorage.getItem('preferedColor')));

    /* --- Interaction --- */

    const colorPicker = document.querySelectorAll('#color-picker button');

    for (const elt of colorPicker) {
        // Hover animation
        const color = elt.getAttribute('data-color');
        elt.addEventListener('mouseenter', function () {
            if (!elt.classList.contains('picked')) {
                getColorPicked(color)?.classList.add('hover');
            }    
        });
        elt.addEventListener('mouseleave', function() {
            getColorPicked(color)?.classList.remove('hover');
        });
        // Change color
        elt.addEventListener('click', function() {
            // Read current color informations
            const data = getCurrentColor();
            // If color change
            if (data.color !== color) {
                // Change the picked one
                getColorPicked(color)?.classList.add('picked');
                getColorPicker(color)?.classList.add('picked');
                data.picked?.classList.remove('picked');
                data.picker?.classList.remove('picked');
                // Change css color
                document.querySelector('#color-style').innerHTML = getCssColor(getColorCodes(color))
                // Change the color on the link
                document.querySelectorAll('.link').forEach((elt) => elt.setAttribute('data-color', color));
                // Set the new color in localStorage
                localStorage.setItem('preferedColor', color);
            }
        });
    }

})();