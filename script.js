const startTimer = document.querySelector("#start-timer");
const resetTimer = document.querySelector("#reset-timer");
const pauseTimer = document.querySelector("#pause-timer");
const displayMinutes = document.querySelector("#display-minutes");
const displaySeconds = document.querySelector("#display-seconds");

let resetFlag = false;
let isPaused = false;
let timerID;
console.log(timerID, "timerID");

startTimer.addEventListener(
  "click",
  () => {
    console.log("confirming logging");
    startTimer.disabled = true;

    interval(displayMinutes.value, displaySeconds.value);
    // console.log(timerID, "timerID");
  },
  false
);

function interval(minutes, seconds) {
  let setMinutes = parseInt(minutes, 10);
  let setSeconds = parseInt(seconds, 10);
  console.log("confirming it come to interval", setMinutes, setSeconds);
  timerID = setInterval(() => {
    if (resetFlag === true) {
      clearInterval(timerID);
      console.log("interval func reset logging");
      startTimer.disabled = false;
      displayMinutes.value = `10`;
      displaySeconds.value = `00`;
      return;
    }
    if (isPaused === true) {
      clearInterval(timerID);

      displayMinutes.value = setMinutes > 9 ? setMinutes : `0${setMinutes}`;
      displaySeconds.value = setSeconds > 9 ? setSeconds : `0${setSeconds}`;
      return;
    } else {
      if (setSeconds === 0) {
        if (setMinutes === 0) {
          clearInterval(timerID);
          startTimer.disabled = false;
          console.log("done with time limit");
        } else {
          setSeconds = 59;
          setMinutes = setMinutes - 1;
        }
      } else {
        setSeconds = setSeconds - 1;
      }
      displayMinutes.value = setMinutes > 9 ? setMinutes : `0${setMinutes}`;
      displaySeconds.value = setSeconds > 9 ? setSeconds : `0${setSeconds}`;
    }
    resetFlag = false;
  }, 1000);
}

resetTimer.addEventListener("click", () => {
  console.log("at reset timer,resetFlag: ", resetFlag);
  if (timerID === undefined) {
    console.log(timerID, "timerID at reset 65 line");
    return;
  }
  if (resetFlag === true) {
    resetFlag = false;
    return;
  } else {
    resetFlag = true;
    interval(displayMinutes.value, displaySeconds.value);
  }
});

pauseTimer.addEventListener("click", () => {
  console.log("at pause timer,isPaused: ", isPaused);
  isPaused = !isPaused;
  interval(displayMinutes.value, displaySeconds.value);
});
