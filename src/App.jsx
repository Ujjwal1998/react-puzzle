import { useState, useRef, useEffect } from "react";
import "./App.css";
import gon0 from "./assets/image1x1.webp";
import gon1 from "./assets/image2x1.webp";
import gon2 from "./assets/image3x1.webp";
import gon3 from "./assets/image1x2.webp";
import gon4 from "./assets/image2x2.webp";
import gon5 from "./assets/image3x2.webp";
import gon6 from "./assets/image1x3.webp";
import gon7 from "./assets/image2x3.webp";

const IMAGE_MAPPING = {
  0: gon0,
  1: gon1,
  2: gon2,
  3: gon3,
  4: gon4,
  5: gon5,
  6: gon6,
  7: gon7,
};
// questions:
// Q1: How to know if there is free space next to piece?
// A1: we get to know by checking the game state, in the game state the piece that is clicked checks on all four side if there is space it moves there shifting dependent pieces, else it stays there
// Q2: How to render the pieces ?
// A2: Maybe by looking at the state, need to have some kind of structure
function App() {
  const [clicks, setClicks] = useState(0); // amount of clicks taken by user to reach the end of the game
  const [puzzleState, setPuzzleState] = useState([0, 1, 2, 3, 8, 4, 6, 7, 5]); // state of the puzzle it start with pieces in place 1-8 with 9 being 0
  const [freeSpaceState, setFreeSpaceState] = useState(puzzleState.indexOf(8));
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  function checkForFreeSpace(selectedPiece) {
    if (
      (selectedPiece == 2 && freeSpaceState == 3) ||
      (selectedPiece == 3 && freeSpaceState == 2)
    ) {
      return false;
    }
    if (
      (selectedPiece == 5 && freeSpaceState == 6) ||
      (selectedPiece == 6 && freeSpaceState == 5)
    ) {
      return false;
    }
    if (
      Math.abs(selectedPiece - freeSpaceState) == 1 ||
      Math.abs(selectedPiece - freeSpaceState) == 3
    ) {
      return true;
    }
    return false;
  }

  function checkForFinish() {
    if (
      JSON.stringify(puzzleState) == JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8])
    ) {
      setIsPuzzleSolved(true);
      // alert(`Puzzle Completed! It took you ${clicks} clicks`);
    }
    // runs after movePiece to check if the game has finished aka all pieces are in order
  }
  function clickIncrementor() {
    setClicks(clicks + 1);
  }
  function swap(selectedPiece) {
    if (isPuzzleSolved == false) {
      clickIncrementor();
      if (checkForFreeSpace(selectedPiece)) {
        // checkForFinish();
        const newPuzzleState = puzzleState.map((val, idx) => {
          // console.log(selectedPiece.id, freeSpaceRef.current.id, val, idx);
          // HINT: FILL THE OLD FREE SPACE BEFORE SWAPPP
          if (idx == selectedPiece) {
            return 8;
          } else if (idx == freeSpaceState) {
            return puzzleState[selectedPiece];
          } else {
            return val;
          }
        });
        setFreeSpaceState(selectedPiece);
        setPuzzleState(newPuzzleState);
      }
    }
  }
  // checkForFinish();
  useEffect(() => {
    console.log("inside UE");
    checkForFinish();
  }, [puzzleState]);
  console.log(puzzleState, `freespacestate ${freeSpaceState}`, isPuzzleSolved);
  return (
    <>
      <PuzzleBoard
        clicks={clicks}
        setClicks={setClicks}
        swap={swap}
        puzzleState={puzzleState}
      ></PuzzleBoard>
      {isPuzzleSolved ? <h1>You solved the puzzle in {clicks} !</h1> : <></>}
    </>
  );
}

function PuzzleBoard({ clicks, setClicks, swap, puzzleState }) {
  return (
    <>
      <div className="container">
        <div className="row">
          {puzzleState.slice(0, 3).map((val, idx) => {
            if (val != 8) {
              return (
                <div
                  className="piece"
                  key={idx}
                  id={idx}
                  onClick={() => swap(idx)}
                >
                  <img
                    src={IMAGE_MAPPING[val]}
                    alt="gonnnnn"
                    className="puzzle-picture"
                  ></img>
                </div>
              );
            } else {
              return (
                <div className="empty-piece" id="8" key={8}>
                  EMPTY
                </div>
              );
            }
          })}
        </div>
        <div className="row">
          {puzzleState.slice(3, 6).map((val, idx) => {
            if (val != 8) {
              return (
                <div
                  className="piece"
                  key={idx}
                  id={idx + 3}
                  onClick={() => swap(idx + 3)}
                >
                  <img
                    src={IMAGE_MAPPING[val]}
                    alt="gonnnnn"
                    className="puzzle-picture"
                  ></img>
                </div>
              );
            } else {
              return (
                <div className="empty-piece" id="8" key={8}>
                  EMPTY
                </div>
              );
            }
          })}
        </div>
        <div className="row">
          {puzzleState.slice(6, 9).map((val, idx) => {
            // console.log(val);
            if (val != 8) {
              return (
                <div
                  className="piece"
                  key={idx}
                  id={idx + 6}
                  onClick={() => swap(idx + 6)}
                >
                  <img
                    src={IMAGE_MAPPING[val]}
                    alt="gonnnnn"
                    className="puzzle-picture"
                  ></img>
                </div>
              );
            } else {
              return (
                <div className="empty-piece" id="8" key={8}>
                  EMPTY
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
