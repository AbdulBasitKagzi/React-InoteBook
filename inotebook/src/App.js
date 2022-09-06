import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { Route, Switch } from "react-router-dom";
import NotesState from "./components/context/notes/NotesState";
import Alert from "./components/Alert";
function App() {
  return (
    <>
      <NotesState>
        <Navbar />
        <Alert />
        <div className="container">
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </NotesState>
    </>
  );
}

export default App;
