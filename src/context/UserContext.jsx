import React, { createContext, useEffect, useState } from "react";
import { sendPrompt } from "../gemini";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    
    let text = await sendPrompt(prompt);
    // let newText=text.split("**")&&text.split("*")&&text.replace("google","Manish Shetty")&&text.replace("Google","Manish Shetty")

    let newText =
      text
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/google/gi, "Manish Shetty")
        .split(/[.!?]/)[0]
        .trim() + ".";

    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  if (speechRecognition) {
    try {
      recognition = new speechRecognition();
      recognition.onresult = (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
      };
    } catch (error) {
      console.log("speechRecognition api not found");
    }
  }

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening youtube...");
      setResponse(true);
      setPrompt("opening youtube...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("opening google...");
      setResponse(true);
      setPrompt("opening google...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening instagram...");
      setResponse(true);
      setPrompt("opening instagram...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setResponse(true);
      setPrompt(time);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setResponse(true);
      setPrompt(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
};

export default UserContext;
