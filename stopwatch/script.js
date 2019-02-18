// Adapted from https://gist.github.com/electricg/4372563

// global variables
let startTime = 0;
let pauseTime = 0;
let timer = 0;
const clockElement = document.querySelector('.clock');
const listElement = document.querySelector('#lap-timings');


function formatTime(time) {
  // Define many variables in one line!
	let h = m = s = ms = 0;
	let newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

  // could teach string interpolation here as well
	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

function pad(value, size) {
  // Implement for/while loops here!
  let resultStr = String(value); // convert Number to String
  let counter = size - resultStr.length;
  while (counter > 0) {
    counter -= 1;
    resultStr = '0' + resultStr;
  }
  return resultStr;
}

function start() {
  timer = setInterval(update, 1);
  // teach about ternary operator
  startTime = startTime ? startTime : getTimeNow();
}

function lap() {
  // prevent lap from being run if its stopped or 0
  if (!startTime) {
    return;
  }
  const lapTime = formatTime(stopwatchTime());
  addListEntry(lapTime);
  startTime = getTimeNow();
  pauseTime = 0;
}

function stop() {
  // Writing in if else conditional here
  if (startTime) {
    pauseTime = pauseTime + getTimeNow() - startTime;
  }
  // remember to clear the interval we set
  clearInterval(timer);
  startTime = 0;
}

function update() {
  clockElement.innerHTML = formatTime(stopwatchTime());
}

function reset() {
  // if running, don't do anything
  if (!startTime) {
    startTime = pauseTime = 0;
    update();
  }
  // remove all lap times
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}

function stopwatchTime() {
  if (startTime) {
    return pauseTime + getTimeNow() - startTime;
  } else {
    return pauseTime;
  }
}

function getTimeNow() {
  return Date.now();
}

// ES6 Arrow functions
const addListEntry = (lapTime) => {
  const listEntry = document.createElement('li');
  listEntry.innerHTML = lapTime;
  listElement.appendChild(listEntry);
};