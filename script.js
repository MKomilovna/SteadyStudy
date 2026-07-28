// ======================================
// SteadyStudy v1.0
// Part 1
// ======================================

// ---------- Elements ----------

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const category = document.getElementById("category");

const goalInput = document.getElementById("goalInput");
const goalText = document.getElementById("goalText");
const saveGoal = document.getElementById("saveGoal");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const today = document.getElementById("today");
const quote = document.getElementById("quote");

const streak = document.getElementById("streak");

const themeBtn = document.getElementById("themeBtn");

// ---------- Date ----------

today.textContent =
new Date().toDateString();

// ---------- Quotes ----------

const quotes = [

"✨ Small progress every day leads to big success.",

"🇰🇷 Korea is waiting for you.",

"🚀 Dream big. Study every day.",

"📚 Knowledge changes your future.",

"💜 Never give up.",

"🎓 Every study session matters."

];

quote.textContent =
quotes[Math.floor(Math.random()*quotes.length)];

// ---------- Goal ----------

goalText.textContent =
localStorage.getItem("goal") || "";

saveGoal.onclick = function(){

    goalText.textContent =
    goalInput.value;

    localStorage.setItem(
        "goal",
        goalInput.value
    );

    goalInput.value="";

};

// ---------- Theme ----------

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.textContent="☀ Light";

    }else{

        themeBtn.textContent="🌙 Dark";

    }

};

// ---------- Task Button ----------

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

addTask();

}

});
// ======================================
// Tasks
// ======================================

function addTask(){

    const task = taskInput.value.trim();

    if(task === ""){

        alert("Please enter a task.");

        return;

    }

    const li = document.createElement("li");

    const span = document.createElement("span");

    span.textContent =
    category.value + " • " + task;

    span.onclick = function(){

        span.classList.toggle("completed");

        successSound.play();

        updateProgress();

        saveTasks();

    };

    const del = document.createElement("button");

    del.textContent = "Delete";

    del.onclick = function(){

        li.remove();

        deletesound.play();

        updateProgress();

        saveTasks();

    };

    li.appendChild(span);

    li.appendChild(del);

    taskList.appendChild(li);

    clickSound.play(); 

    taskInput.value = "";

    updateProgress();

    saveTasks();

}

// ======================================
// Save Tasks
// ======================================

function saveTasks(){

    localStorage.setItem(

        "tasks",

        taskList.innerHTML

    );

}

// ======================================
// Load Tasks
// ======================================

function loadTasks(){

    const saved = localStorage.getItem("tasks");

    if(saved){

        taskList.innerHTML = saved;

    }

    document
    .querySelectorAll("#taskList span")
    .forEach(function(span){

        span.onclick = function(){

            span.classList.toggle("completed");

            successSound.play();

            updateProgress();

            saveTasks();

        };

    });

    document
    .querySelectorAll("#taskList button")
    .forEach(function(btn){

        btn.onclick = function(){

            btn.parentElement.remove();

            updateProgress();

            saveTasks();

        };

    });

}

// ======================================
// Progress
// ======================================

function updateProgress(){

    const total =
    document.querySelectorAll("#taskList li").length;

    const completed =
    document.querySelectorAll(".completed").length;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    let percent = 0;

    if(total > 0){

        percent = completed / total * 100;

    }

    progress.style.width =
    percent + "%";

    progressText.textContent =
    completed + " / " + total + " Completed";

}
// ======================================
// Pomodoro Timer
// ======================================

let time = 25 * 60;
let timerInterval;

const timer = document.getElementById("timer");

function updateTimer(){

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    timer.textContent =
        String(minutes).padStart(2,"0") +
        ":" +
        String(seconds).padStart(2,"0");

}

updateTimer();

document.getElementById("startBtn").onclick = function(){

    clearInterval(timerInterval);

    timerInterval = setInterval(function(){

        if(time > 0){

            time--;

            updateTimer();

        }else{

            clearInterval(timerInterval);

            alert("🎉 Pomodoro Finished!");

        }

    },1000);

};

document.getElementById("pauseBtn").onclick = function(){

    clearInterval(timerInterval);

};

document.getElementById("resetBtn").onclick = function(){

    clearInterval(timerInterval);

    time = 25 * 60;

    updateTimer();

};

// ======================================
// Vocabulary
// ======================================

const wordInput = document.getElementById("wordInput");
const addWordBtn = document.getElementById("addWordBtn");
const wordList = document.getElementById("wordList");

addWordBtn.onclick = function(){

    const word = wordInput.value.trim();

    if(word === "") return;

    const li = document.createElement("li");

    li.textContent = word;

    wordList.appendChild(li);

    wordInput.value = "";

    updateAnalytics();

};

// ======================================
// Calendar
// ======================================

const studyDate = document.getElementById("studyDate");
const calendarTask = document.getElementById("calendarTask");
const saveDateTask = document.getElementById("saveDateTask");
const calendarList = document.getElementById("calendarList");

saveDateTask.onclick = function(){

    if(studyDate.value === "" || calendarTask.value === "") return;

    const li = document.createElement("li");

    li.textContent =
        studyDate.value + " — " + calendarTask.value;

    calendarList.appendChild(li);

    studyDate.value = "";
    calendarTask.value = "";

};

// ======================================
// Analytics
// ======================================

function updateAnalytics(){

    document.getElementById("analyticsTasks").textContent =
        document.querySelectorAll("#taskList li").length;

    document.getElementById("analyticsWords").textContent =
        document.querySelectorAll("#wordList li").length;

    const total =
        document.querySelectorAll("#taskList li").length;

    const completed =
        document.querySelectorAll(".completed").length;

    const percent =
        total === 0 ? 0 : Math.round(completed / total * 100);

    document.getElementById("analyticsProgress").textContent =
        percent + "%";

}

setInterval(updateAnalytics,1000);

// ======================================
// Day Streak
// ======================================

let streakValue = localStorage.getItem("streak");

if(!streakValue){

    streakValue = 1;

    localStorage.setItem("streak",1);

}

streak.textContent = streakValue;

// ======================================
// Countdown
// ======================================

// Укажешь здесь дату экзамена
const examDate = new Date("2027-09-15");

function updateCountdown(){

    const today = new Date();

    const diff = examDate - today;

    const days =
        Math.ceil(diff / (1000*60*60*24));

    const countdown =
        document.getElementById("countdown");

    if(countdown){

        countdown.textContent =
            days + " days left until GKS";

    }

}

updateCountdown();

// ======================================
// Start
// ======================================

loadTasks();

updateProgress();

updateAnalytics();