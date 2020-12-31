document.addEventListener("DOMContentLoaded", function () {
    var streams = getStreams();
    let types = getTypes();

    // stream
    var streamInput = document.getElementById("stream");
    // var typeStream = document.createElement("option");
    // typeStream.text = "Select a stream";
    // typeStream.value = 0;
    // typeStream.selected = true;
    // typeStream.disabled = true;
    // streamInput.add(typeStream);

    for (var i = 0; i < streams.length; i++) {
        let streamOption = document.createElement("option");
        streamOption.value = streams[i]["id"];
        streamOption.text = streams[i]["stream"];
        streamInput.add(streamOption);
    }

    // type
    var typeInput = document.getElementById("type");
    // var typeOption = document.createElement("option");
    // typeOption.text = "Select a type";
    // typeOption.value = 0;
    // typeOption.selected = true;
    // typeOption.disabled = true;
    // typeInput.add(typeOption);

    for (var i = 0; i < types.length; i++) {
        let typeOption = document.createElement("option");
        typeOption.value = types[i]["id"];
        typeOption.text = types[i]["type"];
        typeInput.add(typeOption);
    }
});

function commitCourse() {
    if (courseCheck()) {
        var courses = getCourses();
        var course = new Object();

        course["id"] = courses.length + 1;
        course["title"] = document.forms["form"]["title"].value;
        course["stream"] = parseInt(document.forms["form"]["stream"].value);
        course["type"] = parseInt(document.forms["form"]["type"].value);
        course["sdate"] = document.forms["form"]["sdate"].value ? document.forms["form"]["sdate"].value : new Date();
        course["edate"] = document.forms["form"]["edate"].value ? document.forms["form"]["edate"].value : new Date();

        courses[courses.length] = course;
        setCourses(courses);

        // put empty object for the new course for students per course
        let studentsPerCourse = getStudentsPerCourse();
        let studentsPerNewCourse = new Object();
        studentsPerNewCourse["cid"] = course["id"];
        studentsPerNewCourse["stud"] = new Array();

        studentsPerCourse[studentsPerCourse.length] = studentsPerNewCourse;
        setStudentsPerCourse(studentsPerCourse);

        //put empty object for the new course for trainers per course
        let trainersPerCourse = getTrainersPerCourse();
        let trainersPerNewCourse = new Object();
        trainersPerNewCourse["cid"] = course["id"];
        trainersPerNewCourse["trainers"] = new Array();

        trainersPerCourse[trainersPerCourse.length] = trainersPerNewCourse;
        setTrainersPerCourse(trainersPerCourse);

        window.open("courses-list.html", "_self");
    }
}

function cancel() {
    window.open("courses-list.html", "_self");
}

