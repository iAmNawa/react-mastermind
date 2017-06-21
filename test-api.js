const req = require('request')
const baseURI = 'http://challenge.thebeans.io:3000'

register('playa', (err, success) =>
  console.log(err, success))

function register (name, fn) {
  req.post({
    uri:`${baseURI}/api/player`,
    json: { name },
  }, (e, r, b) => fn(e,b))
}

const apidocs = {
  name: 'REST Mastermind server',
  endpoints: [
    {
      endpoint: '/api/stats',
      method: 'GET',
      purpose: 'Get the stats for all current players.'
    },
    {
      endpoint: '/api/player',
      method: 'POST',
      body: {
        name: 'Player Name'
      },
      purpose: 'Register a new player.',
    },
    {
      endpoint: '/api/player/{playerId}',
      method: 'GET',
      purpose: 'Get the stats for a specific player.'
    },
    {
      endpoint: '/api/player/{playerId}/new-game',
      method: 'POST',
      body: { },
      purpose: 'Start a new game for the player.'
    },
    {
      endpoint: '/api/player/{playerId}/guess',
      method: 'POST',
      body: {
        guess: '1234'
      },
      purpose: 'Make a guess in the current game.'
    }
  ]
}
