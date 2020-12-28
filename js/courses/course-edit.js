document.addEventListener("DOMContentLoaded", function () {
    var courses = getCourses();
    var streams = getStreams();
    var types = getTypes();

    var id = localStorage.getItem('courseIdToEdit');
    var course = courses.find(c => c.id == id);

    // id
    document.getElementById("id").value = id;

    // title
    document.getElementById("title").value = course["title"];

    // stream
    var streamInput = document.getElementById("stream");
    for (var i = 0; i < streams.length; i++) {
        let option = document.createElement("option");
        option.value = streams[i]["id"];
        option.text = streams[i]["stream"];
        if (option.value == course["stream"]) {
            option.selected = true;
        }

        streamInput.add(option);
    }

    // type
    var typeInput = document.getElementById("type");
    for (var i = 0; i < types.length; i++) {
        let option = document.createElement("option");
        option.value = types[i]["id"];
        option.text = types[i]["type"];
        if (option.value == course["type"]) {
            option.selected = true;
        }

        typeInput.add(option);
    }

    //starting time
    var sdateInput = document.getElementById("sdate");
    let sdate = new Date(course["sdate"]).toISOString().substring(0, 10);
    sdateInput.value = sdate;

    //ending time
    var edateInput = document.getElementById("edate");
    let edate = new Date(course["edate"]).toISOString().substring(0, 10);
    edateInput.value = edate;
});


function commitCourse() {
    if (courseCheck()) {
        var courses = getCourses();
        var course = courses.find(c => c.id == document.forms["form"]["id"].value);

        course["title"] = document.forms["form"]["title"].value;
        course["stream"] = parseInt(document.forms["form"]["stream"].value);
        course["type"] = parseInt(document.forms["form"]["type"].value);
        course["sdate"] = document.forms["form"]["sdate"].value;
        course["edate"] = document.forms["form"]["edate"].value;

        setCourses(courses);
        window.open("courses-list.html", "_self");
    }
}

function cancel() {
    window.open("courses-list.html", "_self");
}
