import React from "react";

import GuessInput from "../GuessInput/GuessInput";
import GuessResault from "../GuessResault/GuessResault";
import { sample } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import { WORDS } from "../../data";
import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  // running, won, lost
  const [gameStatus, setGameStatus] = React.useState("running");
  const [guesses, setGuessses] = React.useState([]);

  function handleSubmitGuess(tentativeGuess) {
    setGuessses([...guesses, tentativeGuess]);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus("won");
    } else if (guesses.length + 1 >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }
  return (
    <>
      {gameStatus}
      <GuessResault guesses={guesses} answer={answer} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />
      {gameStatus === "won" && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
