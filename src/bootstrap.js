const Datastore = require('nedb')
const jsonfile = require('jsonfile')
const path = require('path')
var exports = {}

const root = path.resolve(__dirname, '../')
const defaultConfigPath = path.resolve(root, 'config/app.default.json')
const definedConfigPath = path.resolve(root, 'config/app.json')

// /////////// //
// Load Config //
// /////////// //
var loadConfig = function () {
  var defaultConfig = {}
  var definedConfig = {}

  try {
    defaultConfig = require(defaultConfigPath)
  } catch (e) {}

  try {
    definedConfig = require(definedConfigPath)
  } catch (e) {}

  exports.config = Object.assign(defaultConfig, definedConfig)
  // console.log(exports.config)
}

exports.updateConfig = function (newConfig, reload) {
  if (reload === undefined) {
    reload = true
  }

  var config = {}
  try {
    config = require(definedConfigPath)
  } catch (e) {}

  jsonfile.writeFile(definedConfigPath,
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

// ///////////// //
// Load Database //
// ///////////// //
var loadDatabase = function () {
  var loadedDb = function (name, error) {
    if (error) {
      console.error('Error loading ' + name, error)
    }
  }

  // If a collection doesn't exist with the current db name, a new one is created
  var db = {}
  db.users = new Datastore({
    filename: root + `db/${exports.config.db}.users.db`,
    onload: (error) => loadedDb('users', error),
    autoload: true
  })
  db.names = new Datastore({
    filename: root + `db/${exports.config.db}.names.db`,
    onload: (error) => loadedDb('names', error),
    autoload: true
  })
  db.drawings = new Datastore({
    filename: root + `db/${exports.config.db}.drawings.db`,
    onload: (error) => loadedDb('drawings', error),
    autoload: true
  })

  // Ensure they're indexed
  db.users.ensureIndex({ fieldName: 'username', unique: true })
  db.names.ensureIndex({ fieldName: 'name', unique: true })
  db.drawings.ensureIndex({ fieldName: 'date' })

  exports.db = db
}

// ///////////////////////////////// //
// Restart (or start the first time) //
// ///////////////////////////////// //
exports.restart = function () {
  loadConfig()
  loadDatabase()
}

// Actually boot up now
exports.restart()

module.exports = exports
