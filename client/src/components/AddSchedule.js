import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSchedule() {
  const [materials, setMaterials] = useState("");
  const [videos, setVideos] = useState("");
  const [events, setEvents] = useState("");
  const docName = localStorage.getItem("userName");

  const navigate = useNavigate();

  function sendData(e) {
    if (e) {
      e.preventDefault();
    }

    const newSchedule = {
      materials,
      videos,
      events,
      docName,
    };

    axios
      .post("http://localhost:8070/schedule/schedule/add", newSchedule)
      .then(() => {
        alert("Schedule created.");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <h1>Create Schedule</h1>
      <div className="container-app" style={{ marginTop: "-50px" }}>
        <form onSubmit={sendData} className="make-appointment-page">
          <div className="mb-3">
            <label for="materialsC" className="form-label">
              Reading Materials
            </label>
            <input
              type="url"
              required
              id="materialsC"
              placeholder="Insert url"
              className="form-control"
              onChange={(e) => setMaterials(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="videosC" className="form-label">
              Videos
            </label>
            <input
              type="url"
              id="videosC"
              required
              className="form-control"
              placeholder="Insert url"
              onChange={(e) => setVideos(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="events" className="form-label">
              Events
            </label>
            <input
              type="url"
              id="events"
              required
              className="form-control"
              placeholder="Insert url"
              onChange={(e) => setEvents(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="docName" className="form-label">
              Doctor Name
            </label>
            <input
              type="text"
              required
              id="docName"
              placeholder={docName}
              className="form-control"
              disabled
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
