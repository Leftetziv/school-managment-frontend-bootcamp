function trainerCheck() {
    var isOk = true;

    // empty fname check
    var fname = document.querySelector("#fname");
    if (isEmpty(fname)) {
        let error = fname.nextElementSibling;
        error.innerHTML = "Can not be empty";
        isOk = false;
    } else {
        let error = fname.nextElementSibling;
        error.innerHTML = "";
    }

    // empty lname check
    var lname = document.querySelector("#lname");
    if (isEmpty(lname)) {
        let error = lname.nextElementSibling;
        error.innerHTML = "Can not be empty";
        isOk = false;
    } else {
        let error = lname.nextElementSibling;
        error.innerHTML = "";
    }


    return isOk;
}

function commitTrainer() {
    if (trainerCheck()) {
        //add/update trainer
    }
}

function cancel() {
    window.open("trainers-list.html", "_self");
}

function cancelToCourse() {
    window.open("../courses/courses-list.html", "_self");
}