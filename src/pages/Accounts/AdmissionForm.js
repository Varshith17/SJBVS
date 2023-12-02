import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Col, Row, Button, Modal, Label } from "reactstrap"

import { AvField, AvForm } from "availity-reactstrap-validation"
import { post, put } from "../../helpers/api_helper"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import SweetAlert from "react-bootstrap-sweetalert"

import "../Tables/datatables.scss"
import moment from "moment"


const AdmissionForm = props => {

  const [rowsData,setRowsData] = useState([]);

  useEffect(()=>{
   
    if(props.accountsData){
      updateData(props.accountsData.admissions[0])
    }
  },[props.accountsData])


  const updateData=(dataRows)=>{
    const rowData ={
      columns: [
        {
          label: "Student Name",
          field: "student_name",
          sort: "asc",
          width: 270,
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
          width: 200,
        },
        {
          label: "Class",
          field: "class_name",
          sort: "asc",
          width: 200,
        },
        {
          label: "Paid Date",
          field: "paid_date",
          sort: "asc",
          width: 150,
        },
      ],
      rows: [...dataRows],
    }

    setData(rowData);
  }

  const [modal_large, setmodal_large] = useState(false)
  const [appicationName, setApplicationName] = useState("")
  const [amount, setAmount] = useState("")
  const [clazz, setClazz] = useState("")
  const [studentName, setStudentName] = useState("")
  const [success, setsuccess] = useState(false)
  const [failure, setFailure] = useState(false);
  const [data,setData] = useState({
    columns: [
      {
        label: "Student Name",
        field: "student_name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
        width: 200,
      },
      {
        label: "Class",
        field: "class_name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Paid Date",
        field: "paid_date",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  })

  

  function tog_large(teacher, edit) {
    setmodal_large(edit)
  }

  function handleSubmit() {
    if (amount !== "" && clazz !== "" && studentName !== "") {
      saveApplicationForm()
    }
  }

  const saveApplicationForm = () => {
    const data = {
      amount: amount,
      student_name: studentName,
      class_name: clazz,
      paid_date: moment().format("DD/MM/YYYY"),
    }

    post("/add-admission-fees", data)
      .then(res => {
        if (res.error) {
          setFailure(true)
        }
        else{
            setsuccess(true)
            props.refreshTable();
        }
      })
      .catch(err => {
        alert("Backend Error, Contact administrator " + err);
        setFailure(true)})
  }


  return (
    <div>
      {success ? (
        <SweetAlert
          title="Saved Successfully"
          success
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setsuccess(false)
            tog_large({}, false)
            // props.closeModal()
            // props.refreshTable()
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
            tog_large({}, false)
            // props.closeModal()
          }}
        ></SweetAlert>
      ) : null}

      <Modal
        size="md"
        isOpen={modal_large}
        toggle={() => {
          tog_large({}, false)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Addmission Form
          </h5>
          <button
            onClick={() => {
              tog_large({}, false)
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
          <AvForm className="needs-validation">
            <Col md="12">
              <div className="mb-3">
                <Label htmlFor="validationCustom01">Student Name</Label>
                <AvField
                  name="studentName"
                  placeholder="Student Name"
                  type="text"
                  onChange={e => setStudentName(e.target.value)}
                  value={studentName}
                  errorMessage="Enter Student name"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationCustom01"
                />
              </div>
            </Col>
            <Col md="12">
              <div className="mb-3">
                <Label htmlFor="validationCustom02">Amount</Label>
                <AvField
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                  errorMessage="Enter amount"
                  className="form-control"
                  validate={{ required: { value: true } }}
                  id="validationCustom02"
                />
              </div>
            </Col>
            <Col md="12">
              <div className="mb-3">
                <Label htmlFor="validationCustom02">Class</Label>
                <AvField
                  type="select"
                  name="classTeacher"
                  placeholder="Enter Class "
                  onChange={e => setClazz(e.target.value)}
                  value={clazz}
                  errorMessage="Enter class "
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
            <Button
              color="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </AvForm>
        </div>
      </Modal>

      <h3>Admission Form</h3>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success btn-md ms-2"
          onClick={() => tog_large({}, true)}
          style={{ height: "40px" }}
        >
          <i
            className="mdi mdi-sm mdi-account-plus-outline"
            style={{ fontSize: "16px" }}
          ></i>{" "}
          Add Admission
        </button>
      </div>
      <MDBDataTable
        entriesOptions={[20, 30, 40, 50, 60]}
        entries={20}
        responsive
        bordered
        data={data}
      />
    </div>
  )
}

export default connect(null, { setBreadcrumbItems })(AdmissionForm)
