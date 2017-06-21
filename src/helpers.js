import {get,post} from 'xhr'

const baseURI = 'http://challenge.thebeans.io:3000';

const evt = new (require('events').EventEmitter)();

const helpers = {
  uuid, evt, register, newGame, guess
}

// https://gist.github.com/jed/982883
function uuid() {
  return (
    [1e7] +
    -1e3 +
    -4e3 +
    -8e3 +
    -1e11
  ).replace(
    /[018]/g,
    x => (x ^ Math.random() * 16 >> x / 4).toString(16), // eslint-disable-line no-mixed-operators, no-bitwise, max-len
  );
}

function register (name, fn) {
  post({
    uri:`${baseURI}/api/player`,
    json: { name },
  }, (e, r, b) => fn(e,b))
}

function newGame (id, fn) {
  post({
    uri:`${baseURI}/api/player/${id}/new-game`,
    json: { },
  }, (e, r, b) => fn(e,b))
}

function guess (opts, fn) {
  post({
    uri:`${baseURI}/api/player/${opts.id}/guess`,
    json: { guess: opts.choices },
  }, (e, r, b) => fn(e,b))
}

export default helpers
