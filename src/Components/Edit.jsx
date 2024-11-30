import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "./Api/baseURL";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, [id]);

  // To submit the form details
  const handleFormSubmission = (e) => {
    e.preventDefault();

    axios
      .put(`${baseURL}/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h3 style={{ textAlign: "center" }}>User {id}</h3>
      <Link className="btn btn-success mt-2 mb-1" to="/">
        Back
      </Link>

      {data.map((student) => {
        return (
          <form onSubmit={handleFormSubmission}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={student.name}
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={student.email}
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="form-control"
                value={student.age}
                onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                className="form-control"
                value={student.gender}
                onChange={(e) =>
                  setData([{ ...data[0], gender: e.target.value }])
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        );
      })}
    </div>
  );
}
