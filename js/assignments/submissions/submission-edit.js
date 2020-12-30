document.addEventListener("DOMContentLoaded", function () {
    var submissions = getSubmissions();
    var briefings = getBriefings();
    var submissionsPerStudent = getSubmissionsPerStudent();
    var studentsPerCourse = getStudentsPerCourse();
    var students = getStudents();
    var courses = getCourses();

    var id = localStorage.getItem('submissionIdToEdit');
    var submission = submissions.find(s => s.id == id);

    // id
    document.getElementById("id").value = id;

    // briefing
    var briefingInput = document.getElementById("briefing");
    var option = document.createElement("option");
    var briefing = briefings.find(b => b.id == submission["briefing"]);
    option.text = briefing["title"];
    option.value = briefing["id"];
    option.selected = true;
    briefingInput.add(option);

    // oral
    document.getElementById("oral_mark").value = submission["oral"];

    // total
    document.getElementById("total_mark").value = submission["total"];

    // due date
    var dateInput = document.getElementById("date");
    var date = new Date(submission["sdate"]);
    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
    dateInput.value = date.toISOString().slice(0, 10);

    // due time
    var timeInput = document.getElementById("time");
    var time = new Date(submission["sdate"]).toTimeString().substring(0, 5);
    timeInput.value = date.toISOString().slice(11, 16);

    // students table
    var table = document.querySelector("table");
    var row;
    var cell;
    var j = 1;
    for (var i = 0; i < submissionsPerStudent.length; i++) {
        if (submissionsPerStudent[i]["subid"] == id) {
            let studId = submissionsPerStudent[i]["studid"];
            let student = students.find(s => s.id == studId);
            let fname = student["fname"];
            let lname = student["lname"];
            let dob = new Date(student["dob"]).toISOString().substring(0, 10);

            row = table.insertRow(j);

            cell = row.insertCell(0);
            cell.innerHTML = studId;
            cell.classList.add("id-td");

            cell = row.insertCell(1);
            cell.innerHTML = fname + " " + lname;

            cell = row.insertCell(2);
            cell.innerHTML = dob;

            cell = row.insertCell(3);
            cell.innerHTML = '<button type="button" class="select-list-delete-button" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>';
            j++;
        }
    }

    // students selection
    var briefingId = briefingInput.value;
    var courseId = courses.find(c => c.id == briefingId)["id"];

    var studentIds = new Array();
    studentIds = studentsPerCourse.filter(tuple => tuple.cid == courseId);

    var studentsInput = document.getElementById("student-list");
    for (var i = 0; i < studentIds.length; i++) {
        let student = students.find(s => s.id == studentIds[i]["studid"]);
        let option = document.createElement("option");
        option.value = student["id"] + " " + student["fname"] + " " + student["lname"];
        studentsInput.append(option);
    }

});

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
        var submission = submissions.find(s => s.id == document.forms["form"]["id"].value);

        submission["oral"] = parseInt(document.forms["form"]["oral_mark"].value);
        submission["total"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["maxtotal"] = parseInt(document.forms["form"]["total_mark"].value);
        submission["sdate"] = new Date(document.forms["form"]["date"].value + " " + document.forms["form"]["time"].value);

        setSubmissions(submissions);

        // sosimo submissions per student


        window.open("submissions-list.html", "_self");
    }
}

function cancel() {
    window.open("submissions-list.html", "_self");
}