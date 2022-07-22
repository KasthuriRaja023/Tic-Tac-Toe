import "./styles.css";
import React from "react";
import { useState } from "react";

function Square({ id, newstate }) {
  const [status, setStatus] = useState(null);
  const [win, setWin] = useState("+");
  const xo = ["O", "X"];

  return (
    <button
      className="color"
      data={xo[status]}
      onClick={(e) => {
        setWin(xo[status]);
        let nextPlayer = newstate(id);
        setStatus(nextPlayer);
      }}
    >
      {win}
      <h1>{xo[status]}</h1>
    </button>
  );
}
export default function App() {
  const [player, setPlayer] = useState(0);
  const [state, setState] = useState(Array(9).fill(null));

  let result = `Player ${player}`;

  function Win(id) {
    return <Square id={id} newstate={newstate}></Square>;
  }

  function newstate(id) {
    let thePlayer = player;
    state[id] = thePlayer;
    setState(state);
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    return thePlayer;
  }

  function handle() {
    player === 1 ? setPlayer(0) : setPlayer(1);
  }
  let status;
  let store_win = Calwin(state);
  let result_win = store_win === 0 ? "O" : "X";
  if (store_win !== null) status = `Player ${result_win} won`;

  function Calwin(state) {
    const line_arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < line_arr.length; i++) {
      const [a, b, c] = line_arr[i];
      if (state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="game-board">
        <div className="grid-row" onClick={handle}>
          {Win(0)}
          {Win(1)}
          {Win(2)}
        </div>
        <div className="grid-row" onClick={handle}>
          {Win(3)}
          {Win(4)}
          {Win(5)}
        </div>
        <div className="grid-row" onClick={handle}>
          {Win(6)}
          {Win(7)}
          {Win(8)}
        </div>
        <div>
          <h1>{result}</h1>
          <h1>{status}</h1>
        </div>
      </div>
    </>
  );
}
