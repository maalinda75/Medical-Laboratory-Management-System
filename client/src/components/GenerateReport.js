import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import Form from "react-bootstrap/Form";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";


function GenerateReport(props) {
  const location = useLocation();
  const reportDetails = location.state?.reportDetails || {};
  const id = reportDetails.reportID;
  const [upload, setUpload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reportURL, setReportURL] = useState("");
  const [validated, setValidated] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  

  const generatePDF = () => {
    html2canvas(document.querySelector("#invoiceCapture"), { 
      scale: 2 // Increase the scale to 2x
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 950],
        compression: true // enable compression
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
      setUpload(true);
    });
  }
  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
};
const closeModal = () => {
  setIsOpen(false);
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
      alert("Prescription added");
      closeModal(false);
      window.location.reload(false);
    } else {
      alert("Try Again");
    }
    setValidated(false);
  }
  return (
    <div>
     
      
      
              <Form >
        <div id="invoiceCapture">
          <div className='bg-secondary text-white text-center lh-sm'>
            <div className='pt-3 pb-3'>
              <h2 className='mb-1 fw-bold'>Lab Report NO:{reportDetails.reportID || ''}</h2><br />
              <h5 className='pt-0'>CDL Medical Laboratory</h5>
            </div>
          </div>

          <div className='p-4'>
            
            <Row>
              <Col>
                <h4 className='fw-bold p-3'>Patient Details</h4>
                Patient name: {reportDetails.patientName || ''}<br/><br/>
                Patient Contact No: {reportDetails.notes || ''}<br/><br/>
                Patient Email: {reportDetails.patientEmail || ''}<br/>
              </Col>
              <Col className='mt-5'>
                Today Date: {new Date().toLocaleDateString()}<br/><br/>
                Date: {reportDetails.reportDate || ''}<br/><br/>
                Time: {reportDetails.reportTime || ''}<br/>
              </Col>
              
            </Row>
            <hr/>
            <Row>
              <Col>
                <h4 className='fw-bold p-3'>Lab Assistant Details</h4>
                Assistant Name: {reportDetails.doctorName || ''}<br /><br/>
                Assistant Email: {reportDetails.doctorEmail || ''}<br />
              </Col>
            </Row>
            <hr/>
            <Row className='p-3'>
            <h4 className='fw-bold pb-2'>Lab Test Details</h4>
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>Lab Test</th>
                    <th>Test Result</th>
                    <th>Test Status</th>
                    <th>Technology</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{reportDetails.patientAge || ''}</td>
                    <td>{reportDetails.testResult || ''}</td>
                    <td>{reportDetails.testStatus || ''}</td>
                    <td>{reportDetails.Technology || ''}</td>
                  </tr>
                </tbody>
              </table>

            </Row>
            <hr/>

            <Row>
              <h4 className='fw-bold p-3'>Interpretation</h4>
              <div className='border border-secondary  p-3 ml-3 mr-3'>
                <h6 className="font-monospace">{reportDetails.Interpretation || ''}</h6>
              </div>
            </Row>
            <hr/>

            <Row>
              <h4 className='fw-bold p-3'>Comment</h4>
              <div className='border border-secondary  p-3 ml-3 mr-3'>
                <h6 className="font-monospace">{reportDetails.comment || ''}</h6>
              </div>
            </Row>

            <hr/>
            <div className='text-center'>
             <h7 className="font-monospace text-muted">CDL Medical laboratory - Lab report</h7>
             </div>
            <hr/>
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
            <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={props.closeModal}>
  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
  Close
</Button>


            </Col>
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={generatePDF}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
        </Form>
      
      
    </div>
  )
}

export default GenerateReport;
