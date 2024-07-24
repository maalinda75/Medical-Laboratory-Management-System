// AddInventory.js

import React, { useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";

export default function AddInventory() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!itemName) {
      formIsValid = false;
      errors["itemName"] = "Item name cannot be empty";
    }

    if (!quantity) {
      formIsValid = false;
      errors["quantity"] = "Quantity cannot be empty";
    } else if (!/^\d+$/.test(quantity)) {
      formIsValid = false;
      errors["quantity"] = "Quantity should be a valid number";
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
      const newItem = {
        itemName,
        quantity,
        price,
      };

      axios
        .post("http://localhost:8070/inventory/add", newItem)
        .then((res) => {
          console.log(res.data);
          alert("Inventory Item Added");
          setItemName("");
          setQuantity("");
          setPrice("");
        })
        .catch((err) => {
          console.error(err);
          alert("Error adding inventory item: " + err.message);
        });
    }
  }

  return (
    <>
      <SideNav />
      <div className="container-ph">
        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <h1>Add Inventory Item</h1>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="itemName">
                Item Name:
              </label>
              <input
                type="text"
                className={`form-control ${errors["itemName"] ? "is-invalid" : ""}`}
                id="itemName"
                placeholder="Item Name"
                value={itemName}
                onChange={(event) => {
                  setItemName(event.target.value);
                }}
              />
              {errors["itemName"] && (
                <div className="invalid-feedback">{errors["itemName"]}</div>
              )}
            </div>
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="quantity">
                Quantity:
              </label>
              <input
                type="text"
                className={`form-control ${errors["quantity"] ? "is-invalid" : ""}`}
                id="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
              {errors["quantity"] && (
                <div className="invalid-feedback">{errors["quantity"]}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="font-weight-bold" htmlFor="price">
                Price:
              </label>
              <input
                type="text"
                className={`form-control ${errors["price"] ? "is-invalid" : ""}`}
                id="price"
                placeholder="Price"
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
            Add Inventory Item
          </button>
        </form>
      </div>
    </>
  );
}
