import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <h1>SUDOKU - L{props.level}</h1>
    </div>
  );
}
