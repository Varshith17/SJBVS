import React, { useEffect, useState,useRef } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
  Modal,
} from "reactstrap"
import { Link } from "react-router-dom"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { post, put } from "../../helpers/api_helper"
import SweetAlert from "react-bootstrap-sweetalert"
import logo2 from "../../assets/images/logo-1.jpg"
import Webcam from "react-webcam"

import { connect } from "react-redux"
import moment from "moment"

const AddTeacher = props => {
  const [name, setName] = useState(props.teacher.name)
  const [classTeacher, setClassTeacher] = useState(props.teacher.class_teacher)
  const [subject, setSubject] = useState(props.teacher.subject)
  const [mobileNumber, setMobileNumber] = useState(props.teacher.mobile_no)
  const [imgSrc, setImgSrc] = useState(props.teacher.profile_picture)
  const [email, setEmail] = useState(props.teacher.mail_id)
  const [success, setsuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const webcamRef = useRef(null)
  

  function handleSubmit() {
    if (
      name !== "" &&
      classTeacher !== "" &&
      subject !== "" &&
      mobileNumber !== "" &&
      email !== ""
    ) {
      saveTeacher()
    }
  }

  const capture = () => {
    const image = webcamRef.current.getScreenshot()

    setImgSrc(image)

    setImageModal(false)
  }


  function togModal(type) {
   
    setImageModal(!imageModal)
  }

  const saveTeacher = () => {
    const data = {
      name: name,
      class_teacher: classTeacher,
      subject: subject,
      mobile_no: mobileNumber,
      mail_id: email,
      profile_picture: imgSrc,
    }
    if (!props.isEdit) {
      post("/addTeacher", data)
        .then(res => setsuccess(true))
        .catch(err => {setFailure(true)
          alert("Backend Error, Contact administrator " + err);})
      setsuccess(true)
    } else {
      put(`/editTeacher/${data.name}`, data)
        .then(res => setsuccess(true))
        .catch(err => {setFailure(true)
          alert("Backend Error, Contact administrator " + err);
        })
      setsuccess(true)
    }
  }
  return (
    <React.Fragment>
      {success ? (
        <SweetAlert
          title="Teacher Saved Successfully"
          success
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess(false)
            props.closeModal()
            props.refreshTable()
          }}
        ></SweetAlert>
      ) : null}
      {failure ? (
        <SweetAlert
          title="Error!"
          error
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setFailure(false)
            props.closeModal()
          }}
        ></SweetAlert>
      ) : null}

<Modal
        size="md"
        isOpen={imageModal}
        toggle={() => {
          togModal("")
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Capture Photo
          </h5>
          <button
            onClick={() => {
              setImageModal(false)
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Webcam
            height={500}
            width={330}
            style={{ marginTop: "-100px", marginLeft: "30px" }}
            mirrored={true}
            ref={webcamRef}
          />
          <div className="btn-container d-flex justify-content-center">
            <Button
              color="primary"
              type="submit"
              size="sm"
              style={{ width: "150px", marginTop: "-40px", zIndex: "2" }}
              onClick={capture}
            >
              Capture Photo
            </Button>
          </div>
        </div>
      </Modal>

      <Row>
        <Col xl="12">
          <Card>
            <CardBody>
              <AvForm className="needs-validation">
                <Row>
                <Col md="12">
                    <div className="mb-3 d-flex flex-column">
                      <Label htmlFor="validationCustom01">
                        Teacher Profile
                      </Label>
                      <img width={"150px"} height={"130px"} src={imgSrc} />
                    </div>
                    <Button
                      color="primary"
                      type="submit"
                      size="md"
                      onClick={() => togModal("student")}
                    >
                      Capture Photo
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">Name</Label>
                      <AvField
                        name="name"
                        placeholder="Enter Name"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        errorMessage="Enter name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom02">Class Teacher</Label>
                      <AvField
                        type="select"
                        name="classTeacher"
                        placeholder="Enter Class Teacher"
                        onChange={e => setClassTeacher(e.target.value)}
                        value={classTeacher}
                        errorMessage="Enter class Teacher"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      >
                        <option>--</option>
                        <option value="10TH">10th</option>
                        <option value="9TH">9th</option>
                        <option value="8TH">8th</option>
                        <option value="7TH">7th</option>
                        <option value="6TH">6th</option>
                        <option value="5TH">5th</option>
                        <option value="4TH">4th</option>
                        <option value="3RD">3rd</option>
                        <option value="2ND">2nd</option>
                        <option value="1ST">1st</option>
                        <option value="UKG">UKG</option>
                        <option value="LKG">LKG</option>
                        <option value="PRE-KG">PRE-KG</option>
                      </AvField>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">Subject</Label>
                      <AvField
                        name="subject"
                        placeholder="Subject"
                        type="text"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                        errorMessage="Enter Subject"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">Mobile Number</Label>
                      <AvField
                        name="mobie"
                        placeholder="Mobile Number"
                        type="number"
                        onChange={e => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                        errorMessage="Enter Mobile Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">Email</Label>
                      <AvField
                        name="email"
                        placeholder="Email"
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        errorMessage="Enter email"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                </Row>

                <Button
                  color="primary"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AddTeacher
