import React from "react";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className={props.cls}>{props.output}</div>
      <div className="incorrect">{props.wrong}</div>
      <div className="score">{props.score}</div>
    </div>
  );
}