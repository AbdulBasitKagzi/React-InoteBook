import React, { useContext, useEffect } from "react";
import NoteContext from "./context/notes/NotesContext";

function About() {
  // const ctx = useContext(NoteContext);

  // useEffect(() => {
  //   ctx.update();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      About Us
      {/* <p>
        My name is {ctx.state.name} and I am a {ctx.state.position}
      </p> */}
    </div>
  );
}

export default About;
