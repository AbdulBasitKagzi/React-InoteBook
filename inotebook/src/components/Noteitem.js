import React from "react";
import NoteContext from "./context/notes/NotesContext";

// here we are getting note as a prop
function NoteItem(props) {
  const ctx = React.useContext(NoteContext);
  return (
    <div className=" col-md-3">
      <div className="card my-3" key={props.note._id}>
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <span
            onClick={() => {
              ctx.deleteNote(props.note._id);
            }}
          >
            <i
              className="fa-solid fa-trash-can mx-2"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete"
            ></i>
          </span>
          <span
            onClick={() => {
              {
                props.Update(props.note);
              }
            }}
          >
            <i
              className="fa-solid fa-pen-to-square mx-2"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit"
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
