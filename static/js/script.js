
function dialogSupported() {
    return typeof HTMLDialogElement === 'function';
}

function parseBoolean(string) {
    return string === "true";
}

function manageAnimation(enable) {
    const tilt = document.querySelectorAll('.link');
    // Enable animation
    if (enable) {
        for (const elt of tilt) {
            VanillaTilt.init(elt.querySelector('a'));
            elt.classList.add('animation');
            elt.classList.remove('no-animation')
        }
    }
    // Disable animation
    else {
        for (const elt of tilt) {
            elt.querySelector('a').vanillaTilt.destroy();
            elt.classList.add('no-animation');
            elt.classList.remove('animation');
        }
    }
}

function manageLink(enable) {
    const link = document.querySelectorAll('a');
    // Enable link in new tab
    if (enable) {
        for (const elt of link) {
            elt.target = '_blank';
        }
    }
    // Disable link in new tab
    else {
        for (const elt of link) {
            elt.target = '_self';
        }
    }
}

/**
 * Main function 
 */
(function() {

    /* --- Default values --- */

    if (!localStorage.getItem('init')) {
        // Animation
        if (dialogSupported()) {
            localStorage.setItem('preferedAnimation', true);
        } else {
            localStorage.setItem('preferedAnimation', false);
        }
        // Reduce animation
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            localStorage.setItem('preferedAnimation', false);
        }
        // Link + Init
        localStorage.setItem('preferedLink', false);
        localStorage.setItem('init', true);;
    }
    // Apply values
    manageAnimation(parseBoolean(localStorage.getItem('preferedAnimation')));
    manageLink(parseBoolean(localStorage.getItem('preferedLink')));
    
    /* --- Parameters Dialog --- */

    // Open/Close dialog
    const parameterDialog = document.querySelector('#parameter-dialog');
    document.querySelector('#parameter').addEventListener('click', function() {
        if (dialogSupported()) {
            parameterDialog.open = true;
        } else {
            alert('Votre navigateur n\'est pas compatible. Merci d\'en télécharger un plus récent.');
        }
    });
    const closeDialog = document.querySelectorAll('#parameter-dialog .close-dialog');
    for(const elt of closeDialog) {
        elt.addEventListener('click', function() {
            parameterDialog.open = false;
        });
    }
    // Set parameters value
    const switchAnimation = document.querySelector('#switch-animation');
    switchAnimation.checked = parseBoolean(localStorage.getItem('preferedAnimation'));
    const switchLink = document.querySelector('#switch-link');
    switchLink.checked = parseBoolean(localStorage.getItem('preferedLink'));
    // Parameters change
    switchAnimation.addEventListener('change', function() {
        localStorage.setItem('preferedAnimation', switchAnimation.checked);
        manageAnimation(switchAnimation.checked);
    });
    switchLink.addEventListener('change', function() {
        localStorage.setItem('preferedLink', switchLink.checked);
        manageLink(switchLink.checked);
    });
    // Reset
    document.querySelector('#parameter-reset-button').addEventListener('click', function() {
        localStorage.clear();
        location.reload();
    });

    /* --- Konami Code --- */

    let easterEggInterval = null;
    const easterEgg = new Konami(function() {
        // Enabled konami code easter egg
        if (easterEggInterval === null) {
            // Sound
            new Promise((resolve, reject) => {
                var audio = new Audio('./static/sound/rainbow.mp3');
                audio.play();
            });
            // Init
            const colorPicker = document.querySelectorAll('#color-picker button');
            const pickedColor = document.querySelector('#color-picker button.picked');
            let i = 0;
            // Find actual color position
            for(; i < colorPicker.length; i++) {
                if (colorPicker[i].getAttribute('data-color') === pickedColor.getAttribute('data-color')) {
                    break;
                }
            }
            // Change color
            easterEggInterval = setInterval(function() {
                colorPicker[i % 18].click();
                i++;
            }, 300);
        } 
        // Disabled konami code easter egg
        else {
            clearInterval(easterEggInterval);
        }
    });

})();