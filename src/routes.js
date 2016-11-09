'use strict'

const bodyParser = require('body-parser')

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
    bootstrap.db.names.find({}).exec((err, docs) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        res.json(docs)
      }
    })
  })

  // Remember: Dates are stored as UNIX timestamps
  app.get('/drawings', function(req, res) {
    // Parse the search filters
    let filters = {}

    // Get the drawings from the db and send them back in JSON
    bootstrap.db.drawings.find(filters).sort({ date: 1 }).exec((err, docs) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err })
      } else {
        res.json(docs)
      }
    })
  })

  app.post('/names', function(req, res) {
    let names = req.body.names

    // Format them so the first letter is for-sure capitalized
    names = names.map((n) => {
      return n.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
    });

    // Insert the names into the db
    bootstrap.db.names.insert(names, (err) => {
      if (err) {
        console.error(err)
        res.status(500).json({ succcess: false, error: err })
      } else {
        res.json({ success: true })
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
        // Running the node dev server doesn't like this deconstruction
        // const { primary, alternate, date } = req.body.drawingSpec
        const primary = req.body.drawingSpec.primary
        const alternate = req.body.drawingSpec.alternate
        const date = req.body.drawingSpec.date
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
        bootstrap.db.names.insert(drawing, (err) => {
          if (err) {
            console.error(err)
            res.status(500).json({ succcess: false, error: err })
          } else {
            res.json({ success: true })
          }
        })
      }
    })
  })
}
