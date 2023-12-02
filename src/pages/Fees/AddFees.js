import React, { useEffect, useState } from "react"
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
import { post } from "../../helpers/api_helper"
import SweetAlert from "react-bootstrap-sweetalert"
import logo1 from "../../assets/images/logo-1.jpg"
import logo2 from "../../assets/images/logo-2.jpg"

import { connect } from "react-redux"
import moment from "moment"
import { useTheme } from "styled-components"

const AddFees = props => {
  const [feesPaid, setFeesPaid] = useState("")
  const [modeOfPayment, setModeOfPayment] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")
  const [installment, setInstallment] = useState("")
  const [success, setsuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [showBackground, setshowBackground] = useState(false)
  const [selectedInstallment, setSelectedInstallment] = useState("")

  const inst = [
    {
      installment_number: 1,
      installment_status: "paid",
      installment_amount: 6000,
      mode_of_payment: "None",
      reference_number: "None",
      _id: "6504059f702925de021ebd87",
    },
    {
      installment_number: 2,
      installment_status: "Unpaid",
      installment_amount: 5000,
      mode_of_payment: "None",
      reference_number: "None",
      _id: "6504059f702925de021ebd88",
    },
    {
      installment_number: 1,
      installment_status: "Unpaid",
      installment_amount: 5000,
      mode_of_payment: "None",
      reference_number: "None",
      _id: "6504059f702925de021ebd89",
    },
  ]

  function handleSubmit() {
    payFees()
  }

  const handleInstallment = (number, amount) => {
    setSelectedInstallment(number)
    setFeesPaid(amount)
    setshowBackground(true)
  }

  const payFees = () => {
    const data = {
      uid: props.student.uid,
      installment_amount: parseInt(feesPaid),
      mode_of_payment: modeOfPayment,
      installment_number: parseInt(selectedInstallment),
      reference_number: referenceNumber,
      paid_date: moment().format("YYYY-MM-DD"),
    }
    post("/addFees", data)
      .then(res => setsuccess(true))
      .catch(err => {
        alert("Backend Error, Contact administrator " + err)
        setFailure(true)
      })
  }
  const school = localStorage.getItem("school")

  const [receiptModal, setReceiptModal] = useState(false)
  return (
    <React.Fragment>
      {success ? (
        <SweetAlert
          title="Payment Successful!"
          success
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess(false)
            setReceiptModal(true)
            props.refereshStudent()
          }}
        ></SweetAlert>
      ) : null}
      {failure ? (
        <SweetAlert
          title="Payment Failed!"
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
        size="lg"
        isOpen={receiptModal}
        toggle={() => {
          setReceiptModal(false)
        }}
        style={{ height: "700px" }}
      >
        <div className="modal-header">
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <img src={logo1} alt="" height="60" />

            <h3 className="modal-title mt-0" id="myLargeModalLabel">
              Shree Bhagya Jyothi Vidya Samsthe
            </h3>
            <div></div>
          </div>
          <button
            onClick={() => {
              setReceiptModal(false)
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
          {/* <AddInstallment /> */}
          <div className="d-flex justify-content-center">
            <h3 className="modal-title mt-0" id="myLargeModalLabel">
              Student Receipt
            </h3>
          </div>
          <table
            style={{
              border: "1px solid #ddd",
              borderCollapse: "collapse",
              fontSize: "18px",
              width: "100%",
            }}
          >
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Date & Time</td>
              <td>{moment().format("DD-MM-YYYY hh:mm:ss")}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Class</td>
              <td>{props.student.class}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Student Name</td>
              <td> {props.student.name}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Total Fees</td>
              <td> {props.student.total_fees}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Balance</td>
              <td> {props.student.fees_due - feesPaid}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Fees Paid</td>
              <td> {feesPaid}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Mode of Payment</td>
              <td> {modeOfPayment}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Reference Number</td>
              <td> {referenceNumber}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td>Installment</td>
              <td> {selectedInstallment}</td>
            </tr>
          </table>
          <div style={{ marginTop: "100px" }}>
            <p style={{ margin: 0 }}>204, 2nd Stage, 2nd Phase</p>
            <p style={{ margin: 0 }}>GayatriPuram</p>
            <p style={{ margin: 0 }}>Mysore, Karnataka 570019</p>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              color="secondary"
              type="submit"
              onClick={() => {
                setReceiptModal(false)
                props.closeModal()
              }}
              style={{ marginRight: "20px" }}
            >
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={() => window.print()}
            >
              <i className="fa fa-print"></i>
            </Button>
          </div>
        </div>
      </Modal>

      <Row>
        <Col xl="12">
          <Card className={`${showBackground ? "fees-progress" : ""}`}>
            <CardBody>
              <Row>
                <h4>Student Name: {props.student.name}</h4>
                <h5>Total Fees: {props.student.total_fees}</h5>
              </Row>
              <AvForm className="needs-validation">
                <Row>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">Fees Paid</Label>
                      <AvField
                        name="feesPaid"
                        placeholder="Fees Paid"
                        type="text"
                        onChange={e => setFeesPaid(e.target.value)}
                        value={feesPaid}
                        errorMessage="Enter Fees Paid"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom02">
                        Mode of Payment
                      </Label>
                      <AvField
                        type="select"
                        name="paymentMode"
                        placeholder="Mode of Payment"
                        onChange={e => setModeOfPayment(e.target.value)}
                        value={modeOfPayment}
                        errorMessage="Enter Mode of Payment"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      >
                        <option>--</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                      </AvField>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">
                        Reference Number
                      </Label>
                      <AvField
                        name="referenceNumber"
                        placeholder="Reference Number"
                        type="text"
                        onChange={e => setReferenceNumber(e.target.value)}
                        value={referenceNumber}
                        errorMessage="Enter Reference Number"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                  <Row>
                    <Col md="4">
                      <div
                        className={`${
                          props.student.fees.installments[0]
                            .installment_status === "Unpaid"
                            ? "unpaid-installment"
                            : "paid-installment"
                        } px-3 py-1 ${
                          selectedInstallment === 1 ? "paying" : ""
                        } `}
                        onClick={() => {
                          props.student.fees.installments[0]
                            .installment_status === "Unpaid" &&
                            handleInstallment(
                              1,
                              props.student.fees.installments[0]
                                .installment_amount
                            )
                        }}
                        style={{ borderRadius: "5px 5px 5px 5px" }}
                      >
                        Installment 1
                      </div>
                    </Col>
                    <Col md="4">
                      <div
                        className={`${
                          props.student.fees.installments[1]
                            .installment_status === "Unpaid"
                            ? "unpaid-installment"
                            : "paid-installment"
                        } px-3 py-1 ${
                          selectedInstallment === 2 ? "paying" : ""
                        }`}
                        style={{ borderRadius: "5px 5px 5px 5px" }}
                        onClick={() => {
                          props.student.fees.installments[1]
                            .installment_status === "Unpaid" &&
                            handleInstallment(
                              2,
                              props.student.fees.installments[1]
                                .installment_amount
                            )
                        }}
                      >
                        Installment 2
                      </div>
                    </Col>
                    <Col md="4">
                      <div
                        className={`${
                          props.student.fees.installments[2]
                            .installment_status === "Unpaid"
                            ? "unpaid-installment"
                            : "paid-installment"
                        } px-3 py-1 ${
                          selectedInstallment === 3 ? "paying" : ""
                        }`}
                        style={{ borderRadius: "5px 5px 5px 5px" }}
                        onClick={() => {
                          props.student.fees.installments[2]
                            .installment_status === "Unpaid" &&
                            handleInstallment(
                              3,
                              props.student.fees.installments[2]
                                .installment_amount
                            )
                        }}
                      >
                        Installment 3
                      </div>
                    </Col>
                  </Row>
                </Row>

                <Button
                  color="primary"
                  type="submit"
                  className="mt-3"
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

export default AddFees
