<template lang="html">
  <div id="drawing-pane">
    <!-- Search / Filter bar -->
    <search-bar :filter="filter"></search-bar>

    <!-- List of Drawings -->
    <div id="drawing-list">
      <div class="top-spacer"></div>

      <div v-for="drawing in history" class="drawing">
        <drawing-card :drawing="drawing"></drawing-card>
        <div class="vertical-connector"></div>
      </div>
    </div>

    <!-- Add Button -->
    <md-button class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
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
      filter: {}
    }
  }
}
</script>

<style lang="scss">
#drawing-pane {
  display: flex;
  flex-direction: column;

  #drawing-list {
    overflow-y: scroll;
    overflow-x: hidden;

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
