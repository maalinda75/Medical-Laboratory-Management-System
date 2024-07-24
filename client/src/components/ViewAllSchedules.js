import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTh } from "react-icons/fa";

const GetSchedules = () => {
  const [schedules, setSchedules] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/schedule/schedule`
        );
        console.log(response);
        if (response.status === 200) {
          setSchedules(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchedules();
  }, []);

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard");
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/schedule/schedule/`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Schedule Details.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 style={{ margin: "0 auto", textAlign: "center" }}>All schedules</h1>
      <div style={{ marginTop: "50px", marginBottom: "30px" }}>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            window.location.replace("/admin/schedule");
          }}
        >
          <FaTh className="icon" />
          <div className="text">View</div>
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            window.location.replace("/admin/search-schedule");
          }}
        >
          <FaSearch className="icon" />
          <div className="text">Search</div>
        </button>
      </div>

      <table
        className="table table-primary table-striped table-hover"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th scope="col">Schedule ID</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Materials</th>
            <th scope="col">Videos</th>
            <th scope="col">Events</th>
            <th scope="col" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule, index) => {
              return (
                <tr key={index}>
                  <td>{schedule.userID}</td>
                  <td>{schedule.docName}</td>
                  <td>{schedule.materials}</td>
                  <td>{schedule.videos}</td>
                  <td>{schedule.events}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => copyToClipboard(schedule._id)}
                    >
                      Copy
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(`/update-schedule/${schedule._id}`);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        navigate(`/delete-schedule/${schedule._id}`);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default GetSchedules;
