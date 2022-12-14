import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

import { Route, Switch } from "react-router-dom";
import NotesState from "./components/context/notes/NotesState";
// import Alert from "./components/Alert";
// import { useContext } from "react";

function App(props) {
  return (
    <>
      <NotesState>
        <Navbar />

        <div className="container">
          <Switch>
            <Route exact path="/">
              <SignUp />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <LogIn />
            </Route>
          </Switch>
        </div>
      </NotesState>
    </>
  );
}

export default App;
