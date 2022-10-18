import React, { useEffect, useState, useRef } from "react";
import "./Matrix.css";
import Row from "./Row";
import generateSudoku from "./sudoku";
import validate from "./validate";
import Cuberow from "./cuberow";
import Footer from "./Footer";
import Numpad from "./Numpad";

function game(fullsud) {
  let sud = new Array(9);
  for (let i = 0; i < 9; i++) {
    sud[i] = new Array(9).fill(-1);
  }

  //print(sud);

  let c = solvemulsol(sud, fullsud);

  // print(sud);
  // print(fullsud);

  while (c < 40) {
    let i = Math.floor(Math.random() * 10);
    let j = Math.floor(Math.random() * 10);
    if (i === 9 || j === 9) {
      continue;
    }
    if (sud[i][j] === -1) {
      sud[i][j] = fullsud[i][j];
      c++;
    }
  }
  return sud;
}

function print(sud) {
  let s = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      s += sud[i][j] + " ";
    }
    s += "\n";
  }
  console.log(s);
}

function solvemulsol(sud, fsud) {
  let c = 0;

  for (let k = 0; k < 9; k += 3) {
    for (let i = k; i < k + 3; i++) {
      for (let j = i + 1; j < k + 3; j++) {
        for (let x = 0; x < 6; x++) {
          let l = Math.floor(x / 3) * 3 + 3;
          for (let y = l; y < 9; y++) {
            if (
              sud[i][x] === -1 &&
              fsud[i][x] === fsud[j][y] &&
              fsud[i][y] === fsud[j][x]
            ) {
              sud[i][x] = fsud[i][x];
              c++;
            }
          }
        }
      }
    }
  }

  for (let k = 0; k < 9; k += 3) {
    for (let i = k; i < k + 3; i++) {
      for (let j = i + 1; j < k + 3; j++) {
        for (let x = 0; x < 6; x++) {
          let l = Math.floor(x / 3) * 3 + 3;
          for (let y = l; y < 9; y++) {
            if (
              sud[x][i] === -1 &&
              fsud[x][i] === fsud[y][j] &&
              fsud[y][i] === fsud[x][j]
            ) {
              sud[x][i] = fsud[x][i];
              c++;
            }
          }
        }
      }
    }
  }

  return c;
}

export default function Matrix() {
  const onSubmit = (isEnter) => {
    let sc = score;
    let wr = wrong;
    if (verify(mat, original)) {
      if (isEnter) {
        sc += 1;
        setScore(sc);
      }
    } else {
      if (isEnter) {
        wr += 1;
        sc -= 0.5;
        setWrong(wr);
        setScore(sc);
      }
    }

    setFooter(<Footer score={sc} wrong={wr} />);
  };

  const autofocus = useRef();

  const [original, SetOriginal] = useState(generateSudoku());
  //console.log(original);
  const [enter, setEnter] = useState(false);

  const [wrong, setWrong] = useState(0);

  const [mat, setMat] = useState(game(original));

  const [or, setOr] = useState(mat);

  const [state, setState] = useState(false);

  const [score, setScore] = useState(0);

  const [footer, setFooter] = useState(<Footer score={score} wrong={wrong} />);

  const [filled, setFilled] = useState(0);

  useEffect(() => {
    autofocus.current.focus();
  }, []);

  useEffect(() => {
    if (state) onSubmit(enter);
    if (!state) setState(true);
  }, [mat]);

  const [active, SetActive] = useState({ i: 0, j: 0 });

  const verify = (temp, original) => {
    let lat = [[], [], [], [], [], [], [], [], []];
    print(or);
    let flag = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (temp[i][j] !== -1 && temp[i][j] !== original[i][j]) {
          flag = false;
        }
        lat[i][j] = or[i][j];
      }
    }
    if (!flag) {
      lat[active.i][active.j] = 0;
      setOr(lat);
      return false;
    }
    let x = filled;
    lat[active.i][active.j] = original[active.i][active.j];
    setFilled(x + 1);
    setOr(lat);
    return true;
  };

  const handleCell = (i, j, val) => {
    //console.log("handleCell invoked");
    if (or[i][j] > 0) {
      console.log("invalid");
      return;
    }
    if (val === undefined || val === 0) {
      SetActive({ i: i, j: j });
      return;
    }
    if (mat[i][j] === val) return;
    var temp = [[], [], [], [], [], [], [], [], []];
    var tor = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        temp[i][j] = mat[i][j];
        tor[i][j] = or[i][j];
      }
    }
    if (val === -1) {
      tor[i][j] = -1;
      setOr(tor);
    }
    temp[i][j] = val;
    setMat(temp);
  };

  const keyDown = (op) => {
    console.log(op);
    let i = active.i;
    let j = active.j;
    console.log(op);
    if (op in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]) {
      setEnter(true);
      handleCell(active.i, active.j, parseInt(op));
    } else if (op === "ArrowDown" && i < 8) {
      i++;
      while (or[i][j] !== -1 && i < 9) {
        i++;
      }
      if (i === 9) i = active.i;

      SetActive({ i: i, j: j });
    } else if (op === "ArrowUp" && i > 0) {
      i--;
      while (or[i][j] !== -1 && i > -1) {
        i--;
      }
      if (i === -1) i = active.i;

      SetActive({ i: i, j: j });
    } else if (op === "ArrowLeft" && j > 0) {
      j--;
      while (or[i][j] !== -1 && j > -1) {
        j--;
      }
      if (j === -1) j = active.j;

      SetActive({ i: i, j: j });
    } else if (op === "ArrowRight" && j < 8) {
      j++;
      while (or[i][j] !== -1 && j < 9) {
        j++;
      }
      if (j === 9) j = active.j;

      SetActive({ i: i, j: j });
    } else if (op === "Enter") {
      onSubmit(enter);
      setEnter(false);
    } else if ((mat[i][j] !== -1 && op === "c") || op === "C") {
      setState(false);
      setEnter(true);
      handleCell(active.i, active.j, -1);
    }
  };

  const onButton = (v) => {
    if (v === 0) keyDown("c");
    else keyDown(v + "");
  };

  const a = [1, 2, 3];

  return (
    <>
      <div
        className="matrix"
        onKeyDown={(e) => keyDown(e.key)}
        tabIndex={0}
        ref={autofocus}
      >
        {a.map((i) => (
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
        <div className="footer">{footer}</div>
      </div>
      <Numpad onButton={onButton} />
    </>
  );
}
