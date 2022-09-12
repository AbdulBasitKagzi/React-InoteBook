import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteContext from "./context/notes/NotesContext";
import NoteItem from "./Noteitem";
import { useHistory } from "react-router-dom";

function Notes() {
  const ctx = useContext(NoteContext);
  const history = useHistory();
  // to fetch all notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      ctx.getNotes();
    } else {
      history.push("/login");
    }
    // react - hooks / exhaustive - deps;
  }, []);

  const ref = useRef(null);
  const closeRef = useRef(null);
  const [enote, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    console.log("update", enote);
    ctx.editNote(enote);
    console.log(enote.id);
    closeRef.current.click();
  };

  const onUpdate = (currentNote) => {
    ref.current.click();
    console.log("curr", currentNote);
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      tag: currentNote.tag,
      description: currentNote.description,
    });
  };
  const onChange = (e) => {
    setNote({ ...enote, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* model to edit notes */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form to edit notes */}
              <div className="container my-3">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="title"
                      value={enote.title}
                      // defaultValue={enote.title}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      id="desc"
                      value={enote.description}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      name="tag"
                      className="form-control"
                      id="desc"
                      value={enote.tag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary invisible"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {ctx.note.length !== 0
          ? ctx.note.map((note) => {
              return <NoteItem key={note._id} Update={onUpdate} note={note} />;
            })
          : "No notes found"}
      </div>
    </>
  );
}

export default Notes;
