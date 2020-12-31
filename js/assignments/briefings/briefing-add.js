document.addEventListener("DOMContentLoaded", function () {
    var courses = getCourses();
    var types = getTypes();
    var streams = getStreams();

    var courseInput = document.getElementById("course");

    for (var i = 0; i < courses.length; i++) {
        let courseOption = document.createElement("option");
        let courseId = courses[i]["id"];
        let courseTitle = courses.find(c => c.id == courseId)["title"];
        let courseStream = streams.find(s => s.id == (courses.find(c => c.id == courseId)["stream"]))["stream"];
        let courseType = types.find(t => t.id == (courses.find(c => c.id == courseId)["type"]))["type"];

        courseOption.value = courseId;
        courseOption.text = courseTitle + "-" + courseStream + "-" + courseType;
        courseInput.add(courseOption);
    }

});

function commitBriefing() {
    if (briefingCheck()) {
        var briefings = getBriefings();
        var briefing = new Object();

        briefing["id"] = briefings.length + 1;
        briefing["title"] = document.forms["form"]["title"].value;
        briefing["maxoral"] = parseInt(document.forms["form"]["oral_mark"].value);
        briefing["maxtotal"] = parseInt(document.forms["form"]["total_mark"].value);
        briefing["ddate"] = new Date(document.forms["form"]["date"].value + " " + document.forms["form"]["time"].value);
        briefing["description"] = document.forms["form"]["description"].value;
        briefing["isproject"] = document.getElementById("individual").checked ? true : false;
        briefing["course"] = parseInt(document.forms["form"]["course"].value);

        briefings[briefings.length] = briefing;
        setBriefings(briefings);
        
        window.open("briefings-list.html", "_self");
    }
}

function cancel() {
    window.open("briefings-list.html", "_self");
}