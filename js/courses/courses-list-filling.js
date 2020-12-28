document.addEventListener("DOMContentLoaded", function () {
    var courses = getCourses();
    var streams = getStreams();
    var types = getTypes();
    var table = document.querySelector("table");
    var row;
    var cell;


    for (var i = 1; i <= courses.length; i++) {
        row = table.insertRow(i);

        cell = row.insertCell(0);
        cell.innerHTML = courses[i - 1]["id"];

        cell = row.insertCell(1);
        cell.innerHTML = courses[i - 1]["title"];

        cell = row.insertCell(2);
        let stream = courses[i - 1]["stream"];
        cell.innerHTML = streams.find(s => s.id == stream)["stream"]

        cell = row.insertCell(3);
        let type = courses[i - 1]["type"];
        cell.innerHTML = types.find(s => s.id == type)["type"]

        cell = row.insertCell(4);
        let sdate = new Date(courses[i - 1]["sdate"]).toISOString().substring(0, 10);
        cell.innerHTML = sdate;

        cell = row.insertCell(5);
        let edate = new Date(courses[i - 1]["edate"]).toISOString().substring(0, 10);
        cell.innerHTML = edate;

        cell = row.insertCell(6);
        cell.innerHTML = '<button type="button" class="table-button" onclick="editCourse(this)" ><i class="material-icons">edit</i>';
    }
});

function editCourse(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    localStorage.setItem("courseIdToEdit", rowId);
    window.open("course-edit.html", "_self");
}
