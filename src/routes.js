'use strict'

const bodyParser = require('body-parser')
require('./polyfills')

/**
 * Registers the express routes.
 * @param app  Express app
 * @param bootstrap  Bootstrapped name-picker app
 */
module.exports = function (app, bootstrap) {
  // Parse JSON bodies
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/names', function(req, res) {
    // Get the names from the db and send them back in JSON
    bootstrap.db.names.find({}).sort({ name: 1 }).exec((err, docs) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        res.json(docs)
      }
    })
  })

  app.post('/names', function(req, res) {
    let names = req.body
    // Format them so the first letter is for-sure capitalized
    names = names.map((n) => {
      var person = {}
      person.name = n.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
      return person
    });

    // Insert the names into the db
    bootstrap.db.names.insert(names, (err, docs) => {
      if (err) {
        console.error(err)
        res.status(500).json({ succcess: false, error: err })
      } else {
        res.json({ success: true })
      }
    })
  })

  app.delete('/name', function (req, res) {
    bootstrap.db.names.remove({ _id: req.query.id }, {}, (err, numRemoved) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        res.json({ success: true })
      }
    })
  })

  app.get('/drawings', function(req, res) {
    // Grab the search filters
    let filters = {
      // $or: [{ "names.primary": nameQuery }, { "names.alternate": nameQuery }],
      // date: {
      //   $gte: req.query.startDate,
      //   $lte: req.query.endDate
      // }
    }
    if (req.query.name) {
      let nameQuery = new RegExp(req.query.name, 'i')
      filters.$or = [
        { "names.primary": nameQuery },
        { "names.alternate": nameQuery }
      ]
    }
    if (req.query.startDate) {
      filters.date = { $gte: parseInt(req.query.startDate) }
    }
    if (req.query.endDate) {
      if (!filters.date) {
        filters.date = {}
      }
      filters.date.$lte = parseInt(req.query.endDate)
    }

    // Get the drawings from the db and send them back in JSON
    // Dates are stored as unix timestamps for easy sorting
    bootstrap.db.drawings.find(filters).sort({ date: -1 }).exec((err, docs) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        res.json(docs)
      }
    })
  })

  app.post('/drawings', function(req, res) {
    // This really isn't the best way to do it, I don't think, but it'll only be
    //  pulling in a pretty small number of names (200 is a lot for this use
    //  case), so I'm not too concerned.

    // Get the list of names
    bootstrap.db.names.find({}).exec((err, people) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        // Create a drawing...
        // When running the server, can't use ES6, it would seem
        // const { primary, alternate, date } = req.body
        const primary = req.body.primary
        const alternate = req.body.alternate
        const date = req.body.date
        let chosenCount = primary + alternate
        let drawing = {
          date,
          names: { primary: [], alternate: [] }
        }

        // If there aren't enough names, use them all and issue a warning...for now
        if (chosenCount > people.length) {
          console.warn(`There aren't enough names in the list of people to pick ${primary} primary and ${alternate} alternate people.`)
          chosenCount = people.length
        }

        let randBetween = function getRandomInt (min, max) {
          min = Math.ceil(min)
          max = Math.floor(max)
          return Math.floor(Math.random() * (max - min)) + min
        }

        // Generate primary + secondary unique numbers from 0 to people.length
        let chosenIndexes = []
        for (var i = 0; i < chosenCount; i++) {
          let rIndex = randBetween(0, people.length)

          if (chosenIndexes.includes(rIndex)) {
            i--
          } else {
            chosenIndexes.push(rIndex)
          }
        }

        // Pull out the names
        for (i = 0; i < chosenCount; i++) {
          if (i < primary) {
            drawing.names.primary.push(people[chosenIndexes[i]].name)
          } else {
            drawing.names.alternate.push(people[chosenIndexes[i]].name)
          }
        }

        // Insert the new drawing into the db
        bootstrap.db.drawings.insert(drawing, (err) => {
          if (err) {
            console.error(err) // Does console.error even work here?
            res.status(500).json({ succcess: false, error: err })
          } else {
            res.json({ success: true })
          }
        })
      }
    })
  })
}
