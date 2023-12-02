import React, { useEffect, useState, useCallback } from "react"
import moment from "moment"
import SweetAlert from "react-bootstrap-sweetalert"
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
import { useRef } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Webcam from "react-webcam"
import axios from "axios"
import { get, post, put } from "../../helpers/api_helper"
import { connect } from "react-redux"
import { popup } from "leaflet"
import { compileString } from "sass"

const AddStudent = props => {
  const [name, setName] = useState(props.student.name)
  const [uid, setUid] = useState(props.student.uid)
  const [statsNo, setStatsNo] = useState(props.student.sats_no)
  const [dob, setDob] = useState(
    moment(props.student.date_of_birth).format("YYYY-MM-DD")
  )
  const [studentAdhar, setStudentAdhar] = useState(props.student.student_adhar)
  const [fatherName, setFatherName] = useState(props.student.father_name)
  const [fatherAdhar, setFatherAdhar] = useState(props.student.father_adhar)
  const [fatherMobile, setFatherMobile] = useState(props.student.father_number)
  const [motherName, setMotherName] = useState(props.student.mother_name)
  const [motherMobileNumber, setMotherMobileNumber] = useState(
    props.student.mother_number
  )
  const [motherAdhar, setMotherAdhar] = useState(props.student.mother_adhar)
  const [guardian, setGuardian] = useState(props.student.guardian)
  const [primaryMobileNumber, setPrimaryMobileNumber] = useState(
    props.student.primary_mobile_no
  )
  const [secondaryMobileNumber, setSecondaryMobileNumber] = useState(
    props.student.secondary_mobile_no
  )
  const [address1, setAddress1] = useState(props.student.address_line1)
  const [address2, setAddress2] = useState(props.student.address_line2)

  const [street, setStreet] = useState(props.student.street)
  const [city, setCity] = useState(props.student.city)
  const [state, setState] = useState(props.student.state)
  const [zip, setZip] = useState(props.student.zip_code)
  const [nationality, setNationality] = useState(props.student.nationality)
  const [religion, setReligion] = useState(props.student.religion)
  const [caste, setCaste] = useState(props.student.caste)
  const [subCaste, setSubCaste] = useState(props.student.sub_caste)
  const [annualIncome, setAnnualIncome] = useState(props.student.annual_income)
  const [admissionDate, setAdmissionDate] = useState(
    moment(props.student.admission_date).format("YYYY-MM-DD")
  )
  const [tcNumber, setTcnumber] = useState(props.student.tc_number)
  const [totalFees, setTotalFees] = useState(props.student.totalFees)
  const [studentClass, setStudentClass] = useState(props.student.class)
  const [studentRemart, setStudentRemark] = useState(
    props.student.student_remark
  )
  const [isValid, setIsValid] = useState(false)

  const [imageModal, setImageModal] = useState(false)
  const [imgSrc, setImgSrc] = useState(props.student.profile)
  const [gender, setGender] = useState(props.student.gender)
  const [success, setsuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const webcamRef = useRef(null)
  const [captureTYpe, setCaptureType] = useState("")
  const [fatherProfile, setFatherProfile] = useState(
    props.student.father_profile
  )
  const [motherProfile, setMotherProfile] = useState(
    props.student.mother_profile
  )

  const capture = () => {
    const image = webcamRef.current.getScreenshot()
    // console.log(captureTYpe)
    if (captureTYpe === "student") {
      setImgSrc(image)
    } else if (captureTYpe === "father") {
      setFatherProfile(image)
    } else if (captureTYpe === "mother") {
      setMotherProfile(image)
    }
    setImageModal(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleValidation()
    let data = {
      name: name,
      class: studentClass,
      uid: uid,
      sats_no: statsNo,
      date_of_birth: dob,
      student_adhar: studentAdhar,
      father_name: fatherName,
      father_adhar: fatherAdhar,
      father_number: fatherMobile,
      mother_name: motherName,
      mother_adhar: motherAdhar,
      mother_number: motherMobileNumber,
      guardian: guardian,
      address_line1: address1,
      address_line2: address2,
      street: street,
      city: city,
      state: state,
      zip_code: zip,
      primary_mobile_no: primaryMobileNumber,
      secondary_mobile_no: secondaryMobileNumber,
      nationality: nationality,
      religion: religion,
      caste: caste,
      sub_caste: subCaste,
      annual_income: annualIncome,
      admission_date: admissionDate,
      tc_number: tcNumber,
      profile: imgSrc,
      student_remark: studentRemart,
      father_profile: fatherProfile,
      mother_profile: motherProfile,
    }

    if (isValid) {
      if (props.isEdit) {
        put(`/editStudent/${uid}`, data)
          .then(res => {
            setsuccess(true)
            props.refreshTable()
          })
          .catch(err => {
            console.log(err)
            
            setFailure(true)
            alert("Backend Error, Contact administrator " + err);
          })
      } else {
        post("/addStudent", data)
          .then(res => {
            setsuccess(true)
            props.refreshTable()
          })
          .catch(err => {
            console.log(err)
            setFailure(true)
            alert("Backend Error, Contact administrator " + err);
          })
      }
    }
  }

  function togModal(type) {
    setCaptureType(type)
    setImageModal(!imageModal)
  }

  const handleValidation = () => {
    if (
      name !== "" &&
      studentClass !== "" &&
      uid !== "" &&
      statsNo !== "" &&
      dob !== "" &&
      studentAdhar !== "" &&
      fatherName !== "" &&
      fatherAdhar !== "" &&
      fatherMobile !== "" &&
      motherName !== "" &&
      motherAdhar !== "" &&
      motherMobileNumber !== "" &&
      primaryMobileNumber !== "" &&
      address1 !== "" &&
      city !== "" &&
      state !== "" &&
      zip !== "" &&
      nationality !== "" &&
      religion !== "" &&
      caste !== "" &&
      annualIncome !== "" &&
      tcNumber !== "" &&
      admissionDate !== "" &&
      imgSrc !== ""
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }
  return (
    <React.Fragment>
      {success ? (
        <SweetAlert
          title="Student Saved Successfully"
          success
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess(false)
            props.closeModal()
          }}
          // onCancel={() => {
          //   setsuccess_msg(false)
          // }}
        ></SweetAlert>
      ) : null}
      {failure ? (
        <SweetAlert
          title="Failed to Save Student"
          error
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setFailure(false)
            props.closeModal()
          }}
          // onCancel={() => {
          //   setsuccess_msg(false)
          // }}
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
              {/* <h4 className="card-title">Add Student Details</h4> */}
              {/* <p className="card-title-desc">
                Provide valuable, actionable feedback to your users with
                HTML5 form validation–available in all our supported
                browsers.
                  </p> */}
              <AvForm className="needs-validation">
                <Row className="mr-2 justify-content-between">
                  <Col md="3">
                    <div className="mb-3 d-flex flex-column">
                      <Label htmlFor="validationCustom01">
                        Student Profile
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
                  <Col md="3">
                    <div className="mb-3 d-flex flex-column">
                      <Label htmlFor="validationCustom01">Father Profile</Label>
                      <img
                        width={"150px"}
                        height={"130px"}
                        src={fatherProfile}
                      />
                    </div>
                    <Button
                      color="primary"
                      type="submit"
                      size="md"
                      onClick={() => togModal("father")}
                    >
                      Capture Photo
                    </Button>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 d-flex flex-column">
                      <Label htmlFor="validationCustom01">Mother Profile</Label>
                      <img
                        width={"150px"}
                        height={"130px"}
                        src={motherProfile}
                      />
                    </div>
                    <Button
                      color="primary"
                      type="submit"
                      size="md"
                      onClick={() => togModal("mother")}
                    >
                      Capture Photo
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" lg="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">Student Name</Label>
                      <AvField
                        name="studentName"
                        placeholder="Student Name"
                        type="text"
                        onChange={e => {
                          setName(e.target.value)
                          handleValidation()
                        }}
                        value={name}
                        errorMessage="Enter Student Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
                      />
                    </div>
                  </Col>

                  <Col md="6" lg="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">Class</Label>

                      <AvField
                        type="select"
                        name="studentClass"
                        placeholder="Class"
                        onChange={e => {
                          setStudentClass(e.target.value)
                          handleValidation()
                        }}
                        value={studentClass}
                        errorMessage="Enter Student Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
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

                  <Col md="6" lg="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom02">UID</Label>
                      <AvField
                        name="uid"
                        value={uid}
                        onChange={e => {
                          setUid(e.target.value)
                          handleValidation()
                        }}
                        disabled={props.isEdit}
                        //onChange={e => setUid(e.target.value)}
                        placeholder="UID"
                        type="text"
                        errorMessage="Enter UID"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom30">Gender</Label>

                      <AvField
                        type="select"
                        name="gender"
                        placeholder="Gender"
                        onChange={e => {
                          setGender(e.target.value)
                          handleValidation()
                        }}
                        value={studentClass}
                        errorMessage="Select gender"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom30"
                      >
                        <option>--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </AvField>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom04">Date Of Birth</Label>
                      <AvField
                        name="dob"
                        placeholder="Date Of Birth"
                        type="date"
                        value={dob}
                        onChange={e => {
                          setDob(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setDob(e.target.value)}
                        errorMessage="Enter Date Of Birth"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom04"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom05">
                        Student Adhar Number(12 Digit)
                      </Label>
                      <AvField
                        name="studentAdhar"
                        placeholder="Student Adhar (12 Digit)"
                        type="number"
                        value={studentAdhar}
                        onChange={e => {
                          setStudentAdhar(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setStudentAdhar(e.target.value)}
                        errorMessage="Enter Student Adhar Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom05"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom06">Father Name</Label>
                      <AvField
                        name="fatherName"
                        placeholder="Father Name"
                        type="text"
                        value={fatherName}
                        onChange={e => {
                          setFatherName(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setFatherName(e.target.value)}
                        errorMessage="Enter Father Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom06"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom07">
                        Father Adhar Number(12 Digit)
                      </Label>
                      <AvField
                        name="fatherAdhar"
                        placeholder="Father Adhar (12 Digit)"
                        type="number"
                        value={fatherAdhar}
                        onChange={e => {
                          setFatherAdhar(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setFatherAdhar(e.target.value)}
                        errorMessage="Enter Father Adhar Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom07"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom08">
                        Father Mobile Number
                      </Label>
                      <AvField
                        name="fatherMobileNumber"
                        placeholder="  Father Mobile Number"
                        type="number"
                        value={fatherMobile}
                        onChange={e => {
                          setFatherMobile(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setFatherMobile(e.target.value)}
                        errorMessage="Enter   Father Mobile Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom08"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom09">Mother Name</Label>
                      <AvField
                        name="motherName"
                        placeholder="Mother Name"
                        type="text"
                        value={motherName}
                        onChange={e => {
                          setMotherName(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setMotherName(e.target.value)}
                        errorMessage="Enter Mother Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom09"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom10">
                        Mother Adhar Number(12 Digit)
                      </Label>
                      <AvField
                        name="motherAdhar"
                        placeholder="Mother Adhar (12 Digit)"
                        type="number"
                        value={motherAdhar}
                        onChange={e => {
                          setMotherAdhar(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setMotherAdhar(e.target.value)}
                        errorMessage="Enter Mother Adhar Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom10"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom11">
                        Mother Mobile Number
                      </Label>
                      <AvField
                        name="motherMobileNumber"
                        placeholder="  Mother Mobile Number"
                        type="number"
                        value={motherMobileNumber}
                        onChange={e => {
                          setMotherMobileNumber(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setMotherMobileNumber(e.target.value)}
                        errorMessage="Enter Mother Mobile Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom11"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom12">Guardian Name</Label>
                      <AvField
                        name="guardian"
                        placeholder="Guardian Name"
                        type="text"
                        value={guardian}
                        onChange={e => {
                          setGuardian(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setGuardian(e.target.value)}
                        errorMessage="Enter Guardian Name"
                        className="form-control"
                        validate={{ required: { value: false } }}
                        id="validationCustom12"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom13">
                        Primary Mobile Number
                      </Label>
                      <AvField
                        name="primaryMobileNumber"
                        placeholder="Primary Mobile Number"
                        type="number"
                        value={primaryMobileNumber}
                        onChange={e => {
                          setPrimaryMobileNumber(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setPrimaryMobileNumber(e.target.value)}
                        errorMessage="Enter Primary Mobile Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom13"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom14">
                        Secondary Mobile Number
                      </Label>
                      <AvField
                        name="secondaryMobileNumber"
                        placeholder="Secondary Mobile Number"
                        type="number"
                        value={secondaryMobileNumber}
                        onChange={e => {
                          setSecondaryMobileNumber(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setSecondaryMobileNumber(e.target.value)}
                        errorMessage="Enter Secondary Mobile Number"
                        className="form-control"
                        validate={{ required: { value: false } }}
                        id="validationCustom14"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom15">Address Line 1</Label>
                      <AvField
                        name="address1"
                        placeholder="Address Line 1"
                        type="text"
                        value={address1}
                        onChange={e => {
                          setAddress1(e.target.value)
                          handleValidation()
                        }}
                        // onChange={e => setAddress1(e.target.value)}
                        errorMessage="Enter Address Line 1"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom15"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom16">Address Line 2</Label>
                      <AvField
                        name="address2"
                        placeholder="Address Line 2"
                        type="text"
                        value={address2}
                        onChange={e => {
                          setAddress2(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setAddress2(e.target.value)}
                        errorMessage="Enter Address Line 2"
                        className="form-control"
                        validate={{ required: { value: false } }}
                        id="validationCustom16"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom17">Street</Label>
                      <AvField
                        name="street"
                        placeholder="Street"
                        type="text"
                        value={street}
                        onChange={e => {
                          setStreet(e.target.value)
                          handleValidation()
                        }}
                        // onChange={e => setStreet(e.target.value)}
                        errorMessage="Enter Street"
                        className="form-control"
                        validate={{ required: { value: false } }}
                        id="validationCustom17"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom18">City</Label>
                      <AvField
                        name="city"
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={e => {
                          setCity(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setCity(e.target.value)}
                        errorMessage=" Please provide a valid city."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom18"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom18">State</Label>
                      <AvField
                        name="state"
                        placeholder="State"
                        type="text"
                        value={state}
                        onChange={e => {
                          setState(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setState(e.target.value)}
                        errorMessage="Please provide a valid state."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom18"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom19">Zip</Label>
                      <AvField
                        name="zip"
                        placeholder="Zip Code"
                        type="text"
                        value={zip}
                        onChange={e => {
                          setZip(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setZip(e.target.value)}
                        errorMessage=" Please provide a valid zip."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom19"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom20">Nationality</Label>
                      <AvField
                        name="nationality"
                        placeholder="Nationality"
                        type="text"
                        value={nationality}
                        onChange={e => {
                          setNationality(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setNationality(e.target.value)}
                        errorMessage="Enter Nationality"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom20"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom21">Religion</Label>
                      <AvField
                        name="religion"
                        placeholder="Religion"
                        type="text"
                        value={religion}
                        onChange={e => {
                          setReligion(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setReligion(e.target.value)}
                        errorMessage="Enter Religion"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom21"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom22">Caste</Label>
                      <AvField
                        name="caste"
                        placeholder="Caste"
                        type="text"
                        value={caste}
                        onChange={e => {
                          setCaste(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setCaste(e.target.value)}
                        errorMessage="Enter Caste"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom22"
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom23">Sub Caste</Label>
                      <AvField
                        name="subCaste"
                        placeholder="Sub Caste"
                        type="text"
                        value={subCaste}
                        onChange={e => {
                          setSubCaste(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setSubCaste(e.target.value)}
                        errorMessage="Enter Sub Caste"
                        className="form-control"
                        validate={{ required: { value: false } }}
                        id="validationCustom23"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom24">Annual Income</Label>
                      <AvField
                        name="annualIncome"
                        placeholder="Annual Income"
                        type="text"
                        value={annualIncome}
                        onChange={e => {
                          setAnnualIncome(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setAnnualIncome(e.target.value)}
                        errorMessage="Enter Annual Income"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom24"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom25">
                        Addmission Date
                      </Label>
                      <AvField
                        name="admissionDate"
                        placeholder="Addmission Date"
                        type="date"
                        value={admissionDate}
                        onChange={e => {
                          setAdmissionDate(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setAdmissionDate(e.target.value)}
                        errorMessage="Enter Addmission Date"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom25"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom26">Tc Number</Label>
                      <AvField
                        name="tcNo"
                        placeholder="Tc Number"
                        type="text"
                        value={tcNumber}
                        onChange={e => {
                          setTcnumber(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setTcnumber(e.target.value)}
                        errorMessage="Enter Tc Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom26"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom26">Student Remark</Label>
                      <AvField
                        name="studentRemart"
                        placeholder="Student Remark"
                        type="text"
                        value={studentRemart}
                        onChange={e => {
                          setStudentRemark(e.target.value)
                          handleValidation()
                        }}
                        //onChange={e => setStudentRemark(e.target.value)}
                        errorMessage="Enter Student Remark"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom26"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">Sats No</Label>
                      <AvField
                        name="satsNo"
                        placeholder="Sats No"
                        type="text"
                        value={statsNo}
                        onChange={e => {
                          setStatsNo(e.target.value)
                          handleValidation()
                        }}
                        // onChange={e => setStatsNo(e.target.value)}
                        errorMessage="Enter Sats No"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                </Row>
                <Button
                  disabled={!isValid}
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
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

export default AddStudent
