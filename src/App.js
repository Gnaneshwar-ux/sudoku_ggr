import "./App.css";

import React, { useEffect, useState } from "react";

import Header from "./components/Header";

import Matrix from "./components/Matrix";

import Game from "./components/Game";

import generateSudoku from "./components/sudoku";

import Levelup from "./components/Levelup";

import Replay from "./components/Retry";

import "./components/Matrix.css";

const temp = generateSudoku();

function App() {
  const limit = 1;
  const lev = [80, 80, 79, 79, 78];
  const gameOver = () => {
    const show = (
      <div className="show">
        <h1>Game Over</h1>
        <h2>
          It feels like we got one more intelligent person in the world 👌👏
        </h2>
      </div>
    );
    setState({ ...state, matrix: <></>, message: show });
  };

  const nextLevel = (win) => {
    if (win) {
      const l = state.level;
      state.level++;
      if (l === 4) {
        gameOver();
        return;
      }
    }
    const l = state.level;
    const temp = generateSudoku();
    let s = {
      ...state,
      matrix: (
        <Matrix
          level={lev[l]}
          original={temp}
          game={Game(temp, lev[l])}
          onComplete={completed}
          state={true}
          onWrong={replay}
          limit={limit}
        />
      ),
      message: <></>,
    };

    setState(s);
  };

  const completed = (wrong) => {
    let l = state.level;
    let s = {
      ...state,
      matrix: <Matrix state={false} limit={limit} />,
      message: (
        <Levelup
          level={l}
          state={wrong >= limit ? false : true}
          onContinue={() => nextLevel(wrong >= limit ? false : true)}
        />
      ),
    };
    setState(s);
  };
  const retry = () => {
    console.log("retry");
    let s = {
      ...state,
      message: <></>,
    };
    setState(s);
  };
  const replay = () => {
    let l = state.level;
    let s = {
      ...state,
      matrix: (
        <Matrix
          state={false}
          limit={limit}
          onComplete={completed}
          onWrong={replay}
        />
      ),
      message: (
        <Replay onContinue={() => retry()} onRetry={() => nextLevel(false)} />
      ),
    };
    setState(s);
  };
  const [state, setState] = useState({
    matrix: (
      <Matrix
        level={lev[0]}
        original={temp}
        game={Game(temp, lev[0])}
        onComplete={completed}
        onWrong={replay}
        state={true}
        limit={limit}
      />
    ),
    message: <></>,
    level: 0,
  });

  useEffect(() => {
    console.log(state.level);
  }, [state]);

  return (
    <div className="App">
      <Header level={state.level} />
      {state.matrix}
      {state.message}
    </div>
  );
}

export default App;
