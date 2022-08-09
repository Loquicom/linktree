(function() {

    // Close legal page
    const closeLegal = document.querySelectorAll('.back');
    for(const elt of closeLegal) {
        elt.addEventListener('click', function() {
            location.href = './';
        });
    }

})();