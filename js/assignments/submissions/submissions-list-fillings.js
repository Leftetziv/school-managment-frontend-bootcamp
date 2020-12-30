document.addEventListener("DOMContentLoaded", function () {
    var submissions = getSubmissions();
    var briefings = getBriefings();
    var submissionsPerStudent = getSubmissionsPerStudent();
    var students = getStudents();

    var table = document.querySelector("table");
    var row;
    var cell;


    for (var i = 1; i <= submissions.length; i++) {
        row = table.insertRow(i);

        cell = row.insertCell(0);
        let subid = submissions[i - 1]["id"];
        cell.innerHTML = subid;

        cell = row.insertCell(1);
        cell.innerHTML = submissions[i - 1]["oral"];

        cell = row.insertCell(2);
        cell.innerHTML = submissions[i - 1]["total"];

        cell = row.insertCell(3);
        let date = new Date(submissions[i - 1]["sdate"]);
        date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
        cell.innerHTML = date.toISOString().slice(0, 16).replace('T', ' ');

        cell = row.insertCell(4);
        cell.innerHTML = briefings.find(b => b.id == submissions[i - 1]["briefing"])["title"];

        cell = row.insertCell(5);
        let subStudent = "";
        
        for (var j = 0; j < submissionsPerStudent.length; j++) {
            if (submissionsPerStudent[j]["subid"] == subid) {
                let studId = submissionsPerStudent[j]["studid"];
                let student = students.find(s => s.id == studId);
                let fname = student["fname"];
                let lname = student["lname"];

                subStudent += fname +" "+ lname+", ";
            }
        }
        cell.innerHTML = subStudent;

        cell = row.insertCell(6);
        cell.innerHTML = '<button type="button" class="table-button" onclick="editSubmission(this)" ><i class="material-icons">edit</i>';
    }
});

function editSubmission(td) {
    var rowId = td.parentNode.parentNode.firstElementChild.firstChild.data;
    localStorage.setItem("submissionIdToEdit", rowId);
    window.open("submission-edit.html", "_self");
}
