import React from 'react';
const {Component, PropTypes} = React;

class Circle extends Component {
  static propTypes = {
    color: PropTypes.number,
    range: PropTypes.array,
    sz: PropTypes.number,
  }

  render() {
    let {
      color = 1,
      sz = 30,
      range = [
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'maroon',
      ]
    } = this.props;
    return (<div><div
      style={{ width: `${sz}px`, height:`${sz}px` }}
      className={range[color]} ></div></div>);
  }
}
export default Circle;
