import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

function LogIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const [userConfig, setUserConfig] = useState({ email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();

    // setUserConfig({
    //   email: emailRef.current.value,
    //   password: passwordRef.current.value,
    // });
    // TO LOGIN USER
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify({
        email: userConfig.email,
        password: userConfig.password,
      }),
    });
    const data = await response.json();
    console.log("authtoken", data.success, data.token);

    if (data.success) {
      localStorage.setItem("token", data.token);
      history.push("/home");
      return;
    }
    alert("Enter valid daata");
  };

  // TO UPDATE STATE
  const onChange = (e) => {
    setUserConfig({ ...userConfig, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="container mx-5 my-5">
        Log In to use INoteBook Functionality
      </h2>
      <form className="container mx-5">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={emailRef}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={passwordRef}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;
