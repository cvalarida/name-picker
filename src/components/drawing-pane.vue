<template lang="html">
  <div id="drawing-pane">

    <div v-for="drawing in history" class="drawing">
      <drawing-card :drawing="drawing"></drawing-card>
      <div class="vertical-connector"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DrawingCard from './drawing-card'

export default {
  name: 'drawing-pane',
  components: {
    'drawing-card': DrawingCard
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
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#drawing-pane {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  height: 100%;

  .drawing {
    width: 50%;
    max-width: 30em;
  }

  .vertical-connector {
    width: 1px;
    height: 2em;
    border-right: 1px solid #bbb;
    margin-left: auto;
    margin-right: auto;
  }

  // Hide the last vertical connector
  div.drawing:last-of-type {
    .vertical-connector {
      display: none;
    }
  }
}
</style>
