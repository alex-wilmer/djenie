var express        = require('express')
  , app            = express()
  , mongoose       = require('mongoose')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  , stylus         = require('stylus')
  , nib			       = require('nib')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib()) 
}

app.use(stylus.middleware({ 
    src: __dirname + '/public'
  , compile: compile 
}))
	
var db = require('./config/db')
mongoose.connect(db.url)

var port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(__dirname + '/public'))

require('./app/routes')(app)

app.listen(port)
console.log('Magic happens on port ' + port)
exports = module.exports = app

