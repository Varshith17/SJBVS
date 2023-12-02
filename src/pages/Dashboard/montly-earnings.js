import React from "react"
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"
import DonutChart from "../AllCharts/DonutChart"

const MonthlyEarnings = props => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Fees Stats</CardTitle>

          <Row className="text-center mt-4">
            <div className="col-12">
              <h5 className="font-size-12">Paid: {props.feesStats.paid}</h5>
              {/* <p className="text-muted">Paid</p> */}
            </div>
          </Row>
          <Row className="text-center">
            <div className="col-12">
              <h5 className="font-size-12">Unpaid: {props.feesStats.unpaid}</h5>
              {/* <p className="text-muted">Unpaid</p> */}
            </div>
          </Row>
          <div dir="ltr">
            <DonutChart feesStats={props.feesStats} />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings
