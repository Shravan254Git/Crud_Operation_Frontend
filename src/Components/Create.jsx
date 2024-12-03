import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../Api/baseURL";

export default function Create() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  // To submit the form details
  const handleFormSubmission = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/add_user`, values)
      .then((res) => {
        navigate("/home");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };

  return (
    <div className="container-fluid vh-100 vw-100 text-white">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center my-4">Add Student</h3>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/home" className="btn btn-success">
              Home
            </Link>
          </div>
          <form onSubmit={handleFormSubmission}>
            <div className="form-group mb-3">
              <label style={{color:'white'}} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label style={{color:'white'}} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label style={{color:'white'}} htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="form-control"
                value={values.age}
                onChange={(e) => setValues({ ...values, age: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label style={{color:'white'}} htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                className="form-control"
                value={values.gender}
                onChange={(e) => setValues({ ...values, gender: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
