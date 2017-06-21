# rationale
* minimal react without as much boilerplate
* remove incidental configuration/complexity

# mastermind setup
```bash
# use node 8 (optional preference)
git clone https://github.com/iAmNawa/react-mastermind
cd react-mastermind
npm i
node server

# navigate to localhost:4000
```

# usage
click choices left of the guess box to prep and submit a guess

# structure
```bash
.
├── package.json # deps
├── public # asset path files and dist outputs
│   ├── bootstrap.min.v4.0.0-alpha.6.css
│   ├── images
│   │   ├── nicePieceOfWood.jpg # a nice piece of wood (unused potential bg)
│   │   └── wood5.png # the game background wood
│   ├── index.html # smallest markup needed for react to run
│   ├── main.css # output from stylus preprocessor in `/src`
│   └── main.js # main babel output file and the react application
├── readme.markdown
├── server.js # the server listens on port 4000
├── src
│   ├── colors.styl # color variables for circles, fonts, borders
│   ├── components
│   │   ├── Board.js # main layout component
│   │   ├── Circle.js # circle component, propTypes include size (sz) and color
│   │   ├── NameForm.js # register name api to start a game
│   │   ├── Slot.js # the game slot for holding server's guess state, aka truth
│   │   └── Title.js # game author and name
│   ├── form.styl # form style (bootstrap 4 based)
│   ├── helpers.js # various helper functions and application event management
│   ├── main.js # entry point to app, calls React.render() on root id
│   └── main.styl # entry point for importing stylus and main css layout
└── test-api.js # explore endpoint req/res dialogue
```

# todo:
* add localstorage for saving state between refreshes
* add redux
