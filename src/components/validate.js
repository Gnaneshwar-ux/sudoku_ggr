export default function validate(sud) {
  for (let i = 0; i < 9; i++) {
    let a = new Array(10).fill(0);
    for (let j = 0; j < 9; j++) {
      a[sud[i][j]]++;
    }
    if (!check(a)) {
      // System.out.println("row");
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    let a = new Array(10).fill(0);
    for (let j = 0; j < 9; j++) {
      a[sud[j][i]]++;
    }
    if (!check(a)) {
      // System.out.println("column");
      return false;
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let a = new Array(10).fill(0);
      let k = 0,
        l = 0;

      for (k = 0; k < 3; k++) {
        for (l = 0; l < 3; l++) {
          a[sud[i * 3 + k][j * 3 + l]]++;
        }
      }
      if (!check(a)) {
        // System.out.println("box " + (i * 3 + k) + " " + (j * 3 + l));
        return false;
      }
    }
  }

  return true;
}

function check(a) {
  for (let i = 1; i <= 9; i++) {
    if (a[i] > 1) return false;
  }
  return true;
}
