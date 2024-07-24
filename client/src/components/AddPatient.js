import React, { useState } from "react";
import "../styles/AddPatient.css";
import axios from "axios";
import SideNav from "./SideNav.js"

export default function AddPatient() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Patient name cannot be empty";
    }

    if (!age) {
      formIsValid = false;
      errors["age"] = "Age cannot be empty";
    } else if (isNaN(age)) {
      formIsValid = false;
      errors["age"] = "Age must be a number";
    }

    if (!gender) {
      formIsValid = false;
      errors["gender"] = "Gender cannot be empty";
    }

    if (!contact) {
      formIsValid = false;
      errors["contact"] = "Contact cannot be empty";
    } else if (!/^\d{10}$/.test(contact)) {
      formIsValid = false;
      errors["contact"] = "Contact must be a 10-digit number";
    }

    if (!address) {
      formIsValid = false;
      errors["address"] = "Address name cannot be empty";
    } else if (address.length < 5) {
      formIsValid = false;
      errors["address"] = "Address must be at least 5 characters long";
    }

    if (!doctor) {
      formIsValid = false;
      errors["doctor"] = "Doctor cannot be empty";
    }

    if (!location) {
      formIsValid = false;
      errors["location"] = "Location cannot be empty";
    }

    setErrors(errors);
    return formIsValid;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const newPatient = {
        name,
        age,
        gender,
        contact,
        address,
        doctor,
        location,
      };

      axios
        .post("http://localhost:8070/pharmacist/add", newPatient)
        .then((res) => {
          alert("Patient Added");
          setName("");
          setAge("");
          setGender("");
          setContact("");
          setAddress("");
          setDoctor("");
          setLocation("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <><SideNav/>
    <div className="container-ph">
      <form onSubmit={handleSubmit} style={{width: "60%"}}>
      <h1> Add Patient </h1>
        <br></br>
        <br></br>

        <div className="row">
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="name">
              Enter Patient Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["name"] ? "is-invalid" : ""
              }`}
              id="name"
              placeholder="Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            {errors["name"] && (
              <div className="invalid-feedback">{errors["name"]}</div>
            )}
          </div>

          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="age">
              Enter your Age:
            </label>
            <input
  type="text"
  className={`form-control ${errors["age"] ? "is-invalid" : ""}`}
  id="age"
  placeholder="Age"
  value={age}
  onChange={(event) => {
    setAge(event.target.value);
  }}
/>

              
              {errors["age"] && (
              <div className="invalid-feedback">{errors["age"]}</div>
              )}
              </div>
              </div>

              <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="gender">
          Select Gender:
        </label>
        <select
          className={`form-control ${
            errors["gender"] ? "is-invalid" : ""
          }`}
          id="gender"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors["gender"] && (
          <div className="invalid-feedback">{errors["gender"]}</div>
        )}
      </div>

      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="contact">
          Enter Contact Number:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["contact"] ? "is-invalid" : ""
          }`}
          id="contact"
          placeholder="Contact Number"
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
          }}
        />
        {errors["contact"] && (
          <div className="invalid-feedback">{errors["contact"]}</div>
        )}
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="address">
          Enter Address:
        </label>
        <textarea
          className={`form-control ${
            errors["address"] ? "is-invalid" : ""
          }`}
          id="address"
          placeholder="Address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        ></textarea>
        {errors["address"] && (
          <div className="invalid-feedback">{errors["address"]}</div>
        )}
      </div>

      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="doctor">
          Enter Doctor's Name:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["doctor"] ? "is-invalid" : ""
          }`}
          id="doctor"
          placeholder="Doctor's Name"
          value={doctor}
          onChange={(event) => {
            setDoctor(event.target.value);
          }}
        />
        {errors["doctor"] && (
          <div className="invalid-feedback">{errors["doctor"]}</div>
        )}
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="location">
          Enter Location:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["location"] ? "is-invalid" : ""
          }`}
          id="location"
          placeholder="Location"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        {errors["location"] && (
          <div className="invalid-feedback">{errors["location"]}</div>
        )}
      </div>
    </div>
   

  


<button type="submit" className="btn btn-primary">
  Submit
</button>


</form>
</div>
</>
);
}



