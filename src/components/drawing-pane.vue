<template lang="html">
  <div id="drawing-pane">

    <div v-for="drawing in history" class="drawing">
      <md-card md-with-hover class="drawing-card">
        <md-card-header>{{ drawing.date }}</md-card-header>

        <md-card-expand>
          <md-card-actions>
            <md-button class="md-icon-button" md-expand-trigger>
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-actions>

          <md-card-content>
            <span v-for="name in drawing.names">
              {{ name }}
            </span>
          </md-card-content>
        </md-card-expand>
      </md-card>

      <div class="vertical-connector"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawing-pane',
  data () {
    return {
      history: [
        { date: new Date(), names: ['Bobo', 'Clyve', 'Aesop'] },
        { date: new Date(), names: ['Jo', 'Bonnie', 'Nevylle'] }
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
    max-width: 35em;
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
