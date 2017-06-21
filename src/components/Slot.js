import React from 'react';
import Circle from './Circle';

import helpers from '../helpers';

const {Component, PropTypes} = React;
const {uuid} = helpers;

const range = [
  'transparent',
  'black',
  'white',
]

class Slot extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    number: PropTypes.number,
    guess: PropTypes.array,
    perf: PropTypes.array
  }

  render() {

    let {
      perf = [0,0,0,0]
    } = this.props;

    return (
      <div key={uuid()} className='row'>
        <div key={uuid()} className='col-1 results'>
          <div key={uuid()} className='row'>&nbsp;</div>
        </div>
        <div key={uuid()} className='col-11'>
          <div key={uuid()} className='row'>
            <div key={uuid()} className='col-2 slot'>
              <h3>{this.props.number}</h3>
            </div>
            {
              this.props.guess.map( (guess, i) =>
                <div key={uuid()} className={
                  i === 3 ? 'col-1 slot':'col-2 slot'
                }>
                  <Circle key={uuid()} color={Number(guess)} sz={30}/>
                </div>)
            }
            <div key={uuid()} className='col-2 slot' style={{margin:'4px 0 0 0'}}>
              <div key={uuid()} className='row' style={{maxWidth:'75px'}}>
                <div key={uuid()} className='circleWrapper circleStats'>
                  <Circle
                    key={uuid()}
                    range={range}
                    color={perf[0]}
                    sz={10}/>
                </div>
                <div key={uuid()} className='circleWrapper circleStats'>
                  <Circle
                    key={uuid()}
                    range={range}
                    color={perf[1]}
                    sz={10}/>
                  </div>
              </div>
              <div key={uuid()} className='row' style={{maxWidth:'75px'}}>
                <div key={uuid()} className='circleWrapper circleStats'>
                  <Circle
                    key={uuid()}
                    range={range}
                    color={perf[2]}
                    sz={10}/>
                </div>
                <div key={uuid()} className='circleWrapper circleStats'>
                  <Circle
                    key={uuid()}
                    range={range}
                    color={perf[3]}
                    sz={10}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Slot;
