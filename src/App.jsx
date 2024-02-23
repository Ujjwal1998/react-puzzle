import { useState, useRef, useEffect } from "react";
import "./App.css";
import gon0 from "./assets/gon/image1x1.webp";
import gon1 from "./assets/gon/image2x1.webp";
import gon2 from "./assets/gon/image3x1.webp";
import gon3 from "./assets/gon/image1x2.webp";
import gon4 from "./assets/gon/image2x2.webp";
import gon5 from "./assets/gon/image3x2.webp";
import gon6 from "./assets/gon/image1x3.webp";
import gon7 from "./assets/gon/image2x3.webp";
import guts0 from "./assets/guts/image1x1.jpg";
import guts1 from "./assets/guts/image2x1.jpg";
import guts2 from "./assets/guts/image3x1.jpg";
import guts3 from "./assets/guts/image1x2.jpg";
import guts4 from "./assets/guts/image2x2.jpg";
import guts5 from "./assets/guts/image3x2.jpg";
import guts6 from "./assets/guts/image1x3.jpg";
import guts7 from "./assets/guts/image2x3.jpg";

const IMAGE_MAPPING = {
  GON: {
    0: gon0,
    1: gon1,
    2: gon2,
    3: gon3,
    4: gon4,
    5: gon5,
    6: gon6,
    7: gon7,
  },
  GUTS: {
    0: guts0,
    1: guts1,
    2: guts2,
    3: guts3,
    4: guts4,
    5: guts5,
    6: guts6,
    7: guts7,
  },
};
// questions:
// Q1: How to know if there is free space next to piece?
// A1: we get to know by checking the game state, in the game state the piece that is clicked checks on all four side if there is space it moves there shifting dependent pieces, else it stays there
// Q2: How to render the pieces ?
// A2: Maybe by looking at the state, need to have some kind of structure
function App() {
  const [clicks, setClicks] = useState(0); // amount of clicks taken by user to reach the end of the game
  const [puzzleState, setPuzzleState] = useState(createRandomArray()); // state of the puzzle it start with pieces in place 1-8 with 9 being 0
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [currentImage, setCurrentImage] = useState("GON");
  function checkForFreeSpace(selectedPiece) {
    if (
      (selectedPiece == 2 && puzzleState.indexOf(8) == 3) ||
      (selectedPiece == 3 && puzzleState.indexOf(8) == 2)
    ) {
      return false;
    }
    if (
      (selectedPiece == 5 && puzzleState.indexOf(8) == 6) ||
      (selectedPiece == 6 && puzzleState.indexOf(8) == 5)
    ) {
      return false;
    }
    if (
      Math.abs(selectedPiece - puzzleState.indexOf(8)) == 1 ||
      Math.abs(selectedPiece - puzzleState.indexOf(8)) == 3
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
    }
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
          } else if (idx == puzzleState.indexOf(8)) {
            return puzzleState[selectedPiece];
          } else {
            return val;
          }
        });
        setPuzzleState(newPuzzleState);
      }
    }
  }
  // reset function: reset click, randomize the puzzle state, change ispuzzlesolved
  function reset() {
    setClicks(0);
    setIsPuzzleSolved(false);
    setPuzzleState(createRandomArray());
  }
  function changeImage() {
    setCurrentImage("GUTS");
    reset();
  }
  // checkForFinish();
  useEffect(() => {
    console.log("inside UE");
    checkForFinish();
  }, [puzzleState]);
  // console.log(puzzleState, `freespacestate ${freeSpaceState}`, isPuzzleSolved);
  return (
    <>
      <button onClick={() => changeImage()}>CHANGE IMAGE</button>
      <PuzzleBoard
        clicks={clicks}
        setClicks={setClicks}
        swap={swap}
        puzzleState={puzzleState}
        currentImage={currentImage}
      ></PuzzleBoard>
      {isPuzzleSolved ? (
        <h1 className="winning-banner">
          You solved the puzzle in {clicks} clicks!
          <button className="try-button" onClick={() => reset()}>
            Try again!
          </button>
        </h1>
      ) : (
        <></>
      )}
    </>
  );
}

function PuzzleBoard({ clicks, setClicks, swap, puzzleState, currentImage }) {
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
                    src={IMAGE_MAPPING[currentImage][val]}
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
                    src={IMAGE_MAPPING[currentImage][val]}
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
                    src={IMAGE_MAPPING[currentImage][val]}
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

function createRandomArray() {
  const arrayLength = 9;
  const uniqueNumbers = Array.from({ length: arrayLength }, (_, i) => i);
  const randomArray = [];

  while (uniqueNumbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * uniqueNumbers.length);
    const randomValue = uniqueNumbers.splice(randomIndex, 1)[0];
    randomArray.push(randomValue);
  }

  return randomArray;
}
export default App;
