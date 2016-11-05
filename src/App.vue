<template>
  <div id="app" v-md-theme="'default'">
    <name-pane
      :people="people"
      @addNames="addNames"
      @removeName="removeName"
      @search="search"
    ></name-pane>
    <drawing-pane
      :history="filteredHistory"
      :searchString="searchString"
      @search="search"
      @drawNames="drawNames"
    ></drawing-pane>
  </div>
</template>

<script>
import moment from 'moment'
import NamePane from './components/name-pane'
import DrawingPane from './components/drawing-pane'

// TODO: Get the collections here

let sortByName = function (list, asc = true) {
  return list.sort((a, b) => {
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()

    if (nameA < nameB) {
      return asc ? -1 : 1
    } else if (nameA > nameB) {
      return asc ? 1 : -1
    } else {
      return 0
    }
  })
}

// Shouldn't really be needed once we get NeDB up and running...
// Assumes all dates are instances of moment
let sortByDate = function (list, asc = true) {
  return list.sort((a, b) => {
    if (a.date.isBefore(b.date)) {
      return asc ? -1 : 1
    } else if (b.date.isBefore(a.date)) {
      return asc ? 1 : -1
    } else {
      return 0
    }
  })
}

// But for now...
let people = [
  { name: 'Bobo' },
  { name: 'Claudia' },
  { name: 'Demosthenes' },
  { name: 'Artaxerxes' },
  { name: 'Herald' },
  { name: 'Clyve' },
  { name: 'Aesop' },
  { name: 'Josephine' },
  { name: 'Kyle' },
  { name: 'Jo' },
  { name: 'Bonnie' },
  { name: 'Nevylle' },
  { name: 'Lester' },
  { name: 'Ingred' },
  { name: 'James' },
  { name: 'Karl' },
  { name: 'Johann' },
  { name: 'Aaron' },
  { name: 'Lyle' }
]

let history = [
  {
    date: moment('2016-10-21'),
    names: {
      primary: ['Bobo', 'Clyve', 'Aesop'],
      alternate: ['Josephine', 'Kyle']
    }
  },
  {
    date: moment('2016-10-28'),
    names: {
      primary: ['Jo', 'Bonnie', 'Nevylle'],
      alternate: ['Lester', 'Ingred']
    }
  },
  {
    date: moment('2016-11-4'),
    names: {
      primary: ['James', 'Karl', 'Johann'],
      alternate: ['Aaron', 'Lyle']
    }
  }
]

export default {
  name: 'app',
  components: {
    NamePane,
    DrawingPane
  },
  methods: {
    addNames: function (names) {
      // Add the names to the list...
      // Ideally, we'd add the names to the right position to start with, but
      //  that's more hassle than I want to deal with for only like 100 records
      //  that'll already be sorted by the time we get here, so...

      // Turn it into an array of names separated by newlines
      names = names.split(/\r?\n/)
      // console.log(names)
      for (var name of names) {
        if (name !== '') {
          this.people.push({ name })
        }
      }
      this.people = sortByName(this.people)
    },

    // This'll change when we get NeDB up
    // May change to use the name instead of the index...unless we give them IDs
    removeName: function (index) {
      this.people.splice(index, 1)
    },

    /**
     * Searches through the history for the name given
     *
     * Later, it would be cool to search in only primary or alternate if
     *  specified like: primary:Bobo the Clown
     *
     * This'll change pretty radically, I imagine, when we get NeDB up
     *
     * @param Object searchObject  {
     *     searchString: String,
     *     startDate: Moment instance,
     *     endDate: Moment instance
     *   }
     */
    search: function (searchObject) {
      const { searchString, startDate, endDate } = searchObject
      console.log(`Searching for ${searchString} between`, startDate, ' and ', endDate)
      // Filter the history based on the search string
      // It's perhaps not elegant, but it works.

      // Make sure the search bar is up to date
      this.searchString = searchString

      const re = new RegExp(searchString, 'i')

      this.filteredHistory = history.filter((drawing) => {
        // Ensure the dates are right
        if ((startDate && drawing.date.isBefore(startDate)) ||
          (endDate && drawing.date.isAfter(endDate))) {
          return false
        }

        // just slap them all together--it's not perfect, but it should help
        //  performance (testing needed)
        return re.test(drawing.names.primary.join(' ') +
          ' ' +
          drawing.names.alternate.join(' '))
      })
    },

    drawNames: function (newDrawingObject) {
      const { primary, alternate, date } = newDrawingObject
      let chosenCount = primary + alternate
      let drawing = {
        date,
        names: { primary: [], alternate: [] }
      }

      // If there aren't enough names, use them all and issue a warning...for now
      if (chosenCount > this.people.length) {
        console.warn(`There aren't enough names in the list of people to pick ${primary} primary and ${alternate} alternate people.`)
        chosenCount = this.people.length
      }

      let randBetween = function getRandomInt (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
      }

      // Generate primary + secondary unique numbers from 0 to people.length
      let chosenIndexes = []
      for (var i = 0; i < chosenCount; i++) {
        let rIndex = randBetween(0, this.people.length)

        if (chosenIndexes.includes(rIndex)) {
          i--
        } else {
          chosenIndexes.push(rIndex)
        }
      }

      // Pull out the names
      for (i = 0; i < chosenCount; i++) {
        if (i < primary) {
          drawing.names.primary.push(this.people[chosenIndexes[i]].name)
        } else {
          drawing.names.alternate.push(this.people[chosenIndexes[i]].name)
        }
      }

      // Add it to the history
      // Ideally, we wouldn't do it like this, but for now...
      this.history.push(drawing)
      this.history = sortByDate(this.history)
    }
  },
  data () {
    return {
      imgAlt: "I'm an image title!",
      people: sortByName(people),
      history: sortByDate(history),
      filteredHistory: history,
      searchString: null
    }
  }
}
</script>

<style lang='scss'>
html {
  background: #efefef;
}

#app {
  display: flex;
  height: 100vh;

  // Make the drawing list wider than the name list
  #name-pane {
    flex: 2;
  }

  #drawing-pane {
    flex: 5;
  }
}
</style>
