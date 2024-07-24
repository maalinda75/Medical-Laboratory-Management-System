import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "../styles/AllAppointment.css";

export default function AllAppointment() {
  const [column, setColumns] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    function getAppointments() {
      //how and where we get data
      axios
        .get("http://localhost:8070/appointment/")
        .then((res) => {
          //console.log(res);
          setColumns(Object.keys(res.data[0]));
          setAppointments(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppointments();
  }, []);

  console.log(column);

  if (appointments.length === 0) {
    return <p>No appointments found</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>All Appointment</h1>
      <table className="table-aa" style={{ margin: "30px auto" }}>
        <thead>
          {/* <tr>
                        {column.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr> */}

          <tr>
            {/* <th>ID</th> */}
            <th>Patient Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Doctor Name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointments, index) => (
            <tr key={index}>
              {/* <td>{appointments._id}</td> */}
              <td>{appointments.patientName}</td>
              <td>{appointments.email}</td>
              <td>{appointments.phone}</td>
              <td>{appointments.doctorName}</td>
              <td>{appointments.appointmentDate}</td>
              <td>{appointments.appointmentTime}</td>
              <td>
                <Link
                  to={`/update/${appointments._id}`}
                  className="btn btn-sm btn-update"
                >
                  Update
                </Link>
                <Link
                  to={`/delete/${appointments._id}`}
                  className="btn btn-sm ms-1 btn-delete"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
