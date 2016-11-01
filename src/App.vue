<template>
  <div id="app" v-md-theme="'default'">
    <name-list :people="people"></name-list>
    <drawing-pane :history="history"></drawing-pane>
  </div>
</template>

<script>
import moment from 'moment'
import NameList from './components/name-list'
import DrawingPane from './components/drawing-pane'

// Probably we'll want to deal with the database here or in main.js...

// But for now...
let people = [
  { name: 'Bobo' },
  { name: 'Claudia' },
  { name: 'Demosthenes' }
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
    NameList,
    DrawingPane
  },
  data () {
    return {
      imgAlt: "I'm an image title!",
      people,
      history
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
  #name-list {
    flex: 2;
  }

  #drawing-pane {
    flex: 5;
  }
}
</style>
