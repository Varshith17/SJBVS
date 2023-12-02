import React, { Component, useState } from "react"
import { Table, Card, CardBody, Button,Modal } from "reactstrap"
import moment from "moment"
import StudentDetails from "./StudentDetails"
//Import Images
import user1 from "../../assets/images/users/user-1.jpg"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"

class LatestOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      studentId:''
    }
  }

  handleStudent=(uid)=>{
    this.setState({
      showModal:true,
      studentId:uid
    })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          size="lg"
          isOpen={this.state.showModal}
          toggle={() => {
            this.setState({
              showModal:false
            })
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myLargeModalLabel">
             Student Details
            </h5>
            <button
              onClick={() => {
                this.setState({
                  showModal:false
                })
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
              <StudentDetails uid={this.state.studentId} />
          </div>
        </Modal>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Fees Unpaid Student List</h4>
            <div
              style={{
                maxHeight: "360px",
                overflowY: "auto",
              }}
            >
              <div className="table-responsive">
                <Table className="align-middle table-centered table-vertical table-nowrap">
                  <tbody>
                    {this.props.unpaidStudentList.map((student, key) => (
                      <tr key={key}>
                        <td style={{ cursor: "pointer" }} onClick={this.handleStudent.bind(this,student.uid)}>
                          <i className={"mdi mdi-account font-size-18"}></i>
                          {student.name}
                        </td>
                        <td>
                          ₹ {student.amount}
                          <p className="m-0 text-muted font-14">Fees Due</p>
                        </td>
                        <td>
                          {moment(student.date).format("YYYY-MM-DD")}
                          <p className="m-0 text-muted font-14">
                            Last Payed date
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default LatestOrders
