"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";

/* ---------------------------------------
   TYPES
---------------------------------------- */
type Square = "X" | "O" | null;

interface GameState {
  history: Square[][];
  currentMove: number;
}

interface GameActions {
  setHistory: (
    next: Square[][] | ((prev: Square[][]) => Square[][])
  ) => void;

  setCurrentMove: (
    next: number | ((prev: number) => number)
  ) => void;
}

/* ---------------------------------------
   ZUSTAND STORE
---------------------------------------- */
const useGameStore = create(
  combine<GameState, GameActions>(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
    },

    (set, get) => ({
      setHistory: (nextHistory) => {
        set((state) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(state.history)
              : nextHistory,
        }));
      },

      setCurrentMove: (nextCurrentMove) => {
        set((state) => ({
          currentMove:
            typeof nextCurrentMove === "function"
              ? nextCurrentMove(state.currentMove)
              : nextCurrentMove,
        }));
      },
    })
  )
);

/* ---------------------------------------
   UI COMPONENTS
---------------------------------------- */

function Square({ value, onSquareClick }: { value: Square; onSquareClick: () => void }) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#fff",
        border: "1px solid #999",
        outline: 0,
        borderRadius: 0,
        fontSize: "1.4rem",
        fontWeight: "bold",
        width: "3rem",
        height: "3rem",
        cursor: "pointer",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: Square[];
  onPlay: (next: Square[]) => void;
}) {
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? "X" : "O";
  const status = calculateStatus(winner, turns, player);

  function handleClick(i: number) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  return (
    <>
      <div style={{ marginBottom: "0.6rem", fontSize: "1.1rem" }}>{status}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "9rem",
          border: "1px solid #999",
        }}
      >
        {squares.map((_, i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------
   MAIN GAME COMPONENT
---------------------------------------- */

export default function GamePage() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);

  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Square[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
        padding: "2rem",
        fontSize: "1rem",
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div style={{ marginLeft: "1.5rem" }}>
        <ol>
          {history.map((_, moveIndex) => {
            const description =
              moveIndex > 0 ? `Go to move #${moveIndex}` : "Go to game start";

            return (
              <li key={moveIndex}>
                <button onClick={() => jumpTo(moveIndex)}>{description}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ---------------------------------------
   HELPERS
---------------------------------------- */

function calculateWinner(squares: Square[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function calculateTurns(squares: Square[]) {
  return squares.filter((s) => !s).length;
}

function calculateStatus(winner: Square, turns: number, player: string) {
  if (!winner && !turns) return "Draw!";
  if (winner) return `Winner: ${winner}`;
  return `Next player: ${player}`;
}
