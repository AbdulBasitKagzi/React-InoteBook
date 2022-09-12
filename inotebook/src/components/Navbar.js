import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const history = useHistory();

  const onClickHandler = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            INoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-2"
                  role="button"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  role="button"
                  to="/login"
                >
                  Log In
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary mx-2" onClick={onClickHandler}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
