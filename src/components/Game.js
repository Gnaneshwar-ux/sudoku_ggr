export default function Game(fullsud, level) {
  let sud = new Array(9);
  for (let i = 0; i < 9; i++) {
    sud[i] = new Array(9).fill(-1);
  }

  //print(sud);

  let c = solvemulsol(sud, fullsud);

  // print(sud);
  // print(fullsud);

  while (c < level) {
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
