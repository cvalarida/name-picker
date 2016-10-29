<template>
  <div id="app">
    <name-list></name-list>
    <drawing-list></drawing-list>
  </div>
</template>

<script>
import NameList from './components/name-list'
import DrawingList from './components/drawing-list'

// Probably we'll wnat to deal with the database here

export default {
  name: 'app',
  components: {
    NameList,
    DrawingList
  },
  data () {
    return {
      imgAlt: "I'm an image title!"
    }
  }
}
</script>

<style lang='scss'>
html {
  background: #efefef;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  // margin-top: 60px;

  display: flex;

  // Make the drawing list 5 times wider than the name list
  #name-list {
    flex: 1;
  }

  #drawing-list {
    flex: 5;
  }
}
</style>
