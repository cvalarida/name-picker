<template>
  <div id="app" v-md-theme="'default'">
    <name-list></name-list>
    <drawing-pane></drawing-pane>
  </div>
</template>

<script>
import NameList from './components/name-list'
import DrawingPane from './components/drawing-pane'

// Probably we'll wnat to deal with the database here

export default {
  name: 'app',
  components: {
    NameList,
    DrawingPane
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
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;

  // margin-top: 60px;

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
