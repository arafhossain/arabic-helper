import { useState, useEffect } from "react";
import "./PracticeTimer.css";

export default function PracticeHeader() {
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (!timerOn) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerOn(false);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerOn]);

  const startSession = () => {
    setTimeLeft(5 * 60);
    setTimerOn(true);
  };

  const endSession = () => {
    setTimerOn(false);
    setTimeLeft(5 * 60);
  };
  return (
    <div className={`practice-header ${timerOn ? "sticky" : ""}`}>
      <div className="header-inner">
        <span className="timer">⏱ {formatTime(timeLeft)}</span>
        {!timerOn && (
          <button onClick={startSession} className="end-button">
            Start
          </button>
        )}
        {timerOn && (
          <button onClick={endSession} className="end-button">
            End
          </button>
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
