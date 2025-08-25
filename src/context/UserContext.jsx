import React, { createContext } from "react";
import { sendPrompt } from "../gemini";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-US";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text=await sendPrompt(prompt)
    console.log(text)
    speak(text)
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  if (speechRecognition) {
    try {
      recognition = new speechRecognition();
      recognition.onresult = (e) => {
        let currentIndex=e.resultIndex
        let transcript=e.results[currentIndex][0].transcript
        console.log(transcript)
        aiResponse(transcript)
      };
    } catch (error) {
      console.log("speechRecognition api not found")
    }
  }

  let value = {
    recognition,
  };

  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
};

export default UserContext;
