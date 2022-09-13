import React, { useContext } from "react";
import NoteContext from "./context/notes/NotesContext";

function Alert(props) {
  const [time, setTime] = React.useState(true);
  const ctx = useContext(NoteContext);

  setTimeout(() => {
    setTime(false);
    ctx.setMessage("");
  }, 2000);

  return (
    time && (
      <div
        className={`alert alert-${props.alertType}  alert-dismissible fade show`}
        role="alert"
      >
        {props.message}
      </div>
    )
  );
}

export default Alert;
