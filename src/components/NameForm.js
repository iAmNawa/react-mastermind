import React from 'react';
import helpers from '../helpers';

const {Component} = React;
const {register, evt} = helpers;

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value && typeof this.state.value === 'string'){
      register(this.state.value, (err, res) => {
        if (!err){
          evt.emit('register', res);
        }
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label col-form-label-lg'>
            <strong>Name:</strong>
          </label>
          <div
            className='col-sm-10'
            style={{borderBottom: '1px solid rgba(40,40,40,0.9)'}}>
            <input
              type='text'
              className='form-control form-control-lg'
              id='lgFormGroupInput'
              placeholder='Enter name'
              value={this.state.value}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className='row'>
          <button
            className='btn btn-lg btn-outline-secondary btn-block'
            type='submit'
          >Submit</button>
        </div>
      </form>
    );
  }
}
export default NameForm;
