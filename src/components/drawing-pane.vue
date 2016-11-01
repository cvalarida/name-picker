<template lang="html">
  <div id="drawing-pane">
    <!-- Search / Filter bar -->
    <search-bar :search="searchParam"></search-bar>

    <!-- List of Drawings -->
    <div id="drawing-list">
      <div class="top-spacer"></div>

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
import moment from 'moment'
import DrawingCard from './drawing-card'
import SearchBar from './search-bar'

export default {
  name: 'drawing-pane',
  components: {
    'drawing-card': DrawingCard,
    'search-bar': SearchBar
  },
  data () {
    return {
      history: [
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
      ],
      searchParam: {}
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
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;
    width: 100%;

    padding-bottom: 4px;

    .top-spacer {
      height: 50px;
    }
  }

  .drawing {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    // height: 100%;

    // Hide the last vertical connector
    &:last-of-type {
      .vertical-connector {
        display: none;
      }
    }
  }
}
</style>
