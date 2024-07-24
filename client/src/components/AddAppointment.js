import React, { useState } from "react";
import "../styles/AppointmentStyle.css";
import axios from "axios";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddAppointment() {
  const [pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dname, setDname] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newAppointment = {
      pname,
      email,
      phone,
      dname,
      date,
      time,
    };

    axios
      .post("http://localhost:8070/appointment/add", newAppointment)
      .then(() => {
        alert("Appointment Requested");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <NavBar />
      <div>
        <Container className="my-5" style={{ width: "70%" }}>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-3">Make your Appointment Here!</h2>
              <p style={{ fontSize: "17px" }}>
                To make your appointment you can select the date and time that
                works best for you. You will also be asked to provide some basic
                information, such as your name, contact information, and reason
                for the appointment. Once you have submitted your appointment
                request, our staff will review it and confirm the appointment
                via email or phone. It's that easy!
              </p>
              <p style={{ fontSize: "17px" }}>
                If you have any questions or need assistance with the
                appointment scheduling process, please don't hesitate to contact
                us via phone or email. Our friendly and knowledgeable staff are
                always available to assist you and ensure that your appointment
                scheduling experience is as smooth and stress-free as possible.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container-app" style={{ marginTop: "-50px" }}>
        <form onSubmit={sendData} className="make-appointment-page">
          <div className="mb-3">
            <label for="pname" className="form-label">
              Patient Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="pname"
              placeholder="Enter Patient Name"
              onChange={(e) => {
                setPname(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              required
              className="form-control"
              id="email"
              placeholder="Enter Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label for="phone" className="form-label">
              Phone Number
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Numner"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label for="dname" className="form-label">
              Doctor Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="dname"
              placeholder="Enter Doctor Name"
              onChange={(e) => {
                setDname(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label for="date" className="form-label">
              Appointment Date
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="date"
              placeholder="Enter Appointment Date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label for="tiem" className="form-label">
              Appointment Time
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="time"
              placeholder="Enter Appointment Time"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </form>
      </div>
    </>
  );
}
