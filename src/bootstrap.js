var Datastore = require('nedb')
var jsonfile = require('jsonfile')
var exports = {}

const root = __dirname + '/../'

/////////////////
// Load Config //
/////////////////
var loadConfig = function () {
  var defaultConfig = {}
  var definedConfig = {}

  try {
    defaultConfig = require(root + 'config.default.json')
  } catch (e) {}

  try {
    definedConfig = require(root + 'config.json')
  } catch (e) {}

  exports.config = Object.assign(defaultConfig, definedConfig)
  // console.log(exports.config)
}

exports.updateConfig = function (newConfig, reload) {
  if (reload == undefined)
    reload = true;

  var config = {}
  try {
    config = require(root + 'config.json')
  } catch (e) {}

  jsonfile.writeFile(root + 'config.json',
    Object.assign(config, newConfig),
    { spaces: 2 },
    (error) => {
      if (error) {
        console.error('Could not write to config file: ', error)
      } else if (reload) {
        loadConfig()
        loadDatabase()
      }
    }
  )
}

///////////////////
// Load Database //
///////////////////
var loadDatabase = function () {
  var loadedDb = function (name, error) {
    if (error) {
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
