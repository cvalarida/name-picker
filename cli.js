'use strict'

var app = require('./src/bootstrap')
const vorpal = require('vorpal')()
const crypto = require('bcryptjs')

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
    this.log(vorpal.chalk['green'](app.config.db))
    cb()
  })

// Create user
vorpal.command('create user <username>')
  .action(function (args, cb) {
    var v = this
    // Prompt for password
    this.prompt({
      type: "password",
      name: "password",
      message: "Password:"
    }, (result) => {
      var user = {
        username: args.username,
      }

      // Hash the password
      crypto.genSalt(10, function (error, salt) {
        crypto.hash(result.password, salt, function (error, hash) {
          if (error) {
            console.error(error);
          } else {
            user.password = hash;

            app.db.users.insert(user, (err) => {
              if (err) {
                console.error(err)
              } else {
                v.log(vorpal.chalk['green'](`Added ${args.username} to users.`))
              }

              cb()
            })
          }
        }); // End hash
      }); // End genSalt
    }) // End prompt
  }) // End action

// Remove user
vorpal.command('remove user <username>')
  .action(function (args, cb) {
    var v = this

    app.db.users.remove({ username: args.username }, (err) => {
      if (err) {
        console.error(err)
      } else {
        v.log(vorpal.chalk['green'](`Removed ${args.username} to users.`))
      }

      cb()
    })
  })

// List users
vorpal.command('list users')
  .action(function (args, cb) {
    var v = this

    app.db.users.find({}).sort({ username: 1}).exec((err, docs) => {
      if (err) {
        console.error(err)
      } else {
        // Alternate green and white...because why not?
        docs.forEach((doc, index) => v.log(vorpal.chalk[index % 2 == 0 ? 'white' : 'green'](doc.username)))
      }

      cb()
    })
  })

// Generate JWT secret
vorpal.command('generate secret', 'Generates a new secret key to encode the JWT tokens with.')
  .action(function (args, cb) {
    crypto.genSalt((err, salt) => {
      if (err) {
        console.error(err)
      } else {
        app.updateConfig({ secret: salt })
        this.log(vorpal.chalk['green']('Successfully generated secret.'))
      }
      cb()
    })
  })

// Show the prompt
vorpal.delimiter('name-picker$ ').show()
