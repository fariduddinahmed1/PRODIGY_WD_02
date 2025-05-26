let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(ms % 1000 / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00";
  running = false;
  laps.innerHTML = '';
}

function recordLap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.appendChild(li);
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
