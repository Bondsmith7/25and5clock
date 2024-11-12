import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faArrowUp, faArrowDown, faRotateRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function Clock() {

  let time;
  let isTimeOn = false;
  let breakLength = 5 * 60;
  let sessionLength = 25 * 60;
  let sec = sessionLength;
  let isBreak = false;
  let isMenuShowing = false;

  //format sec variable
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get minutes
    const remainingSeconds = seconds % 60; // Get seconds

    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    document.getElementById('time-left').innerText = formatTime(sec);
    document.getElementById('break-length').innerText = parseInt(breakLength / 60);
    document.getElementById('session-length').innerText = parseInt(sessionLength / 60);
    document.getElementById('timer-label').innerText ="Time To GRIND!!!";
  })

  //setBreakAndSessionLength
  const setBreakAndSessionLength = (isSesh, isInc) => {
    if (isSesh) {
      if (isInc) {
        if (sessionLength >= (60 * 60)) {
          return;
        } else {
          sessionLength += 60;
          document.getElementById('session-length').innerText = parseInt(sessionLength / 60);
        }
      } else {
        if (sessionLength <= (1 * 60)) {
          return;
        } else {
          sessionLength -= 60;
          document.getElementById('session-length').innerText = parseInt(sessionLength / 60);
        }
      }
    } else {
      if (isInc) {
        if (breakLength >= (60 * 60)) {
          return;
        } else {
          breakLength += 60;
          document.getElementById('break-length').innerText = parseInt(breakLength / 60);
        }
      } else {
        if (breakLength <= (1 * 60)) {
          return;
        } else {
          breakLength -= 60;
          document.getElementById('break-length').innerText = parseInt(breakLength / 60);
        }
      }
    }
    if (isBreak) {
      sec = breakLength;
    } else {
      sec = sessionLength;
    }
    document.getElementById('time-left').innerText = formatTime(sec);
  };

  //function to play when timer reaches 0; play alarm, switch isBreak and start countdown again
  const alarmAndSwitch = () => {
    clearInterval(time);
    document.getElementById("beep").play();
    setTimeout(() => {
      document.getElementById("beep").pause(); // Pause the audio after 7 seconds
      document.getElementById("beep").currentTime = 0; // Optional: Reset the audio to the start
    }, 5000);
    isTimeOn = !isTimeOn;
    isBreak = !isBreak;
    if (isBreak) {
      sec = breakLength;
      document.getElementById('timer-label').innerText = "BREAK TIME!";
    } else {
      sec = sessionLength;
      document.getElementById('timer-label').innerText = "Time To GRIND!!!";
    }

    document.getElementById('time-left').innerText = formatTime(sec);
    startStopTimer();
  };

  //sets how long the timer should be
  const startStopTimer = () => {
    if (isTimeOn) {
      clearInterval(time);
    } else {
      time = setInterval(() => {
        document.getElementById('time-left').innerText = formatTime(sec);
        if (sec === 0) {
          alarmAndSwitch();
          return;
        }
        sec--;
      }, 1000);
    }
    isTimeOn = !isTimeOn;
  };

  //reset func: setbreaklength, setsessionlength
  const reset = () => {
    breakLength = 5 * 60;
    sessionLength = 25 * 60;
    sec = sessionLength;
    isBreak = false;
    document.getElementById('time-left').innerText = formatTime(sec);
    document.getElementById('break-length').innerText = parseInt(breakLength / 60);
    document.getElementById('session-length').innerText = parseInt(sessionLength / 60);
    isTimeOn = false;
    document.getElementById('timer-label').innerText = "Time To GRIND!!!";
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(time);
  };

  const changeSound = (newAlarmSrc) => {
    document.getElementById("beep").src = newAlarmSrc;
  }

  const showMenu = () => {
    if(isMenuShowing){
      document.getElementById("menu").style.display = "none";
    } else {
      document.getElementById("menu").style.display = "flex";
    }
    isMenuShowing = !isMenuShowing;
  }


  return (
    <div>
      <button id="menu-button" onClick={showMenu}><FontAwesomeIcon icon={faBars} /></button>
      <div id="menu">
        <button id="bugle" className="menu-buttons" onClick={() => changeSound("https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg")}>Bugle</button>
        <button id="dinnerBell" className="menu-buttons" onClick={() => changeSound("https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg")}>Dinner</button>
        <button id="ringingBell" className="menu-buttons" onClick={() => changeSound("https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg")}>Ringing</button>
        <button id="stream" className="menu-buttons" onClick={() => changeSound("https://actions.google.com/sounds/v1/water/small_stream_flowing.ogg")}>Stream</button>
      </div>
      <h1>25+5 Clock</h1>
      <div id='break-and-session'>
        <div className='column'>
          <div id="break-label">Break Length</div>
          <div className="row">
            <button id="break-decrement" onClick={() => setBreakAndSessionLength(false, false)}><FontAwesomeIcon icon={faArrowDown} /></button>
            <div id="break-length" className="num"></div>
            <button id="break-increment" onClick={() => setBreakAndSessionLength(false, true)}><FontAwesomeIcon icon={faArrowUp} /></button>
          </div>
        </div>
        <div className='column'>
          <div id="session-label">Session Length</div>
          <div className="row">
            <button id="session-decrement" onClick={() => setBreakAndSessionLength(true, false)}><FontAwesomeIcon icon={faArrowDown} /></button>
            <div id="session-length" className="num"></div>
            <button id="session-increment" onClick={() => setBreakAndSessionLength(true, true)}><FontAwesomeIcon icon={faArrowUp} /></button>
          </div>
        </div>
      </div>
      <div>
        <label id="timer-label"></label>
        <div id="time-left" className="num"></div>
        <button id="start_stop" onClick={startStopTimer}><FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} /></button>
        <button id="reset" onClick={reset}><FontAwesomeIcon icon={faRotateRight} /></button>
      </div>
      <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg" preload="auto" />
    </div>
  );
}

export default Clock;
