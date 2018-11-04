import React, { Component } from "react"
import moment from "moment"
import VisGraph2d from "react-visjs-graph2d"
//import './build'

const example_one = {
  options: {
    height: '380px'
  },
  items: [
    { x: moment(), y: 30, group: 0 },
    { x: moment().add(1, "days"), y: 10, group: 0 },
    { x: moment(), y: 15, group: 1 },
    { x: moment().add(1, "days"), y: 30, group: 1 },
    { x: moment().add(2, "days"), y: 10, group: 1 },
    { x: moment().add(3, "days"), y: 15, group: 1 },
  ],
  customTimes: {
    customTime1: moment().add(-1, "days"),
    customTime2: moment().add(4, "days"),
  },
  groups: [
    {
      id: 1,
      content: "Group0",
      options: {
        drawPoints: {
          style: "circle",
        },
        shaded: {
          orientation: "bottom",
        },
      },
    },
    {
      id: 0,
      content: "Group1",
      options: {
        style: "bar",
      },
    },
  ],
}

const example_two = {
  options: {
    height: '380px'
  },
  items: [
    { x: moment().add(-5, "days"), y: 13, group: 0 },
    { x: moment().add(-4, "days"), y: 12, group: 0 },
    { x: moment().add(-3, "days"), y: 11, group: 0 },
    { x: moment().add(-2, "days"), y: 10, group: 0 },
    { x: moment().add(-1, "days"), y: 9, group: 0 },
    { x: moment(), y: 8, group: 0 },
    { x: moment().add(1, "days"), y: 9, group: 0 },
    { x: moment().add(2, "days"), y: 10, group: 0 },
    { x: moment().add(3, "days"), y: 11, group: 0 },
    { x: moment().add(4, "days"), y: 12, group: 0 },
    { x: moment().add(5, "days"), y: 13, group: 0 },
    
  ],
  customTimes: {
    customTime1: moment().add(-6, "days"),
    customTime2: moment().add(6, "days"),
  },
  groups: [
    {
      id: 0,
      content: "Group1",
      options: {
        style: "bar",
      },
    },
  ],
}

class VisGraph2dContainer extends Component {
  constructor(props) {
    super(props)
    this.ref1 = React.createRef()
    this.ref2 = React.createRef()
  }

  render() {
    return (
      <>
        <VisGraph2d {...example_one} ref={this.ref1} />
        <VisGraph2d {...example_two} ref={this.ref2} />
      </>
    )
  }

  componentDidMount() {
    this.ref1.current.$el.on("click", props => {
      console.info(props)
    })
    this.ref2.current.$el.on("click", props => {
      console.info(props)
    })
  }
}

export default VisGraph2dContainer
