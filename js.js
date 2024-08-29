//Marcar ou desmarcar todos os Checkboxes
document.getElementById("cbtodos").addEventListener("click", function () {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]:not([id=cbtodos])');
    const isChecked = this.checked;

    checkBoxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
    });
});


//Fazer download dos Checkboxes selecionados
document.getElementById('downloadBtn').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="cb"]:checked');
    if (checkboxes.length > 0) {
        checkboxes.forEach(function (checkbox) {
            const link = checkbox.getAttribute('data-link');
            if (link) {
                setTimeout(function () {
                    window.open(link, '_blank');
                }, 1000);
            } else {
                console.error('Link Inválido.');
            }
        });
    } else {
        alert('Nenhum item foi selecionado. Por favor, selecione pelo menos um item.');
    }
});

