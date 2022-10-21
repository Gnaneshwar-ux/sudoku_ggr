import React from "react";

import "./message.css";

export default function Levelup(props) {
  var msg = <></>;
  if (props.state) {
    msg = (
      <div className="message">
        <span className="text">Successfully solved Level - {props.level} </span>
        <br />
        <span className="text">Time to Level Up 🥳</span>
        <button type="submit" className="go" onClick={() => props.onContinue()}>
          Continue
        </button>
      </div>
    );
  } else {
    msg = (
      <div className="message">
        <span className="text">Successfully solved Level - {props.level} </span>
        <br />
        <span className="text">Time to work hard to level up 👏</span>
        <button type="submit" className="go" onClick={() => props.onContinue()}>
          Retry
        </button>
      </div>
    );
  }
  return <div className="levelup">{msg}</div>;
}
