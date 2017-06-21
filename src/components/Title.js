import React from 'react';
const {Component, PropTypes} = React;

class Title extends Component {
  static propTypes = { h1: PropTypes.string };
  render() {
    let {
      h1 = 'Game Title',
      h2 = 'by Game Author'
    } = this.props;
    return (
      <div>
        <h1>{h1}</h1>
        <h2>{h2}</h2>
      </div>
    );
  }
}
export default Title;
