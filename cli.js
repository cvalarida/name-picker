'use strict';

var app = require('./src/bootstrap')
const vorpal = require('vorpal')()

// Load up the config

//////////////
// COMMANDS //
//////////////

/**
 * Select DB
 *
 * Really could make this prompt with a list of databases currently created, but
 *  I figure if you're changing the database, you'll know what they are or can
 *  easily find out, so it's not really worth the time at the moment.
 */
vorpal.command('select database <name>')
  .description('Select another database to use. If the database specified doesn\'t exist, it will be created.')
  .action(function (args, cb) {
    // Switch to name
    // Reloads the config automatically
    app.updateConfig({ db: args.name })

    cb()
  })

vorpal.command('current database', 'Displays the name of the current database.')
  .action(function (args, cb) {
    console.log(app.config.db)
    cb()
  })

// Create user
vorpal.command('create user <username>')
  .action(function (args, cb) {

  })

  // Remove user
vorpal.command('remove user <username>')
  .action(function (args, cb) {

  })

// Show the prompt
vorpal.delimiter('name-picker$ ').show()
