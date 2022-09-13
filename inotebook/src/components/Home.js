import React, { useContext } from "react";
// import NoteContext from "./context/notes/NotesContext";
import Notes from "./Notes";
import NoteContext from "./context/notes/NotesContext";
import Alert from "./Alert";

function Home() {
  const ctx = useContext(NoteContext);

  return (
    <div>
      
      {ctx.message && <Alert message={ctx.message} alertType="success" />}
      <Notes />
    </div>
  );
}

export default Home;
