import React from "react";

function DisplayTimerBar({ minutesToDuration, secondsToDuration, focusDuration, breakDuration, session, isTimerRunning, progressBarCalc }) {


    const displayPaused = () => {
        if(!isTimerRunning){
          return "PAUSED"
        }
      };

  return(
   <div>
    {session && (<div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {session.label} for {session.label === "Focusing" ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)} minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(session.timeRemaining)} remaining
            </p>
            <h2>{displayPaused()}</h2>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBarCalc} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressBarCalc}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>)}
   </div>
  )
}

export default DisplayTimerBar;