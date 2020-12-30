document.addEventListener("DOMContentLoaded", function () {
    // briefings
    var briefings = getBriefings();
    var briefingInput = document.getElementById("briefing");

    for (var i = 0; i < briefings.length; i++) {
        let option = document.createElement("option");
        option.value = briefings[i]["id"];
        option.text = briefings[i]["title"];
        briefingInput.add(option);
    }
});

function updatestudentSelections() {
    var studentsInput = document.getElementById("student-list");
    studentsInput.innerHTML = "";
    var table = document.querySelector("table");
    table.innerHTML = "";
    table.innerHTML = "<tr><th>Id</th><th>Name</th><th>Date of birth</th><th></th></tr >";

    // students selection
    var studentsPerCourse = getStudentsPerCourse();
    var students = getStudents();
    var courses = getCourses();

    var briefingInput = document.getElementById("briefing");
    var briefingId = briefingInput.value;
    var courseId = courses.find(c => c.id == briefingId)["id"];

    let courseStudentsIds = studentsPerCourse.find(s => s.cid == courseId)["stud"];

    for (let i = 0; i < courseStudentsIds.length; i++) {
        let student = students.find(s => s.id == courseStudentsIds[i]);
        let option = document.createElement("option");
        option.value = student["id"] + " " + student["fname"] + " " + student["lname"];
        studentsInput.append(option);
    }
}


function add() {
    var students = getStudents();

    let studentToAddValue = document.getElementById("students").value;
    let studentToAddId = studentToAddValue.substr(0, studentToAddValue.indexOf(' '));
    let student = students.find(s => s.id == studentToAddId);

    let addError = document.getElementById("add-error");
    let table = document.querySelector("table");
    let row;
    let cell;

    let alreadySubmitted = new Array();
    let tableIds = document.getElementsByClassName("id-td");
    for (let i = 0; i < tableIds.length; i++) {
        alreadySubmitted.push(parseInt(tableIds[i].innerHTML));
    }

    if (student == undefined) {
        addError.innerHTML = "Selection error";
    } else if (alreadySubmitted.includes(student["id"])) {
        addError.innerHTML = "Student already exists";
    } else {
        row = table.insertRow();

        cell = row.insertCell(0);
        cell.innerHTML = student["id"];
        cell.classList.add("id-td");

        cell = row.insertCell(1);
        cell.innerHTML = student["fname"] + " " + student["lname"];

        cell = row.insertCell(2);
        cell.innerHTML = new Date(student["dob"]).toISOString().substring(0, 10);;

        cell = row.insertCell(3);
        cell.innerHTML = '<button type="button" class="select-list-delete-button" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>';

        addError.innerHTML = "";
    }
}

function commitSubmission() {
    if (SubmissionCheck()) {
        // set submission
        let submissions = getSubmissions();
        let submission = new Object();

        submission["id"] = submissions.length + 1;
        submission["briefing"] = parseInt(document.forms["form"]["briefing"].value);
        submission["oral"] = parseInt(document.forms["form"]["oral_mark"].value);
        submission["total"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["maxtotal"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["sdate"] = new Date(document.forms["form"]["date"].value + " " + document.forms["form"]["time"].value);

        submissions[submissions.length] = submission;
        setSubmissions(submissions);

        // set submissions per student
        let submissionsPerStudent = getSubmissionsPerStudent();
        let tableIds = document.getElementsByClassName("id-td");
        let newStudentIds = new Array();

        for (let i = 0; i < tableIds.length; i++) {
            newStudentIds.push(parseInt(tableIds[i].innerHTML));
        }

        let newSubmissionPerStudent = new Object();
        newSubmissionPerStudent["subid"] = submissionsPerStudent.length + 1;
        newSubmissionPerStudent["studentsId"] = newStudentIds;

        submissionsPerStudent[submissionsPerStudent.length] = newSubmissionPerStudent;
        setSubmissionsPerStudent(submissionsPerStudent);

        window.open("submissions-list.html", "_self");
    }
}

function cancel() {
    window.open("submissions-list.html", "_self");
}