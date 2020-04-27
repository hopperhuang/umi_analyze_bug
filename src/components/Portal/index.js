import React from 'react'
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div');
    this.el.className = props.className || 'my_protal'
  }
  componentDidMount() {
    document.body.appendChild(this.el)
  }
  componentWillUnmount() {
    document.body.removeChild(this.el)
  }
  render() {
    const { props } = this
    const { children } = props
    return   ReactDOM.createPortal(
      children,
      this.el,
    );
  }
}

export default Portal
