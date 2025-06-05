/* Authour : Naseem Qurbanali */

let startTime = 0;
let elapsed = 0;
let timmerInterval = null;
let isRunning = false;
let isPomodor = false;
let pomodorMode = "work";


const work_duration = 25 * 60 * 1000;
const break_duration = 5 * 60 * 1000;
const timerDisplay = document.getElementById('timer');
const startbtn = document.getElementById('start');
const pausebtn = document.getElementById('pause');
const resetbtn = document.getElementById('reset');
const modeToggle = document.getElementById('modeToggle');
const pomodorBtn = document.getElementById("pomodoro");


/* Time formater*/
function formatTime(ms) {
    let totalSeconds = Math.floor(ms/1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor(hrs % 3600) / 60).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${minutes}:${seconds}`;
}

function updateDisplay() {
    const elapsed = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsed);
}

function startTimer( duration = null) {
    startTime = Date.now() - elapsed;
    timmerInterval = setInterval(() => {
        elapsed = Date.now() - startTime;
        if (isPomodor) {
            const limit = pomodorMode === "work" ? work_duration : break_duration;
            if (elapsed >= limit) {
                clearInterval(timmerInterval);
                isRunning = false;
                alert(pomodorMode === "work" ? "Time for a break!" : "Back to work!");
                switchPomodoroMode();
                return;
            }
        }
        timerDisplay.textContent = formatTime(elapsed);
    }, 1000);
    isRunning = true;
    pausebtn.innerHTML = "Pause";
}

function switchPomodoroMode () {
    elapsed = 0;
    pomodorMode = pomodorMode === "work" ? "break" : "work";
    startTimer();
}

function pauseTimer() {
    clearInterval(timmerInterval);
    isRunning = false;
    pausebtn.innerHTML = "Unpause";
}

startbtn.onclick = () => {
    if (!isRunning && elapsed === 0) {
        startTimer();
    }
}

pausebtn.onclick = () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}


function resetTimer() {
    clearInterval(timmerInterval);
    timmerInterval = null;
    startTime = 0;
    elapsed = 0;
    isRunning= false;
    timerDisplay.innerHTML = "00:00:00";
    pausebtn.innerHTML = "Pause";
    if (isPomodor) pomodorMode = "work";
}

resetbtn.onclick = resetTimer;

pomodorBtn.onclick = () => {
    resetTimer();
    isPomodor = !isPomodor;
    pomodorBtn.innerHTML = isPomodor ? "Pomodor: On" : "Pomodor: OFF";
};

modeToggle.onchange = () =>  {
    document.body.classList.toggle('dark', modeToggle.checked);
}