const clock = document.getElementById("clock");

const stopwatchDisplay = document.getElementById("stopwatch_display");
const startStopwatch = document.getElementById("startStopwatch");
const loopStopwatch = document.getElementById("loopStopwatch");
const pauseStopwatch = document.getElementById("pauseStopwatch");
const resetStopwatch = document.getElementById("resetStopwatch");
const loopData = document.getElementById("loop_data");

const countdownSettings = document.getElementById("countdown_settings");
const decreaseAction = document.getElementById("decrease_action");
const increaseAction = document.getElementById("increase_action");

const countdownDisplay = document.getElementById("countdown_display");
const startCountdown = document.getElementById("startCountdown");
const pauseCountdown = document.getElementById("pauseCountdown");
const resetCountdown = document.getElementById("resetCountdown");

/**
 * prefixWithZero(2)   // 02
 * prefixWithZero(12)  // 12
 */
function prefixWithZero(num) {
  if (num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

/**
 * prefixWithTwoZero(2)   // 002
 * prefixWithTwoZero(63)  // 063
 * prefixWithTwoZero(138) // 138
 */
function prefixWithTwoZero(num) {
  if (num <= 9) {
    return "00" + num;
  } else if (num <= 99) {
    return "0" + num;
  } else {
    return num;
  }
}

///////////////////////////////////////// CLOCK;
function updateClock() {
  const time = new Date();

  // 1st <p>
  const upper = clock.querySelector("p:nth-of-type(1)");
  // 2nd <p>
  const lower = clock.querySelector("p:nth-of-type(2)");

  // update upper <p> innerHTML
  upper.innerHTML =
    prefixWithZero(time.getDate()) +
    " / " +
    prefixWithZero(time.getMonth()) +
    " / " +
    prefixWithZero(time.getFullYear());

  // update lower <p> innerHTML
  lower.innerHTML =
    time.getHours() +
    ":" +
    prefixWithZero(time.getMinutes()) +
    ":" +
    prefixWithZero(time.getSeconds());
}

updateClock();

setInterval(() => {
  updateClock();
}, 1000);

///////////////////////////////////////// STOPWATCH
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function updateStopwatch() {
  stopwatchDisplay.innerHTML =
    prefixWithZero(hours) +
    ":" +
    prefixWithZero(minutes) +
    ":" +
    prefixWithZero(seconds) +
    ":" +
    prefixWithTwoZero(miliseconds);
  miliseconds = miliseconds + 10;

  if (miliseconds > 999) {
    miliseconds = 0;
    seconds = seconds + 1;
    if (seconds > 59) {
      minutes = minutes + 1;
      seconds = 0;

      if (minutes > 59) {
        hours = hours + 1;
        minutes = 0;
      }
    }
  }
}

updateStopwatch();

let ourInterval = null;

startStopwatch.addEventListener("click", () => {
  if (ourInterval !== null) {
    clearInterval(ourInterval);
  }

  ourInterval = setInterval(() => {
    updateStopwatch();
  }, 10);
});

pauseStopwatch.addEventListener("click", () => {
  clearInterval(ourInterval);
});

resetStopwatch.addEventListener("click", () => {
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  clearInterval(ourInterval);
  updateStopwatch();

  if (loopData.childNodes.length > 0) {
    for (let i = loopData.childNodes.length - 1; i >= 0; i--) {
      const element = loopData.childNodes[i];
      element.remove();
    }
  }
});

loopStopwatch.addEventListener("click", () => {
  const p = document.createElement("p");
  p.innerHTML =
    prefixWithZero(hours) +
    ":" +
    prefixWithZero(minutes) +
    ":" +
    prefixWithZero(seconds) +
    ":" +
    prefixWithTwoZero(miliseconds);

  loopData.appendChild(p);
  p.scrollIntoView();
});

///////////////////////////////////////// COUNTDOWN
let countdownID = null;
let countdownMinutes = 25;
let countdownSeconds = 0;

decreaseAction.addEventListener("click", () => {
  if (countdownMinutes === 1) {
    return;
  }
  countdownMinutes--;
  countdownSettings.innerHTML = `${countdownMinutes} minutes`;
});

increaseAction.addEventListener("click", () => {
  countdownMinutes++;
  countdownSettings.innerHTML = `${countdownMinutes} minutes`;
});

startCountdown.addEventListener("click", () => {
  if (countdownID !== null) {
    clearInterval(countdownID);
  }
  countdownID = setInterval(() => {
    updateCountdown();
  }, 1000);
});

pauseCountdown.addEventListener("click", () => {
  clearInterval(countdownID);
});

resetCountdown.addEventListener("click", () => {
  countdownMinutes = 25;
  countdownSeconds = 0;
  clearInterval(countdownID);
  countdownDisplay.innerHTML = "00:00";
});

function updateCountdown() {
  if (countdownMinutes === 0 && countdownSeconds === 1) {
    clearInterval(countdownID);
  }

  if (countdownSeconds === 0) {
    countdownSeconds = 59;
    countdownMinutes--;
  } else {
    countdownSeconds--;
  }

  countdownDisplay.innerHTML =
    prefixWithZero(countdownMinutes) + ":" + prefixWithZero(countdownSeconds);
}
