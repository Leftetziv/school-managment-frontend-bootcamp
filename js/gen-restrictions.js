function isEmpty(input2) {
    var reg = RegExp('\\w');
    if (reg.test(input2.value)) {
        return false;
    } else {
        return true;
    }
}

function checkEmptyInputText(input) { //will be not used at the end
    if (isEmpty(input)) {
        input.nextElementSibling.innerHTML = "Can not be empty";
    } else {
        input.nextElementSibling.innerHTML = "";
    }
}

