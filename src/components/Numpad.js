import React from "react";

export default function Numpad(props) {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const get = (v) => {
    if (v === 0) return "X";
    return v;
  };
  return (
    <div className="numpad">
      {a.map((v, i) => {
        return (
          <div
            key={i}
            className={v === 0 ? "number X" : "number"}
            onClick={() => props.onButton(v)}
          >
            {get(v)}
          </div>
        );
      })}
    </div>
  );
}
