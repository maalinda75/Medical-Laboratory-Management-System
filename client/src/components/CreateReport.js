import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink, useParams, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateReport from './GenerateReport'
import FormSelect from "react-bootstrap/esm/FormSelect";
import Sidebar from '../sidebar/Header2'


export default function CreateReport() {

    const [selected, setSelected] = useState([] || null);

    const [inputdata, setInputdata] = useState({
        patientName: "",
        patientCont: "",
        patientEmail: "",
        patientTest: ""
    })

    //get single request data
    const { id } = useParams("");
    console.log(id);

    const getrequestdata = async () => {
        const res = await fetch(`http://localhost:3000/getrequest/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getrequestdata();
    }, [])

    //Get Assistant data
    const [getassis, SetGetassis] = useState([]);
    console.log(getassis)

    const getassisdata = async () => {

        const res = await fetch("http://localhost:3000/getassis", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            SetGetassis(data)
        }
    }

    useEffect(() => {
        getassisdata();
    }, [])

    // ------------------------------------------------------------------------------------------
    const [isOpen, setIsOpen] = useState(false);
    const [patientName, setpatientName] = useState('');
    const [patientCont, setpatientCont] = useState('');
    const [patientEmail, setpatientEmail] = useState('');
    const [patientTest, setpatientTest] = useState('');
    const [assisName, setassisName] = useState('');
    const [assisEmail, setassisEmail] = useState('');
    const [reportID, setreportID] = useState('');
    const [reportDate, setreportDate] = useState('');
    const [reportTime, setreportTime] = useState('');
    const [testResult, settestResult] = useState('');
    const [Interpretation, setInterpretation] = useState('');
    const [testStatus, settestStatus] = useState('');
    const [comment, setcomment] = useState('');
    const [Technology, setTechnology] = useState('');

    const editField = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'patientName':
                setpatientName(value);
                break;
            case 'patientCont':
                setpatientCont(value);
                break;
            case 'patientEmail':
                setpatientEmail(value);
                break;
            case 'patientTest':
                setpatientTest(value);
                break;
            case 'assisName':
                setassisName(value);
                break;
            case 'assisEmail':
                setassisEmail(value);
                break;
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
        }
    };

    const openModal = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const reportInfo = { patientName, patientCont, patientEmail, patientTest, assisName, assisEmail, reportID, reportDate, reportTime, testResult, Interpretation, testStatus, comment, Technology };

    // -----------------------------------------------------------------------------------

    return (
        <div><Sidebar/>
        <div className='container mt-5 mb-5'>

            <form className='mt-5 shadow p-5 w-75' onSubmit={openModal}>
                <h2 class="text-danger text-center text-decoration-underline">Lab Report</h2>
                <h2 className="text-decoration-underline">Patient Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientName' value={patientName} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={inputdata.patientName}>{inputdata.patientName}</option>
                        </Form.Select>

                        <Form.Label>Patient Contact No:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientCont' value={patientCont} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={inputdata.patientCont}>{inputdata.patientCont}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Patient Email:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientEmail' value={patientEmail} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={inputdata.patientEmail}>{inputdata.patientEmail}</option>
                        </Form.Select>

                        <Form.Label>Lab Test:</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='patientTest' value={patientTest} onChange={editField} required>
                            <option value="">Select</option>
                            <option value={inputdata.patientTest}>{inputdata.patientTest}</option>
                        </Form.Select>
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicEmail" className="col col-sm-6">


                        {/* <Form.Control type="name" name='patientName' value={inputdata.patientName} onChange={editField} disabled /> */}

                    {/* <Form.Label>Patient Contact No:</Form.Label>
                        <Form.Control type="Number" name='patientCont' value={inputdata.patientCont} disabled />

                        <Form.Label>Patient Email:</Form.Label>
                        <Form.Control type="email" name='patientEmail' value={inputdata.patientEmail} disabled />

                        <Form.Label>Lab Test:</Form.Label>
                        <Form.Control type="name" name='patientTest' value={inputdata.patientTest} disabled />
                    </Form.Group> */}

                </Row>

                <Row className="mb-3">

                </Row>

                <h2 className="text-decoration-underline">Lab Incharge Details</h2>

                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Lab Assistant</Form.Label>
                        <Form.Select
                            name="assisName"
                            onChange={(e) => {
                                const c = getassis?.find((x) => x.assisName === e.target.value)
                                setSelected(c || {});
                                editField(e)
                            }}
                            value={assisName}
                            required
                        >
                            <option value="">Select</option>
                            {getassis.map((result) => {
                                return (
                                    <option key={result._id} value={result.assisName} >{result.assisName}</option>
                                )
                            })}

                        </Form.Select >

                        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                            <Form.Label>Email</Form.Label>
                            {/* <Form.Control type="name" name='assisEmail' value={selected.assisEmail || {}} onChange={editField} readOnly /> */}
                            {/* <Form.Control type="hidden" name='assisEmail' assisEmail}/> */}
                            <Form.Select aria-label="Default select example"
                                name='assisEmail' value={assisEmail} onChange={editField} required>
                                <option value="">Select</option>
                                <option value={selected.assisEmail}>{selected.assisEmail}</option>
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

                <Row>
                    <div className='d-flex justify-content-evenly'>
                        <NavLink className='btn btn-primary ms-auto' to="/allRequests">Back</NavLink>
                        <button className='btn btn-primary ms-auto' type="submit">Review Report</button>
                        <GenerateReport showModal={isOpen} closeModal={closeModal} info={reportInfo} />
                    </div>
                </Row>

            </form>

        </div >
        </div>

    )
}