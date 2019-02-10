// Adapted from https://gist.github.com/electricg/4372563

// global variables
let startTime = 0;
let lapTime = 0;
let timer = 0;
const clockElement = document.querySelector('.clock');


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
  let resultStr = String(value);
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

function stop() {
  // Writing in if else conditional here
  if (startTime) {
    lapTime = lapTime + getTimeNow() - startTime;
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
    startTime = lapTime = 0;
    update();
  }
}

function stopwatchTime() {
  if (startTime) {
    return lapTime + getTimeNow() - startTime;
  } else {
    return lapTime;
  }
}

function getTimeNow() {
  return Date.now();
}