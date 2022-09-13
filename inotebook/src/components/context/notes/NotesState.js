import React, { useState } from "react";
import NoteContext from "./NotesContext";

function NotesState(props) {
  const host = "http://localhost:5000";

  //   state to get all notes and fetch notes after deletion
  const [note, setNote] = useState([]);

  // to set alert
  const [message, setMessage] = useState("");

  //   fetch all notes
  const getNotes = async () => {
    // console.log("tokenfrom", localStorage.getItem("token"));
    const response = await fetch(`${host}/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "Application/Json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setNote(data);
  };

  // to add note to database
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/addnotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();

    setNote(note.concat(data));
  };

  //   to delete notes from database
  const deleteNote = async (_id) => {
    await fetch(`${host}/deletenotes/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    // const data = await response.json();
    // const newNote = data.filter((note) => {
    //   return note._id !== _id;
    // });
    // console.log(newNote);
    // setNote(newNote);

    getNotes();
  };

  //   edit notes in the database
  const editNote = async ({ title, description, tag, id }) => {
    // console.log(title, description, tag, id);
    await fetch(`${host}/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, id }),
    });

    let newNote = JSON.parse(JSON.stringify(note));
    // logic to edit notes
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNote(newNote);
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        setNote,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        setMessage,
        message,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NotesState;
