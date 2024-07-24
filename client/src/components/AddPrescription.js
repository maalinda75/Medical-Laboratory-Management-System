import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import jsPDF from "jspdf";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import GenerateReport from './GenerateReport'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddReport({ closeModal, reportDetails }) {
  const id = reportDetails.id;
  const { patientName, notes, patientEmail, patientAge, doctorName, doctorEmail } = reportDetails;
  const [medicine, setMedicine] = useState([]);
  const [newMedicine, setNewMedicine] = useState("");
  const [upload, setUpload] = useState(false);
  const [reportURL, setReportURL] = useState("");
  const [validated, setValidated] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [showReport, setShowReport] = useState(false);


  const [inputdata, setInputdata] = useState({
    patientName: "",
    patientCont: "",
    patientEmail: "",
    patientTest: ""
})
  const [selected, setSelected] = useState([] || null);
  const [isOpen, setIsOpen] = useState(false);
    {/*const [patientName, setpatientName] = useState('');
    const [notes , setnotes ] = useState('');
    const [patientEmail, setpatientEmail] = useState('');
    const [patientAge, setpatientAge] = useState('');
    const [doctorName, setdoctorName] = useState('');
const [doctorEmail, setdoctorEmail] = useState('');*/}
    const [reportID, setreportID] = useState('');
    const [reportDate, setreportDate] = useState('');
    const [reportTime, setreportTime] = useState('');
    const [testResult, settestResult] = useState('');
    const [Interpretation, setInterpretation] = useState('');
    const [testStatus, settestStatus] = useState('');
    const [comment, setcomment] = useState('');
    const [Technology, setTechnology] = useState('');
    const navigate = useNavigate();

    const editField = (event) => {
        const { name, value } = event.target;
        switch (name) {
            
            case 'reportID':
                setreportID(value);
                break;
            case 'reportDate':
                setreportDate(value);
                break;
            case 'reportTime':
                setreportTime(value);
                break;
            case 'testResult':
                settestResult(value);
                break;
            case 'Interpretation':
                setInterpretation(value);
                break;
            case 'testStatus':
                settestStatus(value);
                break;
            case 'comment':
                setcomment(value);
                break;
            case 'Technology':
                setTechnology(value);
                break;
            default:
                break;

                {/*case 'patientName':
                setpatientName(value);
                break;
            case 'notes ':
                setnotes (value);
                break;
            case 'patientEmail':
                setpatientEmail(value);
                break;
            case 'patientAge':
                setpatientAge(value);
                break;
            case 'doctorName':
                setdoctorName(value);
                break;
            case 'doctorEmail':
                setdoctorEmail(value);
        break;*/}
        }
    };

    const gotoreportpdf = () => {
      navigate('/reportpdf');
    };
    

    const reportInfo = { patientName, notes , patientEmail, patientAge, doctorName, doctorEmail, reportID, reportDate, reportTime, testResult, Interpretation, testStatus, comment, Technology };

  function generateReport(event) {
    event.preventDefault();

    if (medicine.length !== 0) {
      alert("No details were added");
    } else {
      generateLink();
      setUpload(true);
    }

    function generateLink() {
  

      const doc = new jsPDF("portrait", "px", [200, 360], false);
      
      const margin = 10;
      let yPos = margin;
      
      // Header Section
      doc.setFillColor(173, 216, 230); // Light blue color
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F'); // Header background
      doc.setFont("helvetica"); // Using a built-in font for consistency
      doc.setFontSize(18);
      doc.setTextColor(255); // White text color
      doc.text("Lab Report", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" }); // Title centered
      
      // Logo
      const logoImg = new Image(); // Assuming you have a logo image
      logoImg.src = "./logo.png"; // Replace with your logo path
      const logoWidth = 40;
      const logoHeight = 20;
      doc.addImage(logoImg, 'JPEG', doc.internal.pageSize.getWidth() - margin - logoWidth, margin, logoWidth, logoHeight); // Logo positioned to the right
      
      yPos += 30;
      
      // Draw card-like sections
      const cardMargin = 5;
      const cardPadding = 5;
      const cardBackground = [255, 255, 204]; // Light yellow color
      
      // Patient Details Section
      doc.setFillColor(...cardBackground);
      doc.rect(margin, yPos, doc.internal.pageSize.getWidth() - 2 * margin, 80, 'F'); // Patient section background
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0); // Red title color for the first card
      doc.text("Patient Details", margin + cardPadding, yPos + cardPadding);
      doc.setFontSize(8); // Decreased font size for card details
      doc.setTextColor(0); // Black text color for body details
      doc.text(margin + cardPadding, yPos + 20, "Name: " + patientName);
      doc.text(margin + cardPadding, yPos + 35, "Contact No: " + notes);
      doc.text(margin + cardPadding, yPos + 50, "Email: " + patientEmail);
      doc.text(margin + cardPadding, yPos + 65, "Age: " + patientAge);
      
      yPos += 80 + cardMargin;
      
      // Lab Incharge Details Section
      doc.setFillColor(...cardBackground);
      doc.rect(margin, yPos, doc.internal.pageSize.getWidth() - 2 * margin, 60, 'F'); // Lab incharge section background
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0); // Red title color for the second card
      doc.text("Lab Incharge Details", margin + cardPadding, yPos + cardPadding);
      doc.setFontSize(8); // Decreased font size for card details
      doc.setTextColor(0); // Black text color for body details
      doc.text(margin + cardPadding, yPos + 20, "Lab Assistant: " + doctorName);
      doc.text(margin + cardPadding, yPos + 35, "Lab Assistant Email: " + doctorEmail);
      
      yPos += 60 + cardMargin;
      
      // Report Details Section
      doc.setFillColor(...cardBackground);
      doc.rect(margin, yPos, doc.internal.pageSize.getWidth() - 2 * margin, 150, 'F'); // Report details section background
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0); // Red title color for the third card
      doc.text("Report Details", margin + cardPadding, yPos + cardPadding);
      doc.setFontSize(8); // Decreased font size for card details
      doc.setTextColor(0); // Black text color for body details
      doc.text(margin + cardPadding, yPos + 20, "Report No: " + reportID);
      doc.text(margin + cardPadding, yPos + 35, "Date: " + reportDate);
      doc.text(margin + cardPadding, yPos + 50, "Time: " + reportTime);
      doc.text(margin + cardPadding, yPos + 65, "Test Result: " + testResult);
      doc.text(margin + cardPadding, yPos + 80, "Interpretation: " + Interpretation);
      doc.text(margin + cardPadding, yPos + 95, "Test Status: " + testStatus);
      doc.text(margin + cardPadding, yPos + 110, "Comment: " + comment);
      doc.text(margin + cardPadding, yPos + 125, "Technology: " + Technology);
      
      yPos += 150 + cardMargin;
      
      // Footer
      const footerText = "CDL Medical Laboratory - Lab Report";
      doc.setTextColor(169, 169, 169); // Ash color
      doc.setFontSize(8);
      doc.text(footerText, doc.internal.pageSize.getWidth() / 2, yPos - margin, { align: "center" });
      
      // Save and open the PDF in a new tab
      {/*const blob = doc.output('blob');
    window.open(URL.createObjectURL(blob), '_blank');*/}
      
     doc.save("Report.pdf");
    setUpload(true);
    }
  }

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
    
};

const closePage = (event) => {
  event.preventDefault();
  setIsOpen(false);
  
};
const openReport = (event) => {
  event.preventDefault();
  
  setShowReport(true);
};

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  async function uploadImage(event) {
    handleSubmit(event);
    event.preventDefault();

    const imageRef = ref(storage, `prescriptions/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setReportURL(url);
        setUploaded(true);
      });
    });
  }

  async function updateDetails(event) {
    handleSubmit(event);
    event.preventDefault();

    const response = await fetch(`http://localhost:8070/report/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        reportURL,
      }),
    });

    const data = await response.json();

    if (data.status === "Prescription added") {
      alert("report added");
      closeModal(false);
      window.location.reload(false);
    } else {
      alert("Try Again");
    }
    setValidated(false);
  }


  return (
    <>
      <Modal show onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <h3 class="text-danger text-center ">Add Lab Report</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            {upload === false && (
              <Form noValidate onSubmit={generateReport}>

<h2 class="text-danger text-center text-decoration-underline"></h2>
                <h2 className="text-decoration-underline">Patient Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientName' value={patientName} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={patientName}>{patientName}</option>
                        </Form.Select>

                        <Form.Label>Patient Contact No:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='notes ' value={notes } onChange={editField} required>
                            <option value="">Select</option>
                            <option value={notes }>{notes }</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Patient Email:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientEmail' value={patientEmail} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={patientEmail}>{patientEmail}</option>
                        </Form.Select>

                        <Form.Label>Lab Test:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientAge' value={patientAge} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={patientAge}>{patientAge}</option>
                        </Form.Select>
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicEmail" className="col col-sm-6">


                        {/* <Form.Control type="name" name='patientName' value={patientName} onChange={editField} disabled /> */}

                    {/* <Form.Label>Patient Contact No:</Form.Label>
                        <Form.Control type="Number" name='notes ' value={notes } disabled />

                        <Form.Label>Patient Email:</Form.Label>
                        <Form.Control type="email" name='patientEmail' value={patientEmail} disabled />

                        <Form.Label>Lab Test:</Form.Label>
                        <Form.Control type="name" name='patientAge' value={patientAge} disabled />
                    </Form.Group> */}

                </Row>

                <Row className="mb-3">

                </Row>

                <h2 className="text-decoration-underline">Lab Incharge Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Lab Assistant</Form.Label>
                        <Form.Select
                            name="doctorName"value={doctorName} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={doctorName}>{doctorName}</option>
                        </Form.Select >

                        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                            <Form.Label>Email</Form.Label>
                            {/* <Form.Control type="name" name='doctorEmail' value={doctorEmail || {}} onChange={editField} readOnly /> */}
                            {/* <Form.Control type="hidden" name='doctorEmail' doctorEmail}/> */}
                            <Form.Select aria-label="Default select example"
                                name='doctorEmail' value={doctorEmail} onChange={editField} required>
                                <option value="">Select</option>
                                <option value={doctorEmail}>{doctorEmail}</option>
                            </Form.Select>
                        </Form.Group>
                    </Form.Group>

                </Row>

                <h2 className="text-decoration-underline">Report Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-2">
                        <Form.Label>Report No</Form.Label>
                        <Form.Control type="name" className="form-control" name='reportID' value={reportID} onChange={editField} autoComplete="off" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-5">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" className="form-control" name='reportDate' value={reportDate} onChange={editField} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-5">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" className="form-control" name='reportTime' value={reportTime} onChange={editField} required/>
                    </Form.Group>

                </Row>

                <h2 className="text-decoration-underline">Lab Test Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Test Result</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='testResult' value={testResult} onChange={editField} required>
                            <option value="">Select</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Technology</Form.Label>
                        <Form.Control type="name" className="form-control"
                            name='Technology' value={Technology} onChange={editField} autoComplete="off" required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Interpretation</Form.Label>
                        <Form.Control as="textarea" rows={3} className="form-control"
                            name='Interpretation' value={Interpretation} onChange={editField} autoComplete="off" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Test Status</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='testStatus' value={testStatus} onChange={editField} required>
                            <option >Select</option>
                            <option value="complete">Complete</option>
                            <option value="no">Not Complete</option>
                        </Form.Select>
                    </Form.Group>

                </Row>
                
                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} className="form-control"
                            name='comment' value={comment} onChange={editField} autoComplete="off" required/>
                    </Form.Group>
                </Row>
    
                
                {/*<Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="id">
                    <Form.Label>Report ID</Form.Label>
                    <Form.Control disabled placeholder={id} />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="patientName">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={patientName}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={notes}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="patientEmail">
                    <Form.Label>Patient Email</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={patientEmail}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="patientAge">
                    <Form.Label>Patient Age</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={patientAge}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="doctorName">
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={doctorName}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="doctorEmail">
                    <Form.Label>Doctor Email</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={doctorEmail}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="specialization">
                    <Form.Label>Medicine</Form.Label>
                    <Form.Control
                      type="text"
                      minLength={3}
                      aria-describedby="inputGroupPrepend"
                      onChange={(event) => setNewMedicine(event.target.value)}
                    />
                    <Button
                      onClick={() => {
                        if (newMedicine.length === 0) {
                        } else {
                          setMedicine([...medicine, newMedicine]);
                        }
                      }}
                    >
                      Add To List
                    </Button>
                    </Form.Group>
                  <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>Medicine List</Form.Label>
                    <textarea
                      required
                      class="form-control"
                      disabled
                      type="text"
                      value={medicine}
                    />
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        setMedicine([]);
                      }}
                    >
                      Clear List
                    </Button>
                  </Form.Group>
                    </Row>*/}
                    <Row>
                    <div className='d-flex justify-content-evenly'>
                    <Button type="submit" >Generate Report</Button>
                    
                       </div>
                </Row>

                
                
              </Form>
            )}
            {upload === true && uploaded === false && (
              <Form noValidate validated={validated} onSubmit={uploadImage}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="url">
                    <Form.Label>Upload Report</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={imageUpload == null}
                    >
                      {imageUpload == null && "Image is required"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit">Upload</Button>
              </Form>
            )}
            {uploaded === true && (
              <Form noValidate validated={validated} onSubmit={updateDetails}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="url">
                    <Form.Label>Upload Report</Form.Label>
                    <Form.Control
                      disabled
                      required
                      type="text"
                      placeholder={imageUpload.name}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit">Add Report</Button>
              </Form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddReport;
