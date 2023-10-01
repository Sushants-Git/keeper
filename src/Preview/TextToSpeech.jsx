import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [Waiting, setWaiting] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    setWaiting(true);
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);
    utterance.onstart = (event) => setWaiting(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="text-to-speech-container">
      {showButtons ? (
        <>
          {Waiting ? (
            <button>Please Wait...</button>
          ) : (
            <>
              <button onClick={handlePlay}>
                {isPaused ? "Resume" : "Play"}
              </button>
              <button onClick={handlePause}>Pause</button>
              <button onClick={handleStop}>Stop</button>
            </>
          )}
        </>
      ) : (
        <button onClick={() => setShowButtons(true)}>Text To Speech</button>
      )}
    </div>
  );
};

export default TextToSpeech;
