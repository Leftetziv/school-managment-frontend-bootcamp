document.addEventListener("DOMContentLoaded", function () {
    var briefings = getBriefings();
    var courses = getCourses();
    var types = getTypes();
    var streams = getStreams();
    var table = document.querySelector("table");
    var row;
    var cell;


    for (var i = 1; i <= briefings.length; i++) {
        row = table.insertRow(i);

        cell = row.insertCell(0);
        cell.innerHTML = briefings[i - 1]["id"];

        cell = row.insertCell(1);
        cell.innerHTML = briefings[i - 1]["title"];

        cell = row.insertCell(2);
        cell.innerHTML = briefings[i - 1]["maxoral"];

        cell = row.insertCell(3);
        cell.innerHTML = briefings[i - 1]["maxtotal"];

        cell = row.insertCell(4);
        let ddate = new Date(briefings[i - 1]["ddate"]);
        ddate.setTime(ddate.getTime() - (ddate.getTimezoneOffset() * 60000));
        cell.innerHTML = ddate.toISOString().slice(0, 16).replace('T', ' ');

        cell = row.insertCell(5);
        let courseId = briefings[i - 1]["course"];
        let courseTitle = courses.find(c => c.id == courseId)["title"];
        let courseStream = streams.find(s => s.id == (courses.find(c => c.id == courseId)["stream"]))["stream"];
        let courseType = types.find(t => t.id == (courses.find(c => c.id == courseId)["type"]))["type"];
        cell.innerHTML = courseTitle + "-" + courseStream + "-" + courseType;

        cell = row.insertCell(6);
        cell.innerHTML = briefings[i - 1]["isproject"] ? "Yes" : "No";

        cell = row.insertCell(7);
        cell.innerHTML = '<a href="#" class="modal-btn" onclick="openModal(this)">Click to Read Description</a>';

        cell = row.insertCell(8);
        cell.innerHTML = '<button type="button" class="table-button" onclick="editBriefing(this)" ><i class="material-icons">edit</i>';
    }
});

function editBriefing(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    localStorage.setItem("briefingIdToEdit", rowId);
    window.open("briefing-edit.html", "_self");
}
