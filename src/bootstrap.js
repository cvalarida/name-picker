var Datastore = require('nedb')
var exports = {}

const root = __dirname + '/../'

/////////////////
// Load Config //
/////////////////
var loadConfig = function () {
  var defaultConfig = {}
  var definedConfig = {}

  try {
    defaultConfig = require(root + '/config.default.js')
  } catch (e) {}

  try {
    definedConfig = require(root + '/config.js')
  } catch (e) {}

  exports.config = Object.assign(defaultConfig, definedConfig)
  console.log(exports.config)
}

///////////////////
// Load Database //
///////////////////
var loadDatabase = function () {
  var loadedDb = function (name, error) {
    if (!error) {
      console.log('Loaded ' + name)
    } else {
      console.error('Error loading ' + name, error)
    }
  }

  // If a collection doesn't exist with the current db name, a new one is created
  var db = {}
  db.users    = new Datastore({
    filename: root + `db/${exports.config.db}.users.db`,
    onload: (error) => loadedDb('users', error),
    autoload: true
  })
  db.names    = new Datastore({
    filename: root + `db/${exports.config.db}.names.db`,
    onload: (error) => loadedDb('names', error),
    autoload: true
  })
  db.drawings = new Datastore({
    filename: root + `db/${exports.config.db}.drawings.db`,
    onload: (error) => loadedDb('drawings', error),
    autoload: true
  })

  exports.db = db
}

///////////////////////////////////////
// Restart (or start the first time) //
///////////////////////////////////////
exports.restart = function () {
  loadConfig()
  loadDatabase()
}

// Actually boot up now
exports.restart()

module.exports = exports
