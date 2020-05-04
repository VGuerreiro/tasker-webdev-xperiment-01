var input = document.getElementById("input");
var inputBTN = document.getElementById("inputBTN");
var tasksList = document.getElementById("tasklist");
var taskSelector = document.getElementById("taskSelect");
var time = document.getElementById("timeTracker");
var trackerSection = document.getElementById("timeTracker");

var timeStart;
var timeEnd;
var timeTracked;
var timerInterval;

var isTrackingTime = false;
var isTaskDone = false;

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function addElement(parent, newElement, text, addID, addClass) {
    var element = document.createElement(newElement);
    element.appendChild(document.createTextNode(text));
    parent.appendChild(element);
    element.setAttribute("id", addID);
    element.classList.add(addClass);
    return element;
}

function deleteElement(element) {
    element.parentElement.removeChild(element);
}

function addBtn(parent, btnText, addID, f) {
    if (parent !== null && parent !== undefined) {
        addElement(parent, "button", btnText, addID).addEventListener("click", f);
    }
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function addTask() {
    var taskID = "id_" + input.value;
    var task = addElement(tasksList, "li", input.value, taskID, "task");
    var taskOption = addElement(taskSelector, "option", input.value, taskID + "_opt");

    task.addEventListener("click", toggleTaskDone);
    taskOption.setAttribute("selected", "");

    input.value = "";
}

function toggleTaskDone(event) {
    var targetTask = event.target;

    targetTask.classList.toggle("task-done");
    isTaskDone = !isTaskDone;

    targetTask.addEventListener("dblclick", deleteTask);
}

function deleteTask(event) {
    var targetTask = event.target;
    var taskInSelect = document.getElementById(targetTask.id + "_opt");

    deleteElement(targetTask);
    deleteElement(taskInSelect);
}

function startTimeTrack() {
    if (tasksList.children.length <= 0) {
        alert("Plesse add a new task to track.")
    }
    if (!isTrackingTime && tasksList.children.length > 0) {
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
        printTrackingtime();
    }
}

function getTrackedTime(timeTracked) {
    var hours = Math.floor((timeTracked % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeTracked % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeTracked % (1000 * 60)) / 1000);

    return timeString = "hours: " + hours + " | " + "minutes: " + minutes + " | " + "seconds: " + seconds;
}

function printTrackingtime() {
    var taskid = "id_" + taskSelector.value;
    var taskInList = document.getElementById(taskid);
    var timeTrackInTask = taskInList.firstElementChild;

    if (tasksList.children.length > 0) {
        if (timeTrackInTask !== null) {
            //TODO: add timeTracked to the value already tracked - math isn't working!!!
            timeTracked += timeEnd - timeStart;
            timeTrackInTask.textContent = getTrackedTime(timeTracked);
        }
        else {
            timeTracked = timeEnd - timeStart;
            addElement(taskInList, "p", getTrackedTime(timeTracked), "taskTimePrint");
        }
    }
}

function updateTime() {
    var timeDisplay = document.getElementById("timeDisplay");
    if (isTrackingTime && timeDisplay !== null) {
        timeEnd = new Date().getTime();
        timeTracked = timeEnd - timeStart;
        timeDisplay.textContent = getTrackedTime(timeTracked);
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

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

inputBTN.addEventListener("click", taskBTN);

input.addEventListener("keypress", taskKeyPress);

if (!isTrackingTime) {
    addBtn(time, "Track Time", "startTimer", startTimeTrack);
}

