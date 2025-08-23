import React, { createContext } from "react";

export const dataContext = createContext();

const UserContext = ({ children }) => {
    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.lang="hi-US"
        window.speechSynthesis.speak(text_speak)
    }
    let value={
        speak
    }
  return (
    <div>
      <dataContext.Provider value={value}>
        {children}
      </dataContext.Provider>
    </div>
  );
};

export default UserContext;
