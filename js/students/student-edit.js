document.addEventListener("DOMContentLoaded", function () {
    var students = getStudents();

    var id = localStorage.getItem('studentIdToEdit');
    var student = students.find(s => s.id == id);

    // id
    document.getElementById("id").value = id;

    // first name
    document.getElementById("fname").value = student["fname"];

    // last name
    document.getElementById("lname").value = student["lname"];

    //dob
    document.getElementById("dob").value = new Date(student["dob"]).toISOString().substring(0, 10);

    //fees
    document.getElementById("tuition").value = student["fees"];
});

function commitStudent() {
    if (studentCheck()) {
        var students = getStudents();
        var student = students.find(s => s.id == document.forms["form"]["id"].value);

        student["fname"] = document.forms["form"]["fname"].value;
        student["lname"] = document.forms["form"]["lname"].value;
        student["dob"] = document.forms["form"]["dob"].value;
        student["fees"] = parseInt(document.forms["form"]["tuition"].value);

        setStudents(students);
        window.open("students-list.html", "_self");
    }
}

function cancel() {
    window.open("students-list.html", "_self");
}