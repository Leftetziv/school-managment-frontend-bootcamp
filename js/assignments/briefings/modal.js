window.onclick = function (event) {
    var modal = document.querySelector(".modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal(td) {
    var briefings = getBriefings();
    var id = td.parentNode.parentNode.firstElementChild.firstChild.data;

    document.querySelector(".modal-content p").innerHTML = briefings.find(b => b.id == id)["description"];
    
    var modal = document.querySelector(".modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.querySelector(".modal");
    modal.style.display = "none";
}