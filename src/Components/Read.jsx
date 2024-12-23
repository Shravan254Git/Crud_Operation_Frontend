import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../Api/baseURL";
import { Link, useParams } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

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

  return (
    <div className="container-fluid vh-100 vw-100">
      <h3 style={{color:'white'}} className="text-center my-4">User {id}</h3>
      <Link className="btn btn-dark mt-2 mb-1" to="/home">
        Back
      </Link>

      {data.map((student) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>Id : </b>
              {student["id"]}
            </li>
            <li className="list-group-item">
              <b>Name : </b>
              {student["name"]}
            </li>
            <li className="list-group-item">
              <b>Email : </b>
              {student["email"]}
            </li>
            <li className="list-group-item">
              <b>Age : </b>
              {student["age"]}
            </li>
            <li className="list-group-item">
              <b>Gender : </b>
              {student["gender"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}
