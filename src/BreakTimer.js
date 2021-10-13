import React from "react";

function BreakTimer({ breakDuration, minutesToDuration, isTimerRunning, handleDecreaseBreak, handleIncreaseBreak }) {

return (
<div className="input-group input-group-lg mb-2">
<span className="input-group-text" data-testid="duration-break">
  {/* TODO: Update this text to display the current break session duration */}
  Break Duration: {minutesToDuration(breakDuration)}
</span>
<div className="input-group-append">
  {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
  <button
    type="button"
    disabled={isTimerRunning}
    className="btn btn-secondary"
    data-testid="decrease-break"
    onClick={handleDecreaseBreak}
  >
    <span className="oi oi-minus" />
  </button>
  {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
  <button
    type="button"
    disabled={isTimerRunning}
    className="btn btn-secondary"
    data-testid="increase-break"
    onClick={handleIncreaseBreak}
  >
    <span className="oi oi-plus" />
  </button>
</div>
</div>
)
}

export default BreakTimer;