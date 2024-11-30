import React, { useState, useEffect } from "react";
import { baseURL } from "./Api/baseURL";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${baseURL}/students`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then(() => {
        fetchStudents(); // Refresh the student list after deletion
      })
      .catch((err) => {
        console.error("Error deleting student:", err);
      });
  };

  return (
    <div className="container-fluid bg-primary vh-100 vw-100 text-white">
      <h3 style={{ textAlign: "center" }}>Students</h3>
      <div className="d-flex justify-content-end my-3">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered bg-light w-75">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    <Link
                      className="btn mx-2 btn-success"
                      to={`/read/${student.id}`}
                    >
                      Read
                    </Link>
                    <Link
                      className="btn mx-2 btn-warning"
                      to={`/edit/${student.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn mx-2 btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
