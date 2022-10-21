import React, { useEffect, useState, useRef } from "react";

import "./Matrix.css";

import Row from "./Row";

import generateSudoku from "./sudoku";

import validate from "./validate";

import Cuberow from "./cuberow";

import Footer from "./Footer";

import Numpad from "./Numpad";

import Game from "./Game";

export default function Matrix(props) {
  const autofocus = useRef();

  //console.log(original);
  const [original, setOriginal] = useState();

  const [state, setState] = useState(true);

  const [wrong, setWrong] = useState(0);

  const [filled, setFilled] = useState(0);

  const [mat, setMat] = useState([]);

  const [active, setActive] = useState();

  const [or, setOr] = useState([]);
  if (props.mstate) {
    setState(true);
  }

  if (state && props.state) {
    setState(false);
    setOriginal(props.original);
    setWrong(0);
    setFilled(props.level);
    setMat(props.game);
    setActive({ i: 0, j: 0 });
    setOr(
      props.game.map((i) =>
        i.map((j) => {
          if (j > 0) {
            return 1;
          }
          return 0;
        })
      )
    );
    console.log(original);
    console.log(props.game);
  }
  console.log(props.original);

  useEffect(() => {
    if (filled == 81) {
      setState(true);
      props.onComplete(wrong);
    }
  }, [filled]);

  useEffect(() => {
    if (wrong == props.limit) {
      props.onWrong();
    }
  }, [wrong]);

  const getTemp = (arr) => {
    let temp = new Array(9);

    for (let i = 0; i < 9; i++) {
      temp[i] = new Array(9).fill(-1);
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        temp[i][j] = arr[i][j];
      }
    }
    return temp;
  };

  const verify = (i, j, val) => {
    if (original[i][j] == val) return true;
    return false;
  };

  const handleCell = (i, j, val) => {
    if (or[i][j] > 0) {
      return;
    }

    if (val === undefined) {
      setActive({ i: i, j: j });
      return;
    }

    if (mat[i][j] === val) return;

    var temp = getTemp(mat);

    temp[i][j] = val;

    let ortemp = getTemp(or);
    let pfilled = filled;
    let wr = wrong;

    if (!verify(i, j, val)) {
      ortemp[i][j] = -1;
      if (val === 0) {
        ortemp[i][j] = 0;
      } else {
        wr++;
      }
    } else {
      pfilled += 1;
      ortemp[i][j] = 1;
    }

    setOr(ortemp);
    setMat(temp);
    setWrong(wr);
    setFilled(pfilled);
  };

  const keyDown = (op) => {
    let i = active.i;
    let j = active.j;

    if (parseInt(op) >= 1) {
      handleCell(active.i, active.j, parseInt(op));
    } else if (op === "ArrowDown" && i < 8) {
      i++;
      while (or[i][j] !== -1 && i < 9) {
        i++;
      }
      if (i === 9) i = active.i;

      setActive({ i: i, j: j });
    } else if (op === "ArrowUp" && i > 0) {
      i--;
      while (or[i][j] !== -1 && i > -1) {
        i--;
      }
      if (i === -1) i = active.i;

      setActive({ i: i, j: j });
    } else if (op === "ArrowLeft" && j > 0) {
      j--;
      while (or[i][j] !== -1 && j > -1) {
        j--;
      }
      if (j === -1) j = active.j;

      setActive({ i: i, j: j });
    } else if (op === "ArrowRight" && j < 8) {
      j++;
      while (or[i][j] !== -1 && j < 9) {
        j++;
      }
      if (j === 9) j = active.j;

      setActive({ i: i, j: j });
    } else if ((mat[i][j] !== -1 && op === "c") || op === "C") {
      handleCell(active.i, active.j, 0);
    }
  };

  const onButton = (v) => {
    if (v === 0) keyDown("c");
    else keyDown(v + "");
  };

  return (
    <>
      <div
        className="matrix"
        onKeyDown={(e) => keyDown(e.key)}
        tabIndex={0}
        ref={autofocus}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className={"cuberow" + i}>
            <Cuberow />
          </div>
        ))}

        {mat.map((row, idx) => {
          return (
            <Row
              key={idx}
              row={row}
              rowIdx={idx}
              active={active}
              or={or}
              handleBox={handleCell}
            ></Row>
          );
        })}
        <div className="footer">
          <Footer wrong={wrong} />
        </div>
      </div>
      <Numpad onButton={onButton} />
    </>
  );
}
