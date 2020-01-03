import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  return (
    props.notification === ''
      ? null
      : <div className={props.notification.type}>
        {props.notification.text}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)