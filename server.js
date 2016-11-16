var express = require('express')
var expressApp = express()
var path = require('path')
var pickerApp = require('./src/bootstrap')
var registerRoutes = require('./src/routes')

var port = 8080

// Open up the static files
expressApp.use(express.static(path.join(__dirname + '/dist')))

// Serve index.html
expressApp.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Register API routes
registerRoutes(expressApp, pickerApp)

// Listen
expressApp.listen(port, function (err) {
  if (err) {
    console.error(err)
    return
  }

  var uri = 'http://localhost:' + port
  console.log('Listening at ' + port + '...\n')
})
