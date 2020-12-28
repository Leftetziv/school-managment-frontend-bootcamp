document.addEventListener("DOMContentLoaded", function () {
    var trainers = getTrainers();
    var subjects = getSubjects();


    var id = localStorage.getItem('trainerIdToEdit');
    var trainer = trainers.find(t => t.id == id);

    // id
    document.getElementById("id").value = id;

    // first name
    document.getElementById("fname").value = trainer["fname"];

    // last name
    document.getElementById("lname").value = trainer["lname"];

    //subject
    var subjectInput = document.getElementById("subject");
    for (var i = 0; i < subjects.length; i++) {
        let option = document.createElement("option");
        option.value = subjects[i]["id"];
        option.text = subjects[i]["subject"];
        if (option.value == trainer["subject"]) {
            option.selected = true;
        }

        subjectInput.add(option);
    }
});

function commitTrainer() {
    if (trainerCheck()) {
        var trainers = getTrainers();
        var trainer = trainers.find(t => t.id == document.forms["form"]["id"].value);

        trainer["fname"] = document.forms["form"]["fname"].value;
        trainer["lname"] = document.forms["form"]["lname"].value;
        trainer["subject"] = parseInt(document.forms["form"]["subject"].value);

        setTrainers(trainers);
        window.open("trainers-list.html", "_self");
    }
}

function cancel() {
    window.open("trainers-list.html", "_self");
}