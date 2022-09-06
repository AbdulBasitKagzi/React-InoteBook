import React, { useState } from "react";
import NoteContext from "./NotesContext";

function NotesState(props) {
  const host = "http://localhost:5000";

  //   state to get all notes and fetch notes after deletion
  const [note, setNote] = useState([]);

  //   fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/fetchallnotes`);
    const data = await response.json();
    setNote(data);
  };

  // to add note to database
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/addnotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNTk4ZDBlZTE2YzU2MzY1MTI3YjhjIn0sImlhdCI6MTY2MjM3MzA0N30.vv9UQZpMZIIWDQPD-qfzFBuZ3axJj-E2TvEpSjnniZo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();

    setNote(note.concat(data));
  };

  //   to delete notes from database
  const deleteNote = async (_id) => {
    const response = await fetch(`${host}/deletenotes/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNTk4ZDBlZTE2YzU2MzY1MTI3YjhjIn0sImlhdCI6MTY2MjM3MzA0N30.vv9UQZpMZIIWDQPD-qfzFBuZ3axJj-E2TvEpSjnniZo",
      },
      body: JSON.stringify(),
    });
    const data = await response.json();
    const newNote = data.filter((note) => {
      return note._id !== _id;
    });
    setNote(newNote);
  };

  //   edit notes in the database
  const editNote = async ({ title, description, tag, id }) => {
    const response = await fetch(`${host}/editnotes${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNTk4ZDBlZTE2YzU2MzY1MTI3YjhjIn0sImlhdCI6MTY2MjM3MzA0N30.vv9UQZpMZIIWDQPD-qfzFBuZ3axJj-E2TvEpSjnniZo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();

    // logic to edit notes
    for (let index = 0; index.length < 0; index++) {
      const element = note[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ note, setNote, addNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NotesState;
