'use strict';

var app = require('./src/bootstrap')
const vorpal = require('vorpal')()

// Load up the config

//////////////
// COMMANDS //
//////////////

// Create DB
vorpal.command('create database')
  .action(function (args, cb) {

  })

// Select DB
vorpal.command('select database')
  .action(function (args, cb) {

  })

// Create user
vorpal.command('create user')
  .action(function (args, cb) {

  })

  // Remove user
vorpal.command('remove user')
  .action(function (args, cb) {

  })

// Show the prompt
vorpal.show()
