<template lang="html">
  <div id="drawing-pane">

    <div v-for="drawing in history" class="drawing">
      <md-card md-with-hover class="drawing-card">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ drawing.date.format('MMMM D, YYYY') }}</div>
            <div class="md-subhead">{{ drawing.names.primary.join(', ') }}</div>
          </md-card-header-text>

          <div>{{ drawing.date.fromNow() }}</div>
        </md-card-header>

        <md-card-content>
          <div><strong>Primary:</strong>   {{ drawing.names.primary.join(', ') }}</div>
          <div><strong>Alternate:</strong> {{ drawing.names.alternate.join(', ') }}</div>
        </md-card-content>
      </md-card>

      <div class="vertical-connector"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'drawing-pane',
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
