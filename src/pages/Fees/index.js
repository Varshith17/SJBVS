import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Modal } from "reactstrap"
import { connect } from "react-redux"
import AddFees from "./AddFees"
import { get } from "../../helpers/api_helper"
import AddInstallment from "./AddIntallment"
import { CSVLink } from "react-csv"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

import "../Tables/datatables.scss"

const Fees = props => {
  const breadcrumbItems = [{ title: "", link: "#" }]
  const [studentList, setStudentList] = useState([])
  const [student, setStudent] = useState([])
  const [selectedCalss, setSelectedClass] = useState("")
  const [exportData, setExportData] = useState([])

  useEffect(() => {
    props.setBreadcrumbItems("Fees Details", breadcrumbItems)
  })

  useEffect(async () => {
    //getStudents(selectedCalss)
  }, [])

  const getStudents = async className => {
    setSelectedClass(className)
    await get(`/getStudentsWithFeesStatus/${className}`)
      .then(res => convertToTableData(res.studentsWithFeesStatus))
      .catch(err =>{ 
        alert("Backend Error, Contact administrator " + err);
        console.log(err)})
  }

  const convertToTableData = data => {
    const studentsList = []
    const exportList = []
    data.map(student => {
      const action = (
        <div>
          <button
            type="button"
            className="btn btn-primary btn-md ms-2"
            onClick={() => tog_addFees(student)}
          >
            Add Fees
          </button>
        </div>
      )
      const studentAction = Object.assign(student, {
        action: action,
        fees_paid: student.fees.fees_paid,
        fees_due: student.fees.fees_due,
        total_fees: student.fees.total_fees,
      })
      const exportStudentData = Object.assign(student, {
        fees_paid: student.fees.fees_paid,
        fees_due: student.fees.fees_due,
        total_fees: student.fees.total_fees,
      })
      exportList.push(exportStudentData)
      studentsList.push(studentAction)
    })
    setStudentList(studentsList)
    setExportData(exportList)
  }

  const handleClass = e => {
    getStudents(e.target.value)
  }

  const refereshStudent = () => {
    getStudents(selectedCalss)
  }

  const headers = [
    { label: "Name", key: "name" },
    { label: "Class", key: "class" },
    { label: "UID", key: "uid" },
    { label: "Total Fees", key: "total_fees" },
    { label: "Fees Paid", key: "fees_paid" },
    { label: "Fees Due", key: "fees_due" },
  ]

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
        label: "Total Fees",
        field: "total_fees",
        sort: "asc",
        width: 100,
      },
      {
        label: "Fees Paid",
        field: "fees_paid",
        sort: "asc",
        width: 150,
      },
      {
        label: "Fees Due",
        field: "fees_due",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [...studentList],
  }

  function tog_large() {
    setmodal_large(!modal_large)
  }

  function tog_addFees(student) {
    setStudent(student)
    setAddFees(true)
  }

  const [modal_large, setmodal_large] = useState(false)
  const [addFees, setAddFees] = useState(false)

  const userType = localStorage.getItem("userType")
  return (
    <React.Fragment>
      <MetaTags>
        <title>Fees | Leads Kendriya Vidayalaya</title>
      </MetaTags>

      <Modal
        size="lg"
        isOpen={modal_large}
        toggle={() => {
          tog_large()
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Add Installments
          </h5>
          <button
            onClick={() => {
              setmodal_large(false)
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
          <AddInstallment />
        </div>
      </Modal>

      <Modal
        size="md"
        isOpen={addFees}
        toggle={() => {
          setAddFees(false)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Student Fees Details
          </h5>
          <button
            onClick={() => {
              setAddFees(false)
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
          <AddFees
            student={student}
            refereshStudent={refereshStudent}
            closeModal={() => setAddFees(false)}
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
                        filename={"student-fees-list.csv"}
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
                  </div>
                </CardTitle>
                <MDBDataTable
                  // entriesOptions={[20, 30, 40, 50, 60]}
                  // entries={20}
                  pagesAmount={20}
                  displayEntries={false}
                  responsive
                  bordered
                  responsiveSm={true}
                  data={data}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Fees)
