<template>
  <div id="app" v-md-theme="'default'">
    <name-pane :people="people" @addName="addPerson"></name-pane>
    <drawing-pane :history="filteredHistory" @search="search"></drawing-pane>
  </div>
</template>

<script>
import moment from 'moment'
import NamePane from './components/name-pane'
import DrawingPane from './components/drawing-pane'

// TODO: Get the collections here

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
    addPerson: function (name) {
      // Add the name to the list...
      this.people.push({ name })
    },

    /**
     * Searches through the history for the name given
     *
     * Later, it would be cool to search in only primary or alternate if
     *  specified like: primary:Bobo the Clown
     */
    search: function (searchString) {
      // This'll change pretty radically, I imagine, when we get NeDB up
      // console.log('Searching in App for ' + searchString)

      const re = new RegExp(searchString, 'i')

      // Filter the history based on the search string
      // It's perhaps not elegant, but it works.
      this.filteredHistory = history.filter((drawing) => {
        // just slap them all together--it's not perfect, but it should help
        //  performance (testing needed)
        return re.test(drawing.names.primary.join(' ') +
          ' ' +
          drawing.names.alternate.join(' '))
      })
    }
  },
  data () {
    return {
      imgAlt: "I'm an image title!",
      people,
      history,
      filteredHistory: history
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
