function convertHex(hex, a = null) {
    const r = parseInt(hex[1] + hex[2], 16);
    const g = parseInt(hex[3] + hex[4], 16);
    const b = parseInt(hex[5] + hex[6], 16);
    if (a != null) {
        return `rgba(${ r },${ g },${ b },${ a })`;
    } else {
        return `rgb(${ r },${ g },${ b })`;
    }
}

function getColorCodes(color) {
    let data = {};
    switch (color) {
        case 'amber':
            data = {
                primary: "#ffb300",
                primaryHoverLight: "#ffa000",
                primaryHoverDark: "#ffc107",
                primaryInverse: "rgba(0, 0, 0, 0.75)"
            };
            break;
        case 'blue-grey':
            data = {
                primary: "#546e7a",
                primaryHoverLight: "#455a64",
                primaryHoverDark: "#607d8b",
                primaryInverse: "#FFF"
            };
            break;
        case 'blue':
            data = {
                primary: "#1e88e5",
                primaryHoverLight: "#1976d2",
                primaryHoverDark: "#2196f3",
                primaryInverse: "#FFF"
            };
            break;
        case 'cyan':
            data = {
                primary: "#00acc1",
                primaryHoverLight: "#0097a7",
                primaryHoverDark: "#00bcd4",
                primaryInverse: "#FFF"
            };
            break;
        case 'deep-orange':
            data = {
                primary: "#f4511e",
                primaryHoverLight: "#e64a19",
                primaryHoverDark: "#ff5722",
                primaryInverse: "#FFF"
            };
            break;
        case 'deep-purple':
            data = {
                primary: "#5e35b1",
                primaryHoverLight: "#512da8",
                primaryHoverDark: "#673ab7",
                primaryInverse: "#FFF"
            };
            break;
        case 'green':
            data = {
                primary: "#43a047",
                primaryHoverLight: "#388e3c",
                primaryHoverDark: "#4caf50",
                primaryInverse: "#FFF"
            };
            break;
        case 'grey':
            data = {
                primary: "#757575",
                primaryHoverLight: "#616161",
                primaryHoverDark: "#9e9e9e",
                primaryInverse: "#FFF"
            };
            break;
        case 'indigo':
            data = {
                primary: "#3949ab",
                primaryHoverLight: "#303f9f",
                primaryHoverDark: "#3f51b5",
                primaryInverse: "#FFF"
            };
            break;
        case 'light-blue':
            data = {
                primary: "#039be5",
                primaryHoverLight: "#0288d1",
                primaryHoverDark: "#03a9f4",
                primaryInverse: "#FFF"
            };
            break;
        case 'light-green':
            data = {
                primary: "#7cb342",
                primaryHoverLight: "#689f38",
                primaryHoverDark: "#8bc34a",
                primaryInverse: "#FFF"
            };
            break;
        case 'lime':
            data = {
                primary: "#c0ca33",
                primaryHoverLight: "#afb42b",
                primaryHoverDark: "#cddc39",
                primaryInverse: "rgba(0, 0, 0, 0.75)"
            };
            break;
        case 'orange':
            data = {
                primary: "#fb8c00",
                primaryHoverLight: "#f57c00",
                primaryHoverDark: "#ff9800",
                primaryInverse: "#FFF"
            };
            break;
        case 'pink':
            data = {
                primary: "#d81b60",
                primaryHoverLight: "#c2185b",
                primaryHoverDark: "#e91e63",
                primaryInverse: "#FFF"
            };
            break;
        case 'purple':
            data = {
                primary: "#8e24aa",
                primaryHoverLight: "#7b1fa2",
                primaryHoverDark: "#9c27b0",
                primaryInverse: "#FFF"
            };
            break;
        case 'red':
            data = {
                primary: "#e53935",
                primaryHoverLight: "#d32f2f",
                primaryHoverDark: "#f44336",
                primaryInverse: "#FFF"
            };
            break;
        case 'teal':
            data = {
                primary: "#00897b",
                primaryHoverLight: "#00796b",
                primaryHoverDark: "#009688",
                primaryInverse: "#FFF"
            };
            break;
        case 'yellow':
            data = {
                primary: "#fdd835",
                primaryHoverLight: "#fbc02d",
                primaryHoverDark: "#ffeb3b",
                primaryInverse: "rgba(0, 0, 0, 0.75)"
            };
            break;
        default:
            throw "Unknown color";
    }
    data['primaryFocusLight'] = convertHex(data.primary, 0.125)
    data['primaryFocusDark'] = convertHex(data.primary, 0.25)
    return data;
}

function getCssColor(colorData) {
    return `
[data-theme="light"],
:root:not([data-theme="dark"]) {
--primary: ${ colorData.primary };
--primary-hover: ${ colorData.primaryHoverLight };
--primary-focus: ${ colorData.primaryFocusLight };
--primary-inverse: ${ colorData.primaryInverse };
}
@media only screen and (prefers-color-scheme: dark) {
:root:not([data-theme="light"]) {
  --primary: ${ colorData.primary };
  --primary-hover: ${ colorData.primaryHoverDark };
  --primary-focus: ${ colorData.primaryFocusDark };
  --primary-inverse: ${ colorData.primaryInverse };
}
}
[data-theme="dark"] {
--primary: ${ colorData.primary };
--primary-hover: ${ colorData.primaryHoverDark };
--primary-focus: ${ colorData.primaryFocusDark };
--primary-inverse: ${ colorData.primaryInverse };
}
:root {
--form-element-active-border-color: var(--primary);
--form-element-focus-color: var(--primary-focus);
--switch-color: var(--primary-inverse);
--switch-checked-background-color: var(--primary);
--link-button-background: url("data:image/svg+xml,%3Csvg width='800px' height='700px' viewBox='0 0 800 70' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' %3E %3Cg id='a' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' %3E %3Cpolygon id='b' fill='${ colorData.primary.replaceAll('#', '%23') }' points='0 32.8554687 0 129.190599 799.859707 129.190599 799.859707 0.105040791' %3E %3C/polygon %3E %3C/g %3E %3C/svg %3E");
}
    `;
}

let color = localStorage.getItem('preferredColor') ? localStorage.getItem('preferredColor') : 'blue';
document.querySelector('#color-style').innerHTML = getCssColor(getColorCodes(color));
