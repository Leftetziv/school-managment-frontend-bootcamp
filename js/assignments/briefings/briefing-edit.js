document.addEventListener("DOMContentLoaded", function () {
    var briefings = getBriefings();
    var courses = getCourses();
    var types = getTypes();
    var streams = getStreams();

    var id = localStorage.getItem('briefingIdToEdit');
    var briefing = briefings.find(c => c.id == id);

    // id
    document.getElementById("id").value = id;

    // title
    document.getElementById("title").value = briefing["title"];

    // max oral
    document.getElementById("oral_mark").value = briefing["maxoral"];

    // max total
    document.getElementById("total_mark").value = briefing["maxtotal"];

    // due date
    var dateInput = document.getElementById("date");
    let date = new Date(briefing["ddate"]);
    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
    dateInput.value = date.toISOString().slice(0, 10);

    // due time
    var timeInput = document.getElementById("time");
    let time = new Date(briefing["ddate"]).toTimeString().substring(0, 5);
    timeInput.value = date.toISOString().slice(11, 16);;

    // course
    let courseId = briefing["course"];
    let courseTitle = courses.find(c => c.id == courseId)["title"];
    let courseStream = streams.find(s => s.id == (courses.find(c => c.id == courseId)["stream"]))["stream"];
    let courseType = types.find(t => t.id == (courses.find(c => c.id == courseId)["type"]))["type"];

    let option = document.createElement("option");
    option.text = courseTitle + "-" + courseStream + "-" + courseType;
    option.selected = true;
    var courseInput = document.getElementById("course");
    courseInput.add(option);


    // is project
    if (briefing["isproject"]) {
        document.getElementById("grp").checked = true;
    } else {
        document.getElementById("ind").checked = true;
    }

    // description
    document.getElementById("description").value = briefing["description"];
});

function commitBriefing() {
    if (briefingCheck()) {
        var briefings = getBriefings();
        var briefing = briefings.find(b => b.id == document.forms["form"]["id"].value);

        briefing["title"] = document.forms["form"]["title"].value;
        briefing["maxoral"] = parseInt(document.forms["form"]["oral_mark"].value);
        briefing["maxtotal"] = parseInt(document.forms["form"]["total_mark"].value);
        briefing["ddate"] = new Date(document.forms["form"]["date"].value + " " + document.forms["form"]["time"].value);
        briefing["description"] = document.forms["form"]["description"].value;

        setBriefings(briefings);
        window.open("briefings-list.html", "_self");
    }
}

function cancel() {
    window.open("briefings-list.html", "_self");
}