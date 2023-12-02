import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import EmailSent from "./email-sent"
import MonthlyEarnings2 from "./montly-earnings2"
import Inbox from "./inbox"
import RecentActivity from "./recent-activity"
import WidgetUser from "./widget-user"
import YearlySales from "./yearly-sales"
import LatestTransactions from "./latest-transactions"
import LatestOrders from "./latest-orders"
import { get } from "../../helpers/api_helper"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const Dashboard = props => {
  const breadcrumbItems = [{ title: "", link: "#" }]
  const [selectedCalss, setSelectedClass] = useState("")
  const [paidStudentList, setPaidStudentList] = useState([])
  const [unpaidStudentList, setUnpaidStudentList] = useState([])
  const [feesStats, setFeesStats] = useState({ paid: 0, unpaid: 0 })

  useEffect(async () => {
    //getDashboardData("10TH")
  }, [])

  const getDashboardData = async selected => {
    setSelectedClass(selected);
    await get(`/dashboard/${selected}`)
      .then(res => {
        setPaidStudentList(res.paidStudents)
        setUnpaidStudentList(res.unPaidStudents)
        const feesStatus = {
          paid: res.fees_status.paid !== null ? res.fees_status.paid : 0,
          unpaid: res.fees_status.unpaid !== null ? res.fees_status.unpaid : 0,
        }
        setFeesStats(feesStatus)
      })
      .catch(err =>{
        alert("Backend Error, Contact administrator " + err);
        console.log(err)
      })
  }

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
  })

  const handleClass = e => {
    getDashboardData(e.target.value)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Dashboard | Leads Kendriya Vidayalaya</title>
      </MetaTags>

      {/*mimi widgets */}
      {/* <Miniwidget reports={reports} /> */}
      {selectedCalss === "" ? (
        <React.Fragment>
          <h3>Select class</h3>
          <Row className="mt-5 justify-content-between">
            <Col sm="" md="4" className="classnameselect" onClick={()=>getDashboardData('PRE_KG')}>
              PRE-KG
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('LKG')}>
              LKG
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('UKG')}>
              UKG
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('1ST')}>
              1ST 
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('2ND')}>
              2ND 
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('3RD')}>
              3RD 
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('4TH')}>
              4TH
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('5TH')}>
              5TH 
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('6TH')}>
              6TH 
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('7TH')}>
              7TH
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('8TH')}>
              8TH
            </Col>
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('9TH')}>
              9TH 
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="4" className="classnameselect" onClick={()=>getDashboardData('10TH')}>
              10TH
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Row>
            <Col sm="12">
              <div>
                <label style={{ fontSize: "24px" }}>Select class &nbsp;</label>
                <select className="ml-2" onChange={handleClass}  value={selectedCalss}>
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
            </Col>
          </Row>
          <Row>
            <Col xl="5">
              {/* latest transactions */}
              <LatestTransactions paidStudentList={paidStudentList} />
            </Col>
            <Col xl="2">
              {/* Monthly Earnings */}
              <MonthlyEarnings feesStats={feesStats} />
            </Col>
            <Col xl="5">
              {/* latest orders */}
              <LatestOrders unpaidStudentList={unpaidStudentList} />
            </Col>
          </Row>
        </React.Fragment>
      )}

      {/* <Row></Row> */}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)
