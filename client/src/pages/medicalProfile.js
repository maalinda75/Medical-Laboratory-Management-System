import React, { useEffect, useState } from "react";

function MedicalProfile() {
  const email = localStorage.getItem("userEmail");
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    async function fetchReportData(id) {
      const response = await fetch(`http://localhost:8070/report/get/${id}`, {
        method: "GET",
      });

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
      <div>
        <table class="table" style={{ width: "70%", margin: "auto" }}>
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Status</th>
              <th scope="col">Attachments</th>
              <th scope="col">Prescription</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {reportData.map((report, index) => {
              return (
                <tr>
                  <th scope="row">{report.id}</th>
                  <td>{report.doctorName}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      disabled
                      style={{ marginRight: "30px" }}
                    >
                      {report.status}
                    </button>
                  </td>
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
                  {report.prescriptionURL !== "" && (
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
                  {report.prescriptionURL === "" && <td></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalProfile;
