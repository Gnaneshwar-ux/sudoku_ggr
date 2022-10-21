import React from "react";

export default function Row(props) {
  const get = (j) => {
    if (j > 0) {
      return j;
    } else {
      return;
    }
  };
  const getCls = (i, j) => {
    let cls = "cell";
    if (props.or[i][j] === -1) {
      cls = "cell error";
    }
    if (i === props.active.i && j === props.active.j) {
      cls += " active";
    }
    if (props.or[i][j] === 1) {
      return "cell original";
    }
    return cls;
  };
  return (
    <div className="row">
      {props.row.map((j, idx) => {
        return (
          <div
            key={idx}
            className={getCls(props.rowIdx, idx)}
            onClick={() => props.handleBox(props.rowIdx, idx)}
          >
            {get(j)}
          </div>
        );
      })}
    </div>
  );
}
