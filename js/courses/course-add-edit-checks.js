function addCourse() {
    var title = document.querySelector("#title");
    titleIsEmpty = isEmpty(title);

    // empty title check
    if (titleIsEmpty) {
        let error = title.nextElementSibling;
        error.innerHTML = "Can not be empty"
    }

    // starting date before ending date check
    var sdate = document.querySelector("#sdate");
    var edate = document.querySelector("#edate");

    if (Date.parse(edate.value) < Date.parse(sdate.value)) {
        let error = edate.nextElementSibling;
        error.innerHTML = "Ending date must be after starting date";
    } else {
        let error = edate.nextElementSibling;
        error.innerHTML = "";
    }
}


