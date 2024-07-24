import React, { useEffect, useState } from "react";
import AddPrescription from "./AddPrescription";

function Report() {
  const email = localStorage.getItem("userEmail");
  const [reportData, setReportData] = useState([]);
  const [id, setID] = useState("");
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    async function fetchReportData(email) {
      const response = await fetch(
        `http://localhost:8070/report/get-reports/${email}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);
      if (data) {
        setReportData(data.report);
      }
    }

    fetchReportData(email);
  }, [email]);

  return (
    <div>
      <h2 style={{ marginTop: "30px", marginBottom: "100px" }}>
        Patients Report request
      </h2>
      <div>
        <table class="table" style={{ width: "70%", margin: "auto" }}>
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Patient Age</th>
              <th scope="col">Attachments</th>
              <th scope="col">Prescription</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {reportData.map((report, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{report.id}</th>
                  <td>{report.patientName}</td>
                  <td>{report.patientAge}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        window.open(report.reportURL, "_blank");
                      }}
                    >
                      View Document
                    </button>
                  </td>
                  {report.status === "Pending" && (
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setID(report.id);
                          setCloseModal(true);
                        }}
                      >
                        Add
                      </button>
                    </td>
                  )}
                  {report.status === "Reviewed" && (
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          window.open(report.prescriptionURL, "_blank");
                        }}
                      >
                        View Report
                      </button>
                    </td>
                  )}
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {closeModal && (
        <AddPrescription closeModal={setCloseModal} reportDetails={{ id, ...reportData.find(report => report.id === id) }} />
      )}
    </div>
  );
}

export default Report;
