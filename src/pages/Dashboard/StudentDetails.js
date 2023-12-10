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
  const [student, setStudent] = useState({})
  const [show, setShow] = useState(false)
  useEffect(async () => {
    await get(`/getAStudent/${props.uid}`)
      .then(res => {
        setStudent(res)
        setShow(true)
      })
      .catch(err => {
        alert("Backend Error, Contact administrator " + err)
        console.log(err)
      })
  }, [])
  return (
    <React.Fragment>
      {show && (
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
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
                        <img
                          width={"150px"}
                          height={"130px"}
                          src={student.profile}
                        />
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="mb-3 d-flex flex-column">
                        <Label htmlFor="validationCustom01">
                          Father Profile
                        </Label>
                        <img
                          width={"150px"}
                          height={"130px"}
                          src={student.father_profile}
                        />
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="mb-3 d-flex flex-column">
                        <Label htmlFor="validationCustom01">
                          Mother Profile
                        </Label>
                        <img
                          width={"150px"}
                          height={"130px"}
                          src={student.mother_profile}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" lg="4">
                      <div className="mb-3">
                        <Label>Student Name</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.name}
                          className="form-control"
                        />
                      </div>
                    </Col>

                    <Col md="6" lg="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom01">Class</Label>
                        <AvField
                          type="text"
                          name="class"
                          disabled
                          value={student.class}
                          className="form-control"
                        />
                      </div>
                    </Col>

                    <Col md="6" lg="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom02">UID</Label>
                        <AvField
                          type="text"
                          name="uid"
                          disabled
                          value={student.uid}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom30">Gender</Label>

                        <AvField
                          type="text"
                          name="gender"
                          disabled
                          value={student.gender}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom04">
                          Date Of Birth
                        </Label>
                        <AvField
                          type="date"
                          name="uid"
                          disabled
                          value={moment(student.date_of_birth).format(
                            "YYYY-MM-DD"
                          )}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom05">
                          Student Adhar Number(12 Digit)
                        </Label>
                        <AvField
                          type="text"
                          name="student_adhar"
                          disabled
                          value={student.student_adhar}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom06">Father Name</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.father_name}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom07">
                          Father Adhar Number(12 Digit)
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.father_adhar}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom08">
                          Father Mobile Number
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.father_number}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom09">Mother Name</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.mother_name}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom10">
                          Mother Adhar Number(12 Digit)
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.mother_adhar}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom11">
                          Mother Mobile Number
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.mother_number}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom12">
                          Guardian Name
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.guardian}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom13">
                          Primary Mobile Number
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.primary_mobile_no}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom14">
                          Secondary Mobile Number
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.secondary_mobile_no}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom15">
                          Address Line 1
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.address_line1}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom16">
                          Address Line 2
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.address_line2}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom17">Street</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.street}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom18">City</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.city}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom18">State</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.state}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom19">Zip</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.zip_code}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom20">Nationality</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.nationality}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom21">Religion</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.religion}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom22">Caste</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.caste}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom23">Sub Caste</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.sub_caste}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom24">
                          Annual Income
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.annual_income}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom25">
                          Addmission Date
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={moment(student.admission_date).format(
                            "YYYY-MM-DD"
                          )}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom26">Tc Number</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.tc_number}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom26">
                          Student Remark
                        </Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.student_remark}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="mb-3">
                        <Label htmlFor="validationCustom03">Sats No</Label>
                        <AvField
                          type="text"
                          name="name"
                          disabled
                          value={student.sats_no}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default AddStudent
