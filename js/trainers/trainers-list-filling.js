var trainers = getTrainers();
var subjects = getSubjects();
var table = document.querySelector("table");
var row;
var cell;


for (var i = 1; i <= trainers.length; i++) {
    row = table.insertRow(i);

    cell = row.insertCell(0);
    cell.innerHTML = trainers[i - 1]["id"];

    cell = row.insertCell(1);
    cell.innerHTML = trainers[i - 1]["fname"];

    cell = row.insertCell(2);
    cell.innerHTML = trainers[i - 1]["lname"];

    cell = row.insertCell(3);
    let subject = trainers[i - 1]["subject"];
    cell.innerHTML = subjects.find(s => s.id == subject)["subject"];

    cell = row.insertCell(4);
    cell.innerHTML = '<button type="button" class="table-button" onclick="editTrainer(this)" ><i class="material-icons">edit</i>';
}

function editTrainer(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    localStorage.setItem("trainerIdToEdit", rowId);
    window.open("trainer-edit.html", "_self");
}
