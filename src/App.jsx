import React, { useContext } from "react";
import ai from "../src/assets/ai.png";
import speak from "./assets/speak.gif";
import aiVoice from "./assets/aiVoice.gif"
import { RiMic2AiLine } from "react-icons/ri";
import { dataContext } from "./context/UserContext";

const App = () => {
  let { recognition, speaking, setSpeaking, prompt, response,setPrompt,setResponse } =
    useContext(dataContext);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-start overflow-hidden p-[10px] gap-[20px]">
      <img src={ai} className="h-[70%] object-cover" />

      <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent sm:text-lg md:text-xl lg:text-2xl font-semibold">
        I'm Shifra,Your Advanced Virtual Assistant
      </span>

      {!speaking ? (
        <button
          className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-semibold shadow-md shadow-cyan-500/40 transition rounded-full px-5 py-2 flex items-center gap-[20px] cursor-pointer"
          onClick={() => {
            setSpeaking(true);
            setResponse(false);
            setPrompt("listening...")
            if (recognition) {
              recognition.start();
            } else {
              alert("Speech Recognition not supported in this browser");
            }
          }}
        >
          click here
          <RiMic2AiLine className="w-5 h-5 drop-shadow-[0_0_10px_#ec4899] animate-pulse" />
        </button>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {!response ? (
            <img src={speak} className="w-[60px]" />
          ) : (
            <img src={aiVoice} className="w-[60px]" />
          )}

          <p className="text-white font-bold text-[20px] flex items-center py-0 px-[40px]">{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
