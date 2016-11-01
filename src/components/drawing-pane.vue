<template lang="html">
  <div id="drawing-pane">
    <!-- Search / Filter bar -->
    <search-bar :search="searchParam" @search="passSearch"></search-bar>

    <!-- List of Drawings -->
    <div id="drawing-list">
      <div class="top-spacer"><strong>{{ history.length }}</strong> drawings</div>

      <div v-for="drawing in history" class="drawing">
        <drawing-card :drawing="drawing"></drawing-card>
        <div class="vertical-connector"></div>
      </div>
    </div>

    <div v-if="history.length === 0">
    </div>

    <!-- Add Button -->
    <md-button class="md-fab md-fab-bottom-right">
      <md-icon>group_add</md-icon>
      <md-tooltip md-direction="left" md-delay="400">Draw New Names</md-tooltip>
    </md-button>
  </div>
</template>

<script>
import DrawingCard from './drawing-card'
import SearchBar from './search-bar'

export default {
  name: 'drawing-pane',
  components: {
    'drawing-card': DrawingCard,
    'search-bar': SearchBar
  },
  props: {
    history: Array
  },
  methods: {
    // There's got to be a better way of passing events up multiple components
    passSearch: function (searchString) {
      // console.log('caught search in drawing-pane: ' + searchString)
      this.$emit('search', searchString)
    }
  },
  data () {
    return {
      searchParam: ''
    }
  }
}
</script>

<style lang="scss">
#drawing-pane {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #drawing-list {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    width: 100%;

    padding-bottom: 4px;

    .top-spacer {
      height: 50px;
      text-align: right;
      margin: 8px 8px;
    }
  }

  .drawing {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    // Hide the last vertical connector
    &:last-of-type {
      .vertical-connector {
        display: none;
      }
    }
  }
}
</style>
