let inputBox = document.querySelector("#input-box");
let ListContainer = document.querySelector("#list-container");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        ListContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerText = "\u00d7"; // × symbol
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

ListContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// storing the tasks
function saveData() {
    localStorage.setItem("data", ListContainer.innerHTML);
}

function showTask() {
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();

