import React, { useContext } from "react";
// import NoteContext from "./context/notes/NotesContext";
import Notes from "./Notes";

function Home() {
  // const ctx = useContext(NoteContext);

  return (
    <div>
      <Notes />
    </div>
  );
}

export default Home;
