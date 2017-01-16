import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-responsive-ui'

@connect(state => ({ pending: state.preload.pending }))
export default class Preloading extends Component {
  render() {
    const { pending } = this.props;
    return (
      <div className={ `preloading ${pending ? 'preloading--shown' : ''}` }>
        <ActivityIndicator/>
      </div>
    )
  }
}