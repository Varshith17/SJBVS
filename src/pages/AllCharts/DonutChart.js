import React, { Component } from "react"

import C3Chart from "react-c3js"
import "c3/c3.css"

class DonutChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { paid, unpaid } = this.props.feesStats
    console.log(paid,unpaid)
    const data = {
      columns: [
        ["Paid", paid],
        ["Unpaid", unpaid],
      ],
      type: "donut",
    }

    const donut = {
      title: "",
      width: 25,
      label: { show: !1 },
    }

    const color = {
      pattern: ["#28bbe3", "#7a6fbe"],
    }

    const size = {
      height: 300,
    }

    return (
      <React.Fragment>
        <C3Chart
          data={data}
          donut={donut}
          color={color}
          size={size}
          dir="ltr"
        />
      </React.Fragment>
    )
  }
}

export default DonutChart
