import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Modal } from "reactstrap"
import { connect } from "react-redux"
import { get } from "../../helpers/api_helper"
import AddStudent from "./AddStudent"
import { CSVLink } from "react-csv"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

import "../Tables/datatables.scss"

const Students = props => {
  const breadcrumbItems = [{ title: "Students", link: "#" }]

  useEffect(() => {
    props.setBreadcrumbItems("Students List", breadcrumbItems)
  })

  function tog_large(student, edit) {
    setStudent(student)
    setEdit(edit)
    setmodal_large(!modal_large)
  }

  const [modal_large, setmodal_large] = useState(false)
  const [studentList, setStudentList] = useState([])
  const [student, setStudent] = useState({})
  const [edit, setEdit] = useState(false)
  const [selectedCalss, setSelectedClass] = useState("")
  const [exportData, setExportData] = useState([])

  const headers = [
    { label: "Name", key: "name" },
    { label: "Class", key: "class" },
    { label: "UID", key: "uid" },
    { lable: "DOB", key: "date_of_birth" },
    { label: "Student Adhar", key: "student_adhar" },
    { label: "Father Name", key: "father_name" },
    { label: "Father Adhar", key: "father_adhar" },
    { lable: "Father Number", key: "father_number" },
    { label: "Mother Name", key: "mother_name" },
    { label: "Mother Adhar", key: "mother_adhar" },
    { label: "Mother Number", key: "mother_number" },
    { lable: "Guardian", key: "guardian" },
    { label: "Primary Mobile number", key: "primary_mobile_no" },
    { label: "Secondary Mobile number", key: "secondary_mobile_no" },
    { label: "Address Line 1", key: "address_line1" },
    { lable: "Address Line 2", key: "address_line2" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Zip Code", key: "zip_code" },
    { lable: "Nationality", key: "nationality" },
    { label: "Religion", key: "religion" },
    { label: "Caste", key: "caste" },
    { label: "Sub Caste", key: "sub_caste" },
    { lable: "Annual Income", key: "annual_income" },
    { label: "Admission Date", key: "admission_date" },
    { label: "TC Number", key: "tc_number" },
    { lable: "Remarks", key: "student_remark" },
  ]

  useEffect(async () => {
    //getStudents(selectedCalss)
  }, [])

  const getStudents = async className => {
    setSelectedClass(className)
    await get(`/getAll/${className}`)
      .then(res => {
        setExportData(res)
        convertToTableData(res)
      })
      .catch(err =>{ console.log(err)
        alert("Backend Error, Contact administrator " + err);
      })
  }

  const convertToTableData = data => {
    const studentsList = []
    data.map(student => {
      const action = (
        <div>
          <button
            type="button"
            className="btn btn-primary btn-md ms-2"
            onClick={() => tog_large(student, true)}
          >
            <i
              className="mdi mdi-sm mdi-account-edit-outline"
              style={{ fontSize: "12px" }}
            ></i>{" "}
            Edit
          </button>
        </div>
      )
      const mobile_number = student.primary_mobile_no
      const studentAction = Object.assign(student, {
        action: action,
        mobile_number: mobile_number,
      })
      studentsList.push(studentAction)
    })
    setStudentList(data)
  }

  const refreshTable = () => {
    getStudents(selectedCalss)
  }

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "UID",
        field: "uid",
        sort: "asc",
        width: 270,
      },
      {
        label: "Class",
        field: "class",
        sort: "asc",
        width: 200,
      },
      {
        label: "Father Name",
        field: "father_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Mobile Number",
        field: "mobile_number",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [...studentList],
  }

  const handleClass = e => {
    getStudents(e.target.value)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Student List | Leads Kendriya Vidayalaya</title>
      </MetaTags>

      <Modal
        size="lg"
        isOpen={modal_large}
        toggle={() => {
          tog_large({}, false)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Add Student Details
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
          <AddStudent
            student={student}
            isEdit={edit}
            refreshTable={refreshTable}
            closeModal={() => tog_large({}, false)}
          />
        </div>
      </Modal>
      {selectedCalss === "" ? (
        <React.Fragment>
          <h3>Select class</h3>
          <Row className="mt-5 justify-content-between">
            <Col
              sm=""
              md="4"
              className="classnameselect"
              onClick={() => getStudents("PRE_KG")}
            >
              PRE-KG
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("LKG")}
            >
              LKG
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("UKG")}
            >
              UKG
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("1ST")}
            >
              1ST
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("2ND")}
            >
              2ND
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("3RD")}
            >
              3RD
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("4TH")}
            >
              4TH
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("5TH")}
            >
              5TH
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("6TH")}
            >
              6TH
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("7TH")}
            >
              7TH
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("8TH")}
            >
              8TH
            </Col>
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("9TH")}
            >
              9TH
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              md="4"
              className="classnameselect"
              onClick={() => getStudents("10TH")}
            >
              10TH
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <label style={{ fontSize: "24px" }}>
                        Select class &nbsp;
                      </label>
                      <select
                        style={{ display: "block" }}
                        className="ml-2"
                        onChange={handleClass}
                        value={selectedCalss}
                      >
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
                      </select>
                    </div>

                    {exportData.length > 0 && (
                      <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"student-list.csv"}
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-sm ms-2"
                          style={{ height: "45px", width: "100px" }}
                        >
                          <i
                            className="mdi mdi-sm mdi-microsoft-excel"
                            style={{ fontSize: "16px" }}
                          ></i>{" "}
                          Export
                        </button>
                      </CSVLink>
                    )}

                    <button
                      type="button"
                      className="btn btn-success btn-md ms-2"
                      onClick={tog_large}
                      style={{ height: "47px", width: "100px" }}
                    >
                      <i
                        className="mdi mdi-sm mdi-account-plus-outline"
                        style={{ fontSize: "16px" }}
                      ></i>{" "}
                      Add Student
                    </button>
                  </div>
                </CardTitle>
                <MDBDataTable
                  className="serachbar"
                  displayEntries={false}
                  pagesAmount={20}
                  responsive
                  bordered
                  data={data}
                  exportToCSV={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Students)
