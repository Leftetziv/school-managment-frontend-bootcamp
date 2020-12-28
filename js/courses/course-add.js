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

for (var i = 1; i < streams.length; i++) {
    let typeStream = document.createElement("option");
    typeStream.value = streams[i]["id"];
    typeStream.text = streams[i]["stream"];
    streamInput.add(typeStream);
}

// type
var typeInput = document.getElementById("type");
// var typeOption = document.createElement("option");
// typeOption.text = "Select a type";
// typeOption.value = 0;
// typeOption.selected = true;
// typeOption.disabled = true;
// typeInput.add(typeOption);

for (var i = 1; i < types.length; i++) {
    let typeOption = document.createElement("option");
    typeOption.value = types[i]["id"];
    typeOption.text = types[i]["type"];
    typeInput.add(typeOption);
}

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
        window.open("courses-list.html", "_self");
    }
}

function cancel() {
    window.open("courses-list.html", "_self");
}

