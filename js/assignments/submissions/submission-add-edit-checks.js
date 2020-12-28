function SubmissionCheck() {
    var isOk = true;

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

function commitSubmission() {
    if (SubmissionCheck()) {
        //add/update submission
    }
}

function cancel() {
    window.open("submissions-list.html", "_self");
}
