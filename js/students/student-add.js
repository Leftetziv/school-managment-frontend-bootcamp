function commitStudent() {
    if (studentCheck()) {
        var students = getStudents();
        var student = new Object();

        student["id"] = students.length + 1;
        student["fname"] = document.forms["form"]["fname"].value;
        student["lname"] = document.forms["form"]["lname"].value;
        student["dob"] = document.forms["form"]["dob"].value ? document.forms["form"]["dob"].value : new Date();
        student["fees"] = parseInt(document.forms["form"]["tuition"].value);

        students[students.length] = student;

        setStudents(students);
        window.open("students-list.html", "_self");
    }
}

function cancel() {
    window.open("students-list.html", "_self");
}