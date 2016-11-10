<template>
  <div id="app" v-md-theme="'default'">
    <name-pane
      :people="people"
      @addNames="addNames"
      @removeName="removeName"
      @search="fetchDrawings"
    ></name-pane>
    <drawing-pane
      :history="history"
      :searchString="searchString"
      @search="fetchDrawings"
      @drawNames="drawNames"
    ></drawing-pane>
  </div>
</template>

<script>
import moment from 'moment'
moment()
import axios from 'axios'
import NamePane from './components/name-pane'
import DrawingPane from './components/drawing-pane'

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
// let sortByDate = function (list, asc = false) {
//   return list.sort((a, b) => {
//     if (a.date.isBefore(b.date)) {
//       return asc ? -1 : 1
//     } else if (b.date.isBefore(a.date)) {
//       return asc ? 1 : -1
//     } else {
//       return 0
//     }
//   })
// }

export default {
  name: 'app',
  components: {
    NamePane,
    DrawingPane
  },
  methods: {
    fetchNames: function () {
      axios.get('/names')
        .then((res) => {
          this.people = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },

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
    fetchDrawings: function (searchObject) {
      const { searchString, startDate, endDate } = searchObject
      console.log(`Searching for ${searchString} between`, startDate, ' and ', endDate)

      let params = {}
      if (searchString) {
        params.name = searchString
      }
      if (startDate) {
        params.startDate = startDate.unix()
      }
      if (endDate) {
        params.endDate = endDate.unix()
      }

      axios.get('/drawings', { params })
        .then((res) => {
          this.history = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    },

    drawNames: function (newDrawingObject) {
      // const { primary, alternate, date } = newDrawingObject
      // Send the request to draw the names
      // Get the drawings again
    }
  },
  data () {
    return {
      people: [],
      history: [],
      searchString: null
    }
  },
  beforeMount: function () {
    // Get the names
    this.fetchNames()

    // And the drawings
    this.fetchDrawings({ searchString: '' })
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
