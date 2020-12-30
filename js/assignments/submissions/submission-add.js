document.addEventListener("DOMContentLoaded", function () {
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

    var studentIds = new Array();
    studentIds = studentsPerCourse.filter(tuple => tuple.cid == courseId);

    for (let i = 0; i < studentIds.length; i++) {
        let student = students.find(s => s.id == studentIds[i]["studid"]);
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
    let ddd = document.getElementsByClassName("id-td");
    for (let i = 0; i < ddd.length; i++) {
        alreadySubmitted.push(parseInt(ddd[i].innerHTML));
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
        var submissions = getSubmissions();
        var submission = new Object();

        submission["id"] = submissions.length + 1;
        submission["briefing"] = parseInt(document.forms["form"]["briefing"].value);
        submission["oral"] = parseInt(document.forms["form"]["oral_mark"].value);
        submission["total"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["maxtotal"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["sdate"] = new Date(document.forms["form"]["date"].value + " " + document.forms["form"]["time"].value);

        submissions[submissions.length] = submission;

        setSubmissions(submissions);

        // sosimo submissions per student


        window.open("submissions-list.html", "_self");
    }
}

function cancel() {
    window.open("submissions-list.html", "_self");
}