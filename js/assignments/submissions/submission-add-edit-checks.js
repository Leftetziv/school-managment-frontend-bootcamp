function SubmissionCheck() {
    let isOk = true;
    let briefings = getBriefings();


    // unselected briefing

    var briefingId = document.getElementById("briefing").value;
    let brError = document.getElementById("briefing-error");
    if (briefingId == "") {
        brError.innerHTML = "Select a briefing";
        isOk = false;
    } else {
        brError.innerHTML = "";
    }


    //max total mark bigger than max oral mark check
    let oral = document.querySelector("#oral_mark");
    let total = document.querySelector("#total_mark");
    let oralError = document.getElementById("oral_error");
    let totalError = document.getElementById("total_error");
    totalError.innerHTML = "";

    if (oral.value - total.value > 0) {
        totalError.innerHTML += "Total mark must be bigger than oral mark\n";
        isOk = false;
    }

    // oral mark less that max oral mark check
    var briefing = briefings.find(b => b.id == briefingId);
    if (oral.value - briefing["maxoral"] > 0) {
        oralError.innerHTML = "Oral mark must be smaller than the max oral mark of the briefing";
        isOk = false;
    } else {
        oralError.innerHTML = "";
    }

    if (total.value - briefing["maxtotal"] > 0) {
        totalError.innerHTML += "Total mark must be smaller than the max total mark of the briefing";
        isOk = false;
    }

    if (isOk) {
        totalError.innerHTML = "";
    }

    return isOk;
}