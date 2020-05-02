var input = document.getElementById("input");
var inputBTN = document.getElementById("inputBTN");
var tasksList = document.getElementById("tasklist");
var taskSelector = document.getElementById("taskSelect");
var time = document.getElementById("timeTracker");


var timeStart;
var timeEnd;
var timeTracked;
var timerInterval;

var isTrackingTime = false;

function addElement(parent, newElement, text, addID) {
    var element = document.createElement(newElement);
    element.appendChild(document.createTextNode(text));
    parent.appendChild(element);
    element.setAttribute("id", addID);
    return element;
}

function addBtn(parent, btnText, addID, f) {
    if (parent !== null && parent !== undefined) {
        addElement(parent, "button", btnText, addID).addEventListener("click", f);
    }
}

function deleteElement(element) {
    element.parentElement.removeChild(element);
}

function addTask() {
    var taskID = "id_" + input.value;
    addElement(tasksList, "li", input.value, taskID);
    addElement(taskSelector, "option", input.value);
    input.value = "";
}

function startTimeTrack() {
    if (!isTrackingTime) {
        timeStart = new Date().getTime();
        isTrackingTime = true;
        addBtn(time, "Stop Tracking", "stopTimer", stopTimeTrack);
        addElement(time, "h2", getTrackedTime(timeTracked), "timeDisplay");
        timerInterval = setInterval(updateTime, 1000);
    }
}

function stopTimeTrack() {
    if (isTrackingTime) {
        timeEnd = new Date().getTime();
        isTrackingTime = false;
        var stopBtn = document.getElementById("stopTimer");
        clearInterval(timerInterval);
        deleteElement(document.getElementById("timeDisplay"));
        deleteElement(stopBtn);
        printTrackingtime()
    }
}

function getTrackedTime(timeTracked) {

    var hours = Math.floor((timeTracked % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeTracked % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeTracked % (1000 * 60)) / 1000);

    return timeString = "hours: " + hours + " | " + "minutes: " + minutes + " | " + "seconds: " + seconds;
}

function printTrackingtime() {
    timeTracked = timeEnd - timeStart;
    if (tasksList.children.length > 0) {
        var taskInList = document.getElementById("id_" + taskSelector.value);
        addElement(taskInList, "p", getTrackedTime(timeTracked), "taskTimePrint");
    }
}

function updateTime() {
    var timeDisplay = document.getElementById("timeDisplay");
    if (isTrackingTime && timeDisplay !== null) {
        timeEnd = new Date().getTime();
        timeTracked = timeEnd - timeStart;
        timeDisplay.innerHTML = getTrackedTime(timeTracked);
        console.log(getTrackedTime(timeTracked));
    }
}

function taskKeyPress(event) {
    if (input.value.length > 0 && event.keyCode === 13) {
        addTask();
    }
}

function taskBTN() {
    if (input.value.length > 0) {
        addTask();
    }
}

inputBTN.addEventListener("click", taskBTN);


input.addEventListener("keypress", taskKeyPress);

if (!isTrackingTime) {
    addBtn(time, "Track Time", "startTimer", startTimeTrack);
}

