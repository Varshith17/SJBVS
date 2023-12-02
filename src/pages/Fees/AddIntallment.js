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
import { MDBDataTable } from "mdbreact"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { get, post } from "../../helpers/api_helper"

const AddInstallment = props => {
  const [installmentList, setInstallmentList] = useState("")
  const [installment, setInstallment] = useState({})
  const [installmentCount, setInstallmentCount] = useState("")
  const [totalFees, setTotalFees] = useState("")
  const [classField,setClassField] = useState("");
  const [isEdit,setIsEdit] = useState(false)



  useEffect(async () => {
    getInstallments()
  }, [])

  const getInstallments = async () => {
    await get(`/fees/getInstallments`)
      .then(res => {
        convertToTableData(res)
      })
      .catch(err =>{ 
        alert("Backend Error, Contact administrator " + err);
        console.log(err)})
  }

  const EditInstallment = installment => {
    setInstallment(installment)
    setClassField(installment.class)
    setInstallmentCount(installment.installment)
    setTotalFees(installment.total_fees)
    setIsEdit(true);
    setEditModal(true)
  }

  const saveInstallments = () => {
    const data = {
      class: classField,
      total_fees: totalFees,
      installments: installmentCount,
    }
    post("/fees/addInstallments", data)
      .then(res => getInstallments())
      .catch(err => console.log(err))
    setClassField("")
    setInstallmentCount("")
    setTotalFees("")
    setEditModal(false)
  }
  const convertToTableData = data => {
    const installmentLists = []
    data.map(installment => {
      const action = (
        <div>
          <button
            type="button"
            className="btn btn-primary btn-md ms-2"
            onClick={() => EditInstallment(installment)}
          >
            Edit
          </button>
        </div>
      )
      const studentAction = Object.assign(installment, {
        action: action,
      })
      installmentLists.push(studentAction)
    })
    setInstallmentList(installmentLists)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEditModal(true)
  }

  const columns = [
    {
      label: "Class",
      field: "class",
      width: 150,
    },
    {
      label: "Total Fees",
      field: "total_fees",
      width: 150,
    },
    {
      label: "Total Installments",
      field: "installment",
      width: 150,
    },
    {
      label: "Action",
      field: "action",
      width: 150,
    },
  ]

  const data = {
    columns: [...columns],
    rows: [...installmentList],
  }

  const [editModal, setEditModal] = useState(false)
  return (
    <React.Fragment>
      <Modal
        size="md"
        isOpen={editModal}
        toggle={() => {
          setEditModal(false)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myLargeModalLabel">
            Edit Installments
          </h5>
          <button
            onClick={() => {
              setEditModal(false)
              setClassField("")
              setInstallmentCount("")
              setTotalFees("")  
              setIsEdit(false);
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
            <Row>
              <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom01">Class</Label>
                  <AvField
                    name="feesPaid"
                    placeholder="Class"
                    type="text"
                    onChange={e => setClassField(e.target.value)}
                    value={classField}
                    disabled={isEdit}
                    errorMessage="Enter Fees Paid"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom01"
                  />
                </div>
              </Col>
              <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom01">Total Fees</Label>
                  <AvField
                    name="feesPaid"
                    placeholder="Total Fees"
                    type="text"
                    onChange={e => setTotalFees(e.target.value)}
                    value={totalFees}
                    errorMessage="Enter Fees Paid"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom01"
                  />
                </div>
              </Col>
              <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom02">Total Installments</Label>
                  <AvField
                    name="paymentMode"
                    placeholder="Total Installments"
                    type="text"
                    onChange={e => setInstallmentCount(e.target.value)}
                    value={installmentCount}
                    errorMessage="Enter Total Installments"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom02"
                  />
                </div>
              </Col>
            </Row>
          </AvForm>
          <Button color="primary" type="submit" onClick={saveInstallments}>
            Save Installments
          </Button>
        </div>
      </Modal>
      <Row className="mb-2">
        <Col md="9"></Col>
        <Col md="3">
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Add Installment
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <MDBDataTable
                  responsive
                  bordered
                  data={data}
                  paging={false}
                  searching={false}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AddInstallment
