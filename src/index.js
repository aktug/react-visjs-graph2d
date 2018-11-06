import vis from "vis/dist/vis-timeline-graph2d.min"
import "vis/dist/vis-timeline-graph2d.min.css"
import React, { Component } from "react"
import PropTypes from "prop-types"
import difference from "lodash/difference"
import intersection from "lodash/intersection"
import each from "lodash/each"
import assign from "lodash/assign"
import noop from "lodash/noop"
import keys from "lodash/keys"

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

const events = [
  "currenttimetick",
  "click",
  "contextmenu",
  "doubleclick",
  "changed",
  "rangechange",
  "rangechanged",
  "timechange",
  "timechanged",
]

const eventPropTypes = {}
const eventDefaultProps = {}

each(events, event => {
  eventPropTypes[event] = PropTypes.func
  eventDefaultProps[`on${ucFirst(event)}`] = noop
})

export default class VisGraph2d extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customTimes: [],
    }
  }

  componentDidMount() {
    const { container } = this.refs

    this.$el = new vis.Graph2d(container, undefined, this.props.options)
    
    this.$el.on("rangechange", () => this.$el.redraw())

    events.forEach(event => this.$el.on(event, this.props[`on${ucFirst(event)}`]))

    this.init()
  }

  componentDidUpdate() {
    this.init()
  }

  shouldComponentUpdate(nextProps) {
    const { items, groups, options, customTimes } = this.props

    const itemsChange = items !== nextProps.items
    const groupsChange = groups !== nextProps.groups
    const optionsChange = options !== nextProps.options
    const customTimesChange = customTimes !== nextProps.customTimes

    return itemsChange || groupsChange || optionsChange || customTimesChange
  }

  init() {
    const { items, groups, options, customTimes, currentTime } = this.props

    let timelineOptions = options

    this.$el.setOptions(timelineOptions)

    if (groups.length > 0) {
      const groupsDataset = new vis.DataSet()
      groupsDataset.add(groups)
      this.$el.setGroups(groupsDataset)
    }

    this.$el.setItems(items)

    if (currentTime) {
      this.$el.setCurrentTime(currentTime)
    }

    const customTimeKeysPrev = keys(this.state.customTimes)
    const customTimeKeysNew = keys(customTimes)
    const customTimeKeysToAdd = difference(
      customTimeKeysNew,
      customTimeKeysPrev
    )
    const customTimeKeysToRemove = difference(
      customTimeKeysPrev,
      customTimeKeysNew
    )
    const customTimeKeysToUpdate = intersection(
      customTimeKeysPrev,
      customTimeKeysNew
    )

    each(customTimeKeysToRemove, id => this.$el.removeCustomTime(id))
    each(customTimeKeysToAdd, id => this.$el.addCustomTime(customTimes[id], id))
    each(customTimeKeysToUpdate, id => this.$el.setCustomTime(customTimes[id], id))

    this.setState({ customTimes })
  }

  render() {
    return <div ref="container" />
  }

  componentWillUnmount() {
    this.$el.destroy()
  }
}

VisGraph2d.propTypes = assign(
  {
    items: PropTypes.array,
    groups: PropTypes.array,
    options: PropTypes.object,
    customTimes: PropTypes.shape({
      datetime: PropTypes.instanceOf(Date),
      id: PropTypes.string,
    }),
    currentTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.number,
    ]),
  },
  eventPropTypes
)

VisGraph2d.defaultProps = assign(
  {
    options: {},
    items: [],
    groups: [],
    customTimes: {},
  },
  eventDefaultProps
)
