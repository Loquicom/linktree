let color = localStorage.getItem('preferedColor') ? localStorage.getItem('preferedColor') : 'blue';
document.querySelector('#color-style').href = 'static/css/color/pico-' + color + '.css';