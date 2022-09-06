import React, { useContext, useEffect, useRef } from "react";
import AddNote from "./AddNote";
import NoteContext from "./context/notes/NotesContext";
import NoteItem from "./Noteitem";

function Notes() {
  const ctx = useContext(NoteContext);
  const ref = useRef(null);

  // to fetch all notes
  useEffect(() => {
    ctx.getNotes();
  }, []);

  const handleClick = () => {};
  const onChange = () => {};
  const onUpdate = () => {
    ref.current.click();
  };
  return (
    <>
      {/* model to edit notes */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                      onChange={onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
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
        {ctx.note.map((note) => {
          return <NoteItem key={note._id} Update={onUpdate} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
