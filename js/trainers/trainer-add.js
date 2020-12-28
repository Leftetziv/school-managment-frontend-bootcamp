document.addEventListener("DOMContentLoaded", function () {
    var subjects = getSubjects();

    // subjects
    var subjectInput = document.getElementById("subject");

    for (var i = 0; i < subjects.length; i++) {
        let typeOption = document.createElement("option");
        typeOption.value = subjects[i]["id"];
        typeOption.text = subjects[i]["subject"];
        subjectInput.add(typeOption);
    }
});

function commitTrainer() {
    if (trainerCheck()) {
        var trainers = getTrainers();
        var trainer = new Object();

        trainer["id"] = trainers.length + 1;
        trainer["fname"] = document.forms["form"]["fname"].value;
        trainer["lname"] = document.forms["form"]["lname"].value;
        trainer["subject"] = parseInt(document.forms["form"]["subject"].value);

        trainers[trainers.length] = trainer;

        setTrainers(trainers);
        window.open("trainers-list.html", "_self");
    }
}

function cancel() {
    window.open("trainers-list.html", "_self");
}