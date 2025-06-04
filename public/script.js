/* Authour : Naseem Qurbanali */

let startTime = 0;
let timmerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startbtn = document.getElementById('start');
const pausebtn = document.getElementById('pause');
const resetbtn = document.getElementById('reset');
const modeToggle = document.getElementById('modeToggle');

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

startbtn.onclick = () => {
    if (!isRunning) {
        startTime = Date.now() -( timmerInterval ? Date.now() - starTime : 0);
        timmerInterval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
}

pausebtn.onclick = () => {
    clearInterval(timmerInterval);
    timmerInterval = null;
    isRunning = false;
}

resetbtn.onclick = () => {
    clearInterval(timmerInterval);
    timmerInterval = null;
    isRunning = false;
    startTime = 0;
    timerDisplay,textContent = "00:00:00"
}

modeToggle.onchange = () =>  {
    document.body.classList.toggle('dark', modeToggle.checked);
}