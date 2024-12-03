import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../Context/AuthProvider";
import axios from "axios";
import { baseURL } from "../Api/baseURL";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Global State
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post(`${baseURL}/auth`, {
        email: email,
        password: pwd,
      });

      console.log(JSON.stringify(response?.data));

      // Extract the data from the response
      const user = response?.data?.User;
      const status = response?.data?.Status;

      if (status === "Success") {
        setAuth({ email, user });

        setEmail("");
        setPwd("");

        navigate("/home");
      } else {
        setErrMsg(response?.data?.Error || "Login Failed!");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 404) {
        setErrMsg("Email not found");
      } else if (error.response?.status === 401) {
        setErrMsg("Incorrect password");
      } else {
        setErrMsg("Login Failed!");
      }

      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Usermail:</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p>
          Need an Account? <br />
          <span className="line">
            <a href="/signUp">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
}
