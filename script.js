let timer;
let running = false;
let startTime;
let currentTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
  if (!running) {
    start();
  } else {
    stop();
  }
}

function start() {
  running = true;
  document.getElementById('startStop').innerHTML = 'Stop';
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateTime, 10);
}

function stop() {
  running = false;
  document.getElementById('startStop').innerHTML = 'Start';
  clearInterval(timer);
}

function updateTime() {
  currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);
  document.getElementById('display').innerHTML = 
    pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}

function lapReset() {
  if (running) {
    let lapTime = currentTime - startTime;
    laps.push(lapTime);
    displayLaps();
  } else {
    reset();
  }
}

function displayLaps() {
  let lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    let li = document.createElement('li');
    li.textContent = 'Lap ' + (index + 1) + ': ' + formatTime(lap);
    lapsList.appendChild(li);
  });
}

function reset() {
  running = false;
  clearInterval(timer);
  document.getElementById('startStop').innerHTML = 'Start';
  elapsedTime = 0;
  displayTime(elapsedTime);
  laps = [];
  displayLaps();
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

function formatTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);
  return pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
}
