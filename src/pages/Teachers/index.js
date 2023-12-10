import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Modal } from "reactstrap"
import { connect } from "react-redux"
import { get,post,del } from "../../helpers/api_helper"
import AddTeacher from "./AddTeacher"
import { CSVLink } from "react-csv"
import SweetAlert from "react-bootstrap-sweetalert"
// import AddStudent from "./AddStudent"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

import "../Tables/datatables.scss"

const Teachers = props => {
  const breadcrumbItems = [{ title: "Teachers", link: "#" }]

  useEffect(() => {
    props.setBreadcrumbItems("Teachers List", breadcrumbItems)
  })

  function tog_large(teacher, edit) {
    setTeacher(teacher)
    setEdit(edit)
    setmodal_large(edit)
  }
  const [exportData, setExportData] = useState([])

  const [modal_large, setmodal_large] = useState(false)
  const [teacherList, setTeacherList] = useState([])
  const [teacher, setTeacher] = useState({})
  const [edit, setEdit] = useState(false)
  const [deleteAlert,setDeleteAlert] =  useState(false);
  const [deleteId,setDeleteId] = useState("");

  const handleConfirmDelete = () => {
    del(`/deleteTeacher/${deleteId}`)
      .then(res => {
        refreshTable()
      })
      .catch(err => {
        console.log(err)
        alert("Backend Error, Contact administrator " + err)
      })
  }

  const handleDelete = uid => {
    setDeleteId(uid)
    setDeleteAlert(true)
  }

  useEffect(async () => {
    getTeachersDetails()
  }, [])

  const getTeachersDetails = async () => {
    await get(`/getAllTeachers`)
      .then(res => {
        convertToTableData(res.teachers)
        setExportData(res.teachers)
      })
      .catch(err => {
        console.log(err)
        alert("Backend Error, Contact administrator " + err)
      })
  }

  const headers = [
    { label: "Name", key: "name" },
    { label: "Class Teacher", key: "class_teacher" },
    { label: "Subject", key: "subject" },
    { label: "Mobile Number", key: "mobile_no" },
    { label: "Email", key: "mail_id" },
  ]

  const convertToTableData = data => {
    const teachers = []
    data.map(teacher => {
      const action = (
        <div className="d-flex">
          <div>
            <button
              type="button"
              className="btn btn-primary btn-md ms-2"
              onClick={() => tog_large(teacher, true)}
            >
              <i
                className="mdi mdi-sm mdi-account-edit-outline"
                style={{ fontSize: "12px" }}
              ></i>{" "}
              Edit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger btn-md ms-2 ml-2"
              onClick={() => handleDelete(teacher.name)}
            >
              Delete
            </button>
          </div>
        </div>
      )
      const teacherAction = Object.assign(teacher, {
        action: action,
      })
      teachers.push(teacherAction)
    })
    setTeacherList(teachers)
  }

  const refreshTable = () => {
    getTeachersDetails()
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
        label: "Class Teacher",
        field: "class_teacher",
        sort: "asc",
        width: 270,
      },
      {
        label: "Subject",
        field: "subject",
        sort: "asc",
        width: 200,
      },
      {
        label: "Mobile Number",
        field: "mobile_no",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "mail_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [...teacherList],
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Teachers List | Leads Kendriya Vidayalaya</title>
      </MetaTags>

      {deleteAlert ? (
                <SweetAlert
                  title="Are you sure?"
                  warning
                  showCancel
                  confirmButtonText="Yes, delete it!"
                  confirmBtnBsStyle="success"
                  cancelBtnBsStyle="danger"
                  onConfirm={() => {
                    handleConfirmDelete();
                    setDeleteAlert(false)
                   
                  }}
                  onCancel={() => setDeleteAlert(false)}
                >
                  You won't be able to revert this!
                </SweetAlert>
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
            Add Teacher Details
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
          <AddTeacher
            teacher={teacher}
            isEdit={edit}
            refreshTable={refreshTable}
            closeModal={() => setmodal_large(false)}
          />
        </div>
      </Modal>

      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">
                <div className="d-flex justify-content-end">
                  {exportData.length > 0 && (
                    <CSVLink
                      data={exportData}
                      headers={headers}
                      filename={"teachers-list.csv"}
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
                    onClick={() => tog_large({}, true)}
                    style={{ height: "40px" }}
                  >
                    <i
                      className="mdi mdi-sm mdi-account-plus-outline"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Add Teacher
                  </button>
                </div>
              </CardTitle>
              <MDBDataTable
                entriesOptions={[20, 30, 40, 50, 60]}
                entries={20}
                responsive
                bordered
                data={data}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Teachers)
