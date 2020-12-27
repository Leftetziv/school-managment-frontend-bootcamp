function briefingCheck() {
    var isOk = true;

    // empty title check
    var title = document.querySelector("#title");
    if (isEmpty(title)) {
        let error = title.nextElementSibling;
        error.innerHTML = "Can not be empty";
        isOk = false;
    } else {
        let error = title.nextElementSibling;
        error.innerHTML = "";
    }

    //max total mark bigger than max oral mark check
    var oral = document.querySelector("#oral_mark");
    var total = document.querySelector("#total_mark");

    if (oral.value - total.value > 0) {
        let error = total.nextElementSibling;
        error.innerHTML = "Total mark must be bigger than oral mark";
        isOk = false;
    } else {
        let error = total.nextElementSibling;
        error.innerHTML = "";
    }


    return isOk;
}

function commitBriefing() {
    if (briefingCheck()) {
        //add/update briefing
    }
}

function cancel() {
    window.open("briefings-list.html", "_self");
}
