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
    <md-button v-if="!newDrawingPanelOpen" class="md-fab md-fab-bottom-right" @click="openNewDrawingPane">
      <md-icon>casino</md-icon>
      <md-tooltip md-direction="left" md-delay="400">Draw New Names</md-tooltip>
    </md-button>

    <!-- New Drawing Panel -->
    <md-whiteframe class="new-drawing-panel" md-elevation="1" v-if="newDrawingPanelOpen">
      <form id="new-drawing-form" @submit.stop.prevent="handleAddButton">
        <md-input-container>
          <label>Primary</label>
          <md-input v-model="newDrawing.primary" type="number"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Alternate</label>
          <md-input v-model="newDrawing.alternate" type="number"></md-input>
        </md-input-container>

        <!-- Need Datepicker -->
        <md-input-container>
          <label>Date</label>
          <md-input v-model="newDrawing.date"></md-input>
        </md-input-container>

        <div class="draw-panel-buttons">
          <md-button class="md-raised md-primary" @click="handleAddButton">Draw Names</md-button>
          <md-button class="md-raised" @click="closeNewDrawingPane">Cancel</md-button>
        </div>
      </form>
    </md-whiteframe>
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
  props: {
    history: Array
  },
  methods: {
    // There's got to be a better way of passing events up multiple components
    passSearch: function (searchString) {
      // console.log('caught search in drawing-pane: ' + searchString)
      this.$emit('search', searchString)
    },

    openNewDrawingPane: function () {
      this.newDrawingPanelOpen = true
    },

    closeNewDrawingPane: function () {
      this.newDrawingPanelOpen = false
    },

    handleAddButton: function () {
      if (this.newDrawingPanelOpen) {
        this.$emit('drawNames', this.newDrawing)
      }
      this.newDrawingPanelOpen = false
    }
  },
  data () {
    return {
      searchParam: '',
      newDrawingPanelOpen: false,
      newDrawing: {
        primary: 3,
        alternate: 2,
        date: moment()
      }
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

  .new-drawing-panel {
    background: #fff;
    width: 100%;

    #new-drawing-form {
      display: flex;
      justify-content: space-around;

      .draw-panel-buttons {
        margin-top: auto;
        margin-bottom: auto;
      }
    }
  }
}
</style>
