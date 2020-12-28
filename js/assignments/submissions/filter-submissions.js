function filterRows(input) {
    var filterText = input.value;

    var rows = document.querySelectorAll("tr");
    for (var i = 1; i < rows.length; i++) {
        var contains = rows[i].children[4].firstChild.nodeValue.toLowerCase().includes(filterText.toLowerCase());

        if (!contains) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
}