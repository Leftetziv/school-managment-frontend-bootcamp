function deleteRow(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    var rows = document.querySelectorAll("tr");

    for (var i = 1; i < rows.length; i++) {
        if (rows[i].firstElementChild.innerHTML == rowId) {
            rows[i].remove();
        }
    }
}