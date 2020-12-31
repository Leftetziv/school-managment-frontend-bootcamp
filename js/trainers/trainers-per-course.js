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
    var trainers = getTrainers();
    var subjects = getSubjects();
    var trainersInput = document.getElementById("trainers-list");

    for (let i = 0; i < trainers.length; i++) {
        let trainer = trainers[i];
        let option = document.createElement("option");
        option.value = trainer["id"] + " " + trainer["fname"] + " " + trainer["lname"];
        option.value += " (" + subjects.find(s => s.id == trainer["subject"])["subject"] + ")";
        trainersInput.append(option);
    }

    updateTrainerSelections();
});

function updateTrainerSelections() {
    var table = document.querySelector("table");
    table.innerHTML = "";
    table.innerHTML = "<tr><th>Id</th><th>Name</th><th>Subject</th><th></th></tr>";

    // update trainers table
    let trainersPerCourse = getTrainersPerCourse();
    let trainers = getTrainers();
    var subjects = getSubjects();

    let courseId = document.getElementById("course").value;
    let row;
    let cell;

    let trainersEnrolled = trainersPerCourse.find(t => t.cid == courseId)["trainers"];

    for (let i = 0; i < trainersEnrolled.length; i++) {
        let trainerEnrolled = trainers.find(s => s.id == trainersEnrolled[i]);
        let trainerId = trainerEnrolled["id"];
        let fname = trainerEnrolled["fname"];
        let lname = trainerEnrolled["lname"];
        let subject = subjects.find(s => s.id == trainerEnrolled["subject"])["subject"];

        row = table.insertRow();

        cell = row.insertCell(0);
        cell.innerHTML = trainerId;
        cell.classList.add("id-td");

        cell = row.insertCell(1);
        cell.innerHTML = fname + " " + lname;

        cell = row.insertCell(2);
        cell.innerHTML = subject;

        cell = row.insertCell(3);
        cell.innerHTML = '<button type="button" class="select-list-delete-button" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>';
    }
}

function add() {
    var trainers = getTrainers();
    var subjects = getSubjects();

    let trainerToAddValue = document.getElementById("trainers").value;
    let trainerToAddId = trainerToAddValue.substr(0, trainerToAddValue.indexOf(' '));
    let trainer = trainers.find(s => s.id == trainerToAddId);

    let addError = document.getElementById("add-error");
    let table = document.querySelector("table");
    let row;
    let cell;

    let alreadyAdded = new Array();
    let tableIds = document.getElementsByClassName("id-td");
    for (let i = 0; i < tableIds.length; i++) {
        alreadyAdded.push(parseInt(tableIds[i].innerHTML));
    }

    if (trainer == undefined) {
        addError.innerHTML = "Selection error";
    } else if (alreadyAdded.includes(trainer["id"])) {
        addError.innerHTML = "Trainer already added";
    } else {
        row = table.insertRow();

        cell = row.insertCell(0);
        cell.innerHTML = trainer["id"];
        cell.classList.add("id-td");

        cell = row.insertCell(1);
        cell.innerHTML = trainer["fname"] + " " + trainer["lname"];

        cell = row.insertCell(2);
        cell.innerHTML = subjects.find(s => s.id == trainer["subject"])["subject"];

        cell = row.insertCell(3);
        cell.innerHTML = '<button type="button" class="select-list-delete-button" onclick="deleteRow(this)"><i class="material-icons">delete</i></button>';

        addError.innerHTML = "";
    }
}

function updateCourse() {
    // update trainers per course
    let trainersPerCourse = getTrainersPerCourse();

    let tableIds = document.getElementsByClassName("id-td");
    let newTrainersIds = new Array();

    for (let i = 0; i < tableIds.length; i++) {
        newTrainersIds.push(parseInt(tableIds[i].innerHTML));
    }
    trainersPerCourse.find(t => t.cid == document.getElementById("course").value)["trainers"] = newTrainersIds;
    setTrainersPerCourse(trainersPerCourse);

    window.open("../courses/courses-list.html", "_self");
}

function cancelToCourse() {
    window.open("../courses/courses-list.html", "_self");
}