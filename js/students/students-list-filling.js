document.addEventListener("DOMContentLoaded", function () {
    var students = getStudents();
    var table = document.querySelector("table");
    var row;
    var cell;


    for (var i = 1; i <= students.length; i++) {
        row = table.insertRow(i);

        cell = row.insertCell(0);
        cell.innerHTML = students[i - 1]["id"];

        cell = row.insertCell(1);
        cell.innerHTML = students[i - 1]["fname"];

        cell = row.insertCell(2);
        cell.innerHTML = students[i - 1]["lname"];

        cell = row.insertCell(3);
        let dob = new Date(students[i - 1]["dob"]).toISOString().substring(0, 10);
        cell.innerHTML = dob;

        cell = row.insertCell(4);
        cell.innerHTML = students[i - 1]["fees"];

        cell = row.insertCell(5);
        cell.innerHTML = '<button type="button" class="table-button" onclick="editStudent(this)" ><i class="material-icons">edit</i>';
    }
});

function editStudent(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    localStorage.setItem("studentIdToEdit", rowId);
    window.open("student-edit.html", "_self");
}
