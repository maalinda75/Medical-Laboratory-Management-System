import React, { useState } from "react";
import axios from "axios";
import "../styles/Addgoal.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Addgoal() {
  const navigate = useNavigate();
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [notes, setNotes] = useState("");
  let id = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newGoal = {
      daysPerWeek,
      notes,
    };

    console.log(daysPerWeek);

    try {
      const response = await axios.post(
        "http://localhost:8070/goals/add",
        newGoal
      );
      console.log(response);
      if (response.status === 200) {
        id = response.data.goalId;
        alert("Goal added successfully");
        navigate(`/getgoal/${id}`);
      } else {
        alert("Error adding goal");
      }
    } catch (error) {
      alert("Error adding goal.POST request failed.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bigcontainer">
        <h1>Set Your Schedule</h1>
        <div className="description-container">
          <p>
            You're more likely to reach your goal if you dedicate some days for
            complete your schedule. Select the number of days and choose the
            days that work for you.
          </p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <form onSubmit={handleSubmit}>
            <label>
              Days per week:
              <input
                required
                type="number"
                value={daysPerWeek}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  if (value >= 0 && value <= 7) {
                    setDaysPerWeek(value);
                  }
                }}
                min="0"
                max="7"
              />
            </label>
            <label>
              Notes:
              <br />
              <textarea
                type="text"
                placeholder="Any notes.."
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addgoal;
