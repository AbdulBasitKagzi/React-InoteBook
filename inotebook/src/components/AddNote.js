import React, { useContext } from "react";
import NoteContext from "./context/notes/NotesContext";

function AddNote() {
  const ctx = useContext(NoteContext);

  //   alternate way to add data to notes context state
  // to prevent refresh of the form
  //   const submitHandler = (e) => {
  //     e.preventDefault();

  //     const newNote = {
  //       _id: Math.random(),
  //       title: title,
  //       description: desc,
  //     };

  //     console.log(ctx.note.concat(newNote));
  //     ctx.setNote((previouState) => [...previouState, newNote]);
  //     // ctx.notes.concat(newNote);
  //   };

  //   //   title handler
  //   const [title, setTitle] = React.useState("");
  //   const titleHandler = (e) => {
  //     setTitle(e.target.value);
  //   };

  //   //   desc handler
  //   const [desc, setDesc] = React.useState("");

  //   const descHandler = (e) => {
  //     setDesc(e.target.value);
  //   };
  //

  // ------------------------------------------------>

  // code with harry way to add data to note context
  const [Note, setNote] = React.useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    ctx.addNote(Note);
  };

  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add Notes</h1>
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
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddNote;
