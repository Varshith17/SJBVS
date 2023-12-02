import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  CardText,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import { connect } from "react-redux"
import { get } from "../../helpers/api_helper"
import { CSVLink } from "react-csv"
import { setBreadcrumbItems } from "../../store/actions"
import RegistrationForm from "./RegistrationForm"
import AdmissionForm from "./AdmissionForm"
import TCForm from "./TCForm"
import StudyCertificate from "./StudyCertificate"
import MaterialList from "./MaterialList"
import OtherDetails from "./OtherDetails"
import "../Tables/datatables.scss"
import { REGISTER_USER } from "store/auth/register/actionTypes";


const Accounts = props => {
  const breadcrumbItems = [{ title: "Accounts", link: "#" }]

  useEffect(() => {
    props.setBreadcrumbItems("Accounts List", breadcrumbItems)
  })

  const [tab, setTab] = useState("REGISTRATION_FORM")
  const [activeTab, setActiveTab] = useState("1")
  const [accountsData,setAccountsData] = useState({});

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  const handleTab = tab => {
    setTab(tab)
  }

  const getAccountsData=()=>{
    get("/get-account-details")
    .then(res => {
      console.log(res);
      setAccountsData(res);
    })
    .catch(err =>{
      alert("Backend Error, Contact administrator " + err);
       console.log(err)})
  }

  useEffect(()=>{
    getAccountsData();
  },[])

  const refreshTable =()=>{
    getAccountsData();
  }

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    Registration Form
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggle("2")
                    }}
                  >
                    Admission Form
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggle("3")
                    }}
                  >
                    Transfer Certificate List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "4",
                    })}
                    onClick={() => {
                      toggle("4")
                    }}
                  >
                    Study Certificate List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "5",
                    })}
                    onClick={() => {
                      toggle("5")
                    }}
                  >
                    Material Fees List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "6",
                    })}
                    onClick={() => {
                      toggle("6")
                    }}
                  >
                    Other Details List
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="p-3 text-muted">
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <RegistrationForm refreshTable={refreshTable} accountsData={accountsData.ApplicationsList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <AdmissionForm refreshTable={refreshTable} accountsData={accountsData.AdmissionsList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <TCForm refreshTable={refreshTable} accountsData={accountsData.TransferCertificatesList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <StudyCertificate refreshTable={refreshTable} accountsData={accountsData.StudyCertificatesList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <MaterialList refreshTable={refreshTable} accountsData={accountsData.MaterialsFeesList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <OtherDetails refreshTable={refreshTable} accountsData={accountsData.OtherFeesList} />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <div className="d-flex">
        <div onClick={()=>handleTab('REGISTRATION_FORM')}>
            Registration
        </div>
        <div onClick={()=>handleTab('ADMISSION_FORM')}>
            Admission
        </div>
        <div onClick={()=>handleTab('TC_FORM')}>
            Transfer Certificate
        </div>
        <div onClick={()=>handleTab('STUDY_FORM')}>
            Study Certificate
        </div>
        <div onClick={()=>handleTab('MATERIAL_FORM')}>
            Material Fees
        </div>
        <div onClick={()=>handleTab('OTHERS_FORM')}>
            Others
        </div> 
      </div>*/}
    </div>
  )
}

export default connect(null, { setBreadcrumbItems })(Accounts)
