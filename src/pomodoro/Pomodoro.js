import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";
import FocusTimer from "../FocusTimer";
import BreakTimer from "../BreakTimer";
import PlayStopButtons from "../PlayStopButtons";
import DisplayTimerBar from "../DisplayTimerBar";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [progressBarCalc, setprogressBarCalc] = useState(0);
 
  const [session, setSession] = useState(null);

  const [focusDuration, setfocusDuration] = useState(25);
  const [breakDuration, setbreakDuration] = useState(5);


  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/2386.mp3").play();
        setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);
    
    if(session.label === "Focusing"){
      setprogressBarCalc(((focusDuration*60) - session.timeRemaining) / (focusDuration*60) * 100);
   
    } else{
      setprogressBarCalc(((breakDuration*60) - session.timeRemaining) / (breakDuration*60) * 100);
     
    }
  },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => {
      console.log(prevState)
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {

    
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const handleIncreaseFocus = () => {
   
      setfocusDuration((lastFocusDuration) => Math.min(60, lastFocusDuration + 5));
  };

  const handleDecreaseFocus = () => {

    setfocusDuration((lastFocusDuration) => Math.max(5, lastFocusDuration - 5));
  };

  const handleDecreaseBreak = () => {
 
    setbreakDuration((lastbreakDuration) => Math.max(1, lastbreakDuration - 1));
  };

  const handleIncreaseBreak = () => {
  
    setbreakDuration((lastbreakDuration) => Math.min(15, lastbreakDuration + 1));
  };

  const handleStopButton = () => {
    setSession(null);
    setIsTimerRunning(false);
  };

  const displayPaused = () => {
    if(!isTimerRunning){
      return "PAUSED"
    }
  };
   
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusTimer
          focusDuration={focusDuration}
          minutesToDuration={minutesToDuration}
          isTimerRunning={isTimerRunning}
          handleDecreaseFocus={handleDecreaseFocus}
          handleIncreaseFocus={handleIncreaseFocus}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <BreakTimer
            breakDuration={breakDuration}
            minutesToDuration={minutesToDuration}
            isTimerRunning={isTimerRunning}
            handleDecreaseBreak={handleDecreaseBreak}
            handleIncreaseBreak={handleIncreaseBreak}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <PlayStopButtons
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            handleStopButton={handleStopButton}
          />
        </div>
      </div>
      <DisplayTimerBar
      minutesToDuration={minutesToDuration}
      secondsToDuration={secondsToDuration}
      focusDuration={focusDuration}
      breakDuration={breakDuration}
      session={session}
      isTimerRunning={isTimerRunning}
      progressBarCalc={progressBarCalc}
      />
    </div>
  );
}

export default Pomodoro;
