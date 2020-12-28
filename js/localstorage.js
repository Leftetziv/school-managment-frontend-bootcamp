function setTypes(object) {
    localStorage.setItem("types", JSON.stringify(object));
}

function setStreams(object) {
    localStorage.setItem("streams", JSON.stringify(object));
}

function setSubjects(object) {
    localStorage.setItem("subjects", JSON.stringify(object));
}

function setCourses(object) {
    localStorage.setItem("courses", JSON.stringify(object));
}

function setStudents(object) {
    localStorage.setItem("students", JSON.stringify(object));
}

function setTrainers(object) {
    localStorage.setItem("trainers", JSON.stringify(object));
}

function setBriefings(object) {
    localStorage.setItem("briefings", JSON.stringify(object));
}

function setSubmissions(object) {
    localStorage.setItem("submissions", JSON.stringify(object));
}



function getCourses() {
    return JSON.parse(localStorage.getItem('courses'));
}

function getStreams() {
    return JSON.parse(localStorage.getItem('streams'));
}

function getTypes() {
    return JSON.parse(localStorage.getItem('types'));
}

function getStudents() {
    return JSON.parse(localStorage.getItem('students'));
}