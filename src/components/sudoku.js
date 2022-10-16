import validate from "./validate";

export default function generateSudoku() {
  var sud = develop();
  //console.log("generated");
  while (!validate(sud)) {
    sud = develop();
  }

  return sud;
}

function display(sud) {
  var s = "";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      s += sud[i][j] + " ";
    }
    s += "\n";
  }
  console.log(s);
}

function develop() {
  var sud = new Array(9);

  for (let i = 0; i < 9; i++) {
    sud[i] = new Array(9).fill(0);
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let val = Math.floor(Math.random() * 10);
      sud[i][j] = val;
      let x = 0;
      // print(sud);
      // System.out.println("\n\n");
      while (val === 0 || !validate(sud)) {
        // System.out.println(i + " " + j);
        // System.out.println(Math.random() + " " + val);
        val = Math.floor(Math.random() * 10);
        sud[i][j] = val;
        if (x === 20) {
          break;
        }
        x++;
      }
      if (x === 20) {
        for (let k = 1; k <= 9; k++) {
          sud[i][j] = k;
          if (validate(sud)) {
            x = -1;
            break;
          }
        }
        if (x !== -1) {
          if (!optimize(sud, i, j)) {
            return sud;
          }
        }
      }
    }
  }
  return sud;
}

function optimize(sud, i, j) {
  for (let k = 0; k < i; k++) {
    sud[i][j] = sud[k][j];
    if (update(sud, k, j)) {
      return true;
    }
    sud[k][j] = sud[i][j];
  }

  for (let k = 0; k < j; k++) {
    sud[i][j] = sud[i][k];
    if (update(sud, i, k)) {
      return true;
    }
    sud[i][k] = sud[i][j];
  }

  let x = i / 3;
  let y = j / 3;

  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      if (x * 3 + k === i && y * 3 + l === j) {
        // System.out.println("*** update failed box \n\n");
        return false;
      }
      sud[i][j] = sud[x * 3 + k][y * 3 + l];
      if (update(sud, x * 3 + k, y * 3 + l)) {
        return true;
      }
      sud[x * 3 + k][y * 3 + l] = sud[i][j];
    }
  }

  // System.out.println("*** update failed \n\n");
  // print(sud);
  return false;
}

function update(sud, i, j) {
  for (let x = 1; x <= 9; x++) {
    sud[i][j] = x;
    if (validate(sud)) {
      return true;
    }
  }
  return false;
}
