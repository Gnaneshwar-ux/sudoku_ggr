import React from "react";

export default function Row(props) {
  const get = (j) => {
    if (j != -1) {
      return j;
    } else {
      return;
    }
  };
  const getCls = (i, j, val) => {
    var cls = "cell";

    if (props.or[i][j] !== -1 && props.or[i][j] != 0) {
      return cls + " original";
    }

    if (props.active.i === props.rowIdx && j === props.active.j) {
      cls += " active";
    }

    if (props.or[i][j] === 0) {
      cls = cls + " error";
    }
    return cls;
  };
  return (
    <div className="row">
      {props.row.map((j, idx) => {
        return (
          <div
            key={idx}
            className={getCls(props.rowIdx, idx, j)}
            onClick={() => props.handleBox(props.rowIdx, idx)}
          >
            {get(j)}
          </div>
        );
      })}
    </div>
  );
}
