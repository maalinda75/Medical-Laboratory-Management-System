import React, { useState } from "react";
import axios from "axios";
import SideNav from "./SideNav.js";

export default function AddTest() {
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!testName) {
      formIsValid = false;
      errors["testName"] = "Test name cannot be empty";
    }

    if (!testType) {
      formIsValid = false;
      errors["testType"] = "Test type cannot be empty";
    }

    if (!date) {
      formIsValid = false;
      errors["date"] = "Date cannot be empty";
    }

    if (!price) {
      formIsValid = false;
      errors["price"] = "Price cannot be empty";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      formIsValid = false;
      errors["price"] = "Price should be a valid number with up to 2 decimal places";
    }

    setErrors(errors);
    return formIsValid;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const newTest = {
        testName,
        testType,
        date,
        price,
      };

      axios
        .post("http://localhost:8070/test/add", newTest)
        .then((res) => {
          console.log(res.data);
          alert("Test Added");
          setTestName("");
          setTestType("");
          setDate("");
          setPrice("");
        })
        .catch((err) => {
          console.error(err);
          alert("Error adding test: " + err.message);
        });
    }
  }

  return (
    <>
      <SideNav />
      <div className="container-ph">
        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <h1>Add Test</h1>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="testName">
                Test Name:
              </label>
              <input
                type="text"
                className={`form-control ${errors["testName"] ? "is-invalid" : ""}`}
                id="testName"
                placeholder="Test Name"
                value={testName}
                onChange={(event) => {
                  setTestName(event.target.value);
                }}
              />
              {errors["testName"] && (
                <div className="invalid-feedback">{errors["testName"]}</div>
              )}
            </div>
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="testType">
                Test Type:
              </label>
              <input
                type="text"
                className={`form-control ${errors["testType"] ? "is-invalid" : ""}`}
                id="testType"
                placeholder="Test Type"
                value={testType}
                onChange={(event) => {
                  setTestType(event.target.value);
                }}
              />
              {errors["testType"] && (
                <div className="invalid-feedback">{errors["testType"]}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="date">
                Date:
              </label>
              <input
                type="date"
                className={`form-control ${errors["date"] ? "is-invalid" : ""}`}
                id="date"
                placeholder="Date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              {errors["date"] && (
                <div className="invalid-feedback">{errors["date"]}</div>
              )}
            </div>
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="price">
                Price:
              </label>
              <input
                type="text"
                className={`form-control ${errors["price"] ? "is-invalid" : ""}`}
                id="price"
                placeholder="Test Price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              {errors["price"] && (
                <div className="invalid-feedback">{errors["price"]}</div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Test
          </button>
        </form>
      </div>
    </>
  );
}
