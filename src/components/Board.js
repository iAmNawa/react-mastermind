import React from 'react';

import NameForm from './NameForm';
import Circle from './Circle';
import Title from './Title';
import Slot from './Slot';

import helpers from '../helpers';

const {Component, PropTypes} = React;
const {uuid, evt, newGame, guess } = helpers;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingGuesses: 10,
      player: '',
      choices: [],
      slots:[
        '0000',
        '0000',
        '0000',
        '0000',
        '0000',
        '0000',
        '0000',
        '0000',
        '0000',
        '0000'
      ],
      perf:[ // guess performance tracking
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
    };
  };

  componentDidMount() {
    evt.on('guess', (res, i) => {

      if (res.wasCorrect){
        return newGame(this.state.player, (err, game) => {
          alert('you win!')
          if (!err && 'remainingGuesses' in game)
            this.setState({
              remainingGuesses:game.remainingGuesses,
              slots:[
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000',
                '0000'
              ],
              perf:[ // guess performance tracking
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
              ],
              choices:[]
            })
        })
      }

      // clear the chooser selector after getting back response
      this.setState({ choices:[] });

      let misplaced = Number(res.misplacedDigits+'')
      let correct = Number(res.correctDigits+'')
      let k = 4

      const newPerf = []
      while(correct--)
        newPerf.push(1)
      while(misplaced--)
        newPerf.push(2)
      while(k--)
        if (!newPerf[k])
          newPerf[k] = 0

      // keep state immutability
      const slots = JSON.parse(JSON.stringify(this.state.slots))
      const oldPerf = JSON.parse(JSON.stringify(this.state.perf))
      slots[res.remainingGuesses] = res.guess
      oldPerf[res.remainingGuesses] = newPerf

      this.setState({
        choices:[],
        slots,
        perf:oldPerf,
      });
    })

    evt.on('register', res => {
      if (res.playerId) {
        newGame(res.playerId, (err, game) => {
          if (!err && 'remainingGuesses' in game)
            this.setState({remainingGuesses:game.remainingGuesses})
        })
        this.setState({player:res.playerId})
      } else {
        alert(res.error)
      }
    })
  }

  pick(n) {
    // preserve state immutability w/ fast object copy, thx native JSON methods!
    const { choices } = JSON.parse(JSON.stringify(this.state));
    if (choices.length < 4) {
      choices.push(n)
      this.setState({ choices })
    };
  }
  unpick(e) {
    const { choices } = JSON.parse(JSON.stringify(this.state));
    if (choices.length) {
      choices.pop()
      this.setState({ choices });
    }
  };
  submitGuess(e) {
    const { choices } = JSON.parse(JSON.stringify(this.state));
    if (choices.length === 4)
      guess({ id:this.state.player, choices:choices.join('') }, (err, res) => {
        if (!err && res.remainingGuesses){
          evt.emit('guess', res, 9-res.remainingGuesses);
        } else {
          if (!res.wasCorrect) {
            alert('better luck next time! you lost :(')
            console.log('game over', this.state.player)
            newGame(this.state.player, (err, game) => {
              if (!err && 'remainingGuesses' in game)
                this.setState({
                  remainingGuesses:game.remainingGuesses,
                  slots:[
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000',
                    '0000'
                  ],
                  perf:[ // guess performance tracking
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                  ],
                  choices:[]
                })
            })
          }
        }

      })
  };

  render() {
    return (
      <div>
        <Title
          h1='Mastermind'
          h2='by Paul Borawski'>
        </Title>
        {
          this.state.player ?
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-5'>
                <div className='row'>
                  <div className='col-3'>
                    {
                      [1,2,3,4,5,6]
                        .map(i => (
                          <div
                            className='circleWrapper btn'
                            key={uuid()}
                            onClick={e => this.pick(i)}>
                            <Circle color={i} />
                          </div>
                        ))
                    }
                  </div>
                  <div className='col-9'>
                    <div className='card'><div className='card-block'>
                      <div className='row'>
                        <p style={{
                          textDecoration:'underline',
                          textTransform:'uppercase',
                          textAlign:'center',
                          margin: '-10px 0 10px 0',
                          width: '100%',
                        }}>guess</p>
                      </div>
                      <div className='row'>
                      {
                        this.state.choices.map(i => (
                          <div
                            className='circleWrapper'
                            style={{float:'left'}}
                            key={uuid()}>
                            <Circle color={i} />
                          </div>
                        ))
                      }
                      <button className={
                        `btn btn-outline-danger btn-sm${
                          this.state.choices.length ? '' : ' disabled' }`
                      } onClick={ e => this.unpick(e) } style={{float:'left'}}>
                        clear
                      </button>
                      <button
                        className={
                          `btn btn-sm btn-outline-success${
                            this.state.choices.length < 4 ? ' disabled' : '' }`
                        }
                        style={{margin: '0 0 0 2px', float:'left'}}
                        onClick={ e => this.submitGuess(e)}
                      >
                        submit
                      </button>
                      </div>
                    </div></div>
                  </div>
                </div>
              </div>
              <div className='col-7'>
                {
                  this
                    .state
                    .slots
                    .map( (g, i) => <Slot
                      key={uuid()}
                      number={Math.abs(i-10)}
                      guess={g.split('')}
                      perf={this.state.perf[i]}></Slot>
                    )
                }
              </div>
            </div>
          </div> : <div className='container-fluid'>
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4'>
              <div className='row'>
                <h2 style={{margin:'100px 0 0 0'}}> </h2>
              </div>
              <NameForm/>
            </div>
            <div className='col-4'></div>
          </div>
        </div>
        }
      </div>
    );
  }
}
export default Board;
