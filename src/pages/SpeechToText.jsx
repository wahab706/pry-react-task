import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function SpeechToText() {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  useEffect(() => {
    setTimeout(() => {
      SpeechRecognition.startListening();
    }, 100);
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 300);
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>{"Browser doesn't support speech recognition."}</span>;
  }

  const startListening = () => {
    setTimeout(() => {
      console.log("isMicrophoneAvailable", isMicrophoneAvailable);
      if (!isMicrophoneAvailable) {
        alert("Please allow Microphone access");
        return;
      }

      if (browserSupportsContinuousListening) {
        SpeechRecognition.startListening({ continuous: true });
      } else {
        SpeechRecognition.startListening();
      }
    }, 100);
  };

  const stopListening = () => {
    console.log("stopListening called");
    SpeechRecognition.stopListening();
  };

  const resetTranscription = () => {
    console.log("resetTranscript called");
    resetTranscript();
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 500);
  };

  const onTouchStart = () => {
    console.log("onTouchStart called");
    startListening();
  };

  const onTouchEnd = () => {
    console.log("onTouchEnd called");
    stopListening();
  };

  return (
    <div>
      <div className="my-10 text-2xl font-semibold w-full text-center">
        Speech to text
      </div>

      <div className="pl-10">
        <p>Microphone: {listening ? "on" : "off"}</p>

        <div className="flex gap-3 mt-2 ">
          
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="sm:hidden border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-200"
          >
            Press and Hold to Speak
          </div>

          <button
            onClick={startListening}
            className="hidden sm:block border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-200"
          >
            Start
          </button>

          <button
            onClick={stopListening}
            className="border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-200"
          >
            Stop
          </button>
          <button
            onClick={resetTranscription}
            className="border border-gray-400 rounded-md px-3 py-1 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        <p className="mt-4">{transcript}</p>
      </div>
    </div>
  );
}
