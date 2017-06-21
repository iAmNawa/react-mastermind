const browserify        = require('browserify')
const join              = require('path').join
const babelify          = require('babelify')
const stylus            = require('stylus')
const {
  createWriteStream,
  readFileSync,
  writeFile,
  watch,
  stat,
}                       = require('fs')

require('http')
  .createServer(require('ecstatic')({
    /* handle static files in the script directory's subfolder: /public */
    root: `${__dirname}/public`
  }))
  .listen(4000, function(){ console.log('listening on 4000');})

const entry = join(__dirname, 'src')
const b = browserify({ debug:true })
  .transform(babelify, {presets: ['es2015', 'react', 'stage-0',]})
  .require(require.resolve(`${entry}/main.js`), { entry: true })

buildCss()
buildJs()

if (process.env.NODE_ENV !== 'production') // continuous rebundling on save
  watch(entry, {recursive: true, encoding: 'utf8'}, fileChange)

/**
 * `fileChange()`
 * try to watch `react-mastermind/src` for changes and call `build()` to rebuild js
 */

function fileChange (err, file) {
  if (/.styl$/.test(file))
    return buildCss()
  return buildJs(file)
}



/**
 * `buildJs (filename)`
 * build javascript (from entry point src/main.js)
 * a global `b`, from which `bundle()` is called, generates new readables
 */
let size
function buildJs(f) {
  const readable = b.bundle()
  stat(join(__dirname, 'public/main.js'), (err, stats) =>
    size = stats ? stats.size : 0 )

  /* i was curious to benchmark latency of browserify stream
   * readable's `s` property is start time checked `.on('end')`
   */
  readable.s = Date.now()
  readable
    .on('error', err => console.log(`
      syntax error in file: ${err.filename}

      ${err.message}


      `))
    .on('end', perf )
    .pipe(createWriteStream(join(__dirname, 'public/main.js')))
    .f = f
}
function perf () {
  str = this.f ? `saved ${this.f}, rebuilt` : 'built'
  console.log(`${str} main.js in ${Date.now() - this.s}ms`)
  if (!size)
    console.log(`now open index.html in a browser:\n
      $ open ${join(__dirname, 'public/index.html')}\n`)
}


/**
 * builds css from the stylus in src/main.styl
 */

function buildCss( err, f) {
  stylus( readFileSync( join(__dirname, 'src/main.styl'), 'utf8' ) )
    .include( entry )
    .render( writeCss )
}
function writeCss (err, css) {
  if (err)
    return console.log(err.message)
  writeFile(join(__dirname, 'public/main.css'), css, err => {
    console.log('generated new main.css')
  })
}
