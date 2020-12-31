function studentCheck() {
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

    //tuition fees 0-99999 check
    var fees = document.querySelector("#tuition");
    if (fees.value < 0 || fees.value > 99999) {
        let error = fees.nextElementSibling;
        error.innerHTML = "Tuition fee amount not allowed (1,00-99.999,00)";
        isOk = false;
    } else {
        let error = fees.nextElementSibling;
        error.innerHTML = "";
    }


    return isOk;
}