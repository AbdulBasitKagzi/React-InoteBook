import React, { useContext, useEffect } from "react";
import AddNote from "./AddNote";
import NoteContext from "./context/notes/NotesContext";
import NoteItem from "./Noteitem";

function Notes() {
  const ctx = useContext(NoteContext);

  useEffect(() => {
    ctx.getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {ctx.note.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
