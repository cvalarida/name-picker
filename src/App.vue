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
import axios from 'axios'
import NamePane from './components/name-pane'
import DrawingPane from './components/drawing-pane'

// TODO: Make errors visible to the user

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
      names = names.split(/\r?\n/)
      axios.post('/names', names)
        .then((res) => this.fetchNames())
        .catch((err) => console.error(err))
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
      if (!searchObject) {
        searchObject = {}
      }
      const { searchString, startDate, endDate } = searchObject

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
        .then((res) => { this.history = res.data })
        .catch((err) => console.error(err))
    },

    drawNames: function (newDrawingObject) {
      // Make the date a unix timestamp
      newDrawingObject.date = newDrawingObject.date.unix()

      // Send the request to draw the names
      axios.post('/drawings', { ...newDrawingObject })
        // Reload the list of drawings
        // There's a better way to do this to reduce network traffic, but...
        .then((res) => this.fetchDrawings())
        .catch((err) => console.error(err))
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
