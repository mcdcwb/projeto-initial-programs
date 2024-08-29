document.getElementById('downloadBtn').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="cb"]:checked');
    checkboxes.forEach(function (checkbox) {
        const link = checkbox.getAttribute('data-link');
        window.open(link, '_blank');
    });
});