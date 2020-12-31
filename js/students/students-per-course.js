document.addEventListener("DOMContentLoaded", function () {
    // put all courses on course selection input
    var courses = getCourses();
    var types = getTypes();
    var streams = getStreams();
    var courseInput = document.getElementById("course");

    for (var i = 0; i < courses.length; i++) {
        let courseId = courses[i]["id"];
        let courseTitle = courses[i]["title"];
        let courseStream = streams.find(s => s.id == (courses[i]["stream"]))["stream"];
        let courseType = types.find(t => t.id == (courses[i]["type"]))["type"];

        let option = document.createElement("option");
        option.value = courseId;
        option.text = courseTitle + "-" + courseStream + "-" + courseType;

        courseInput.add(option);
    }

    // put all student in student selection input
    var students = getStudents();
    var studentsInput = document.getElementById("student-list");

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let option = document.createElement("option");
        option.value = student["id"] + " " + student["fname"] + " " + student["lname"];
        studentsInput.append(option);
    }

    updatestudentSelections();
});

function updatestudentSelections() {
    var table = document.querySelector("table");
    table.innerHTML = "";
    table.innerHTML = "<tr><th>Id</th><th>Name</th><th>Date of birth</th><th></th></tr >";

    // update students table
    let studentsPerCourse = getStudentsPerCourse();
    let students = getStudents();

    let courseId = document.getElementById("course").value;
    let row;
    let cell;

    let studentsEnrolled = studentsPerCourse.find(s => s.cid == courseId)["stud"];

    for (let i = 0; i < studentsEnrolled.length; i++) {
        let studentEnrolled = students.find(s => s.id == studentsEnrolled[i]);
        let studentId = studentEnrolled["id"];
        let fname = studentEnrolled["fname"];
        let lname = studentEnrolled["lname"];
        let dob = new Date(studentEnrolled["dob"]).toISOString().substring(0, 10);

        row = table.insertRow();

        cell = row.insertCell(0);
        cell.innerHTML = studentId;
        cell.classList.add("id-td");

        cell = row.insertCell(1);
        cell.innerHTML = fname + " " + lname;

        cell = row.insertCell(2);
        cell.innerHTML = dob;

        cell = row.insertCell(3);
        cell.innerHTML = '<button type="button" class="select-list-delete-button" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>';
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

    let alreadyAdded = new Array();
    let tableIds = document.getElementsByClassName("id-td");
    for (let i = 0; i < tableIds.length; i++) {
        alreadyAdded.push(parseInt(tableIds[i].innerHTML));
    }

    if (student == undefined) {
        addError.innerHTML = "Selection error";
    } else if (alreadyAdded.includes(student["id"])) {
        addError.innerHTML = "Student already added";
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

function updateCourse() {
    // update students per course
    let studentsPerCourse = getStudentsPerCourse();
    let tableIds = document.getElementsByClassName("id-td");
    let newStudentIds = new Array();

    for (let i = 0; i < tableIds.length; i++) {
        newStudentIds.push(parseInt(tableIds[i].innerHTML));
    }
    studentsPerCourse.find(t => t.cid == document.getElementById("course").value)["stud"] = newStudentIds;
    setStudentsPerCourse(studentsPerCourse);

    window.open("../courses/courses-list.html", "_self");
}

function cancelToCourse() {
    window.open("../courses/courses-list.html", "_self");
}