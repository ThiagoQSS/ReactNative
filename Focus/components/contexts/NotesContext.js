import React, { createContext, useState } from "react";

// Criando o Contexto
export const NotesContext = createContext();
export const titleContext = createContext();
export const bodyContext = createContext();

export const MyProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [titleS, setTitle] = useState("");
  const [bodyS, setBody] = useState("");

  return (
    <titleContext.Provider value={{ titleS, setTitle }}>
      <bodyContext.Provider value={{ bodyS, setBody }}>
        <NotesContext.Provider value={{ notes, setNotes }}>
          {children}
        </NotesContext.Provider>
      </bodyContext.Provider>
    </titleContext.Provider>
  );
};
