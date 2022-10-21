import React from "react";

import "./message.css";

export default function Replay(props) {
  return (
    <div className="levelup">
      <div className="message">
        <span className="text alert">
          you have reached the limit of wrong attempts
        </span>
        <br />
        <span className="text">Your level will not upgrade 😣</span>
        <button type="submit" className="go" onClick={() => props.onContinue()}>
          Continue
        </button>
        <button type="submit" className="retry" onClick={() => props.onRetry()}>
          Retry
        </button>
      </div>
    </div>
  );
}
