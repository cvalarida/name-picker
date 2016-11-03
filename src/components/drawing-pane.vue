<template lang="html">
  <div id="drawing-pane">
    <!-- Search / Filter bar -->
    <search-bar :searchParam="searchString" @search="passSearch"></search-bar>

    <!-- List of Drawings -->
    <div id="drawing-list">
      <div class="top-spacer">
        <strong>{{ history.length }}</strong> drawings {{ searchString !== '' ? 'for ' + searchString : '' }}
      </div>

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
    <!-- Really could have pulled this out into its own component -->
    <md-whiteframe class="new-drawing-panel" md-elevation="1" v-if="newDrawingPanelOpen">
      <form id="new-drawing-form" @submit.stop.prevent="handleAddButton">
        <md-input-container id="primary-input">
          <label>Primary</label>
          <md-input v-model="newDrawing.primary" type="number" min="1"></md-input>
          <span class="md-error" id="primary-input-error"></span>
        </md-input-container>
        <md-input-container id="alternate-input">
          <label>Alternate</label>
          <md-input v-model="newDrawing.alternate" type="number" min="0"></md-input>
          <span class="md-error" id="alternate-input-error"></span>
        </md-input-container>

        <md-input-container id="drawing-date-input">
          <!-- HACK ...but it works...just looks funny -->
          <!-- I don't like it, but I can't spend any more time on it -->
          <!-- It also leaves this stupid little line and I don't know why -->
          <label>{{ newDrawingFormattedDate || 'Date' }}</label>
          <span class="md-error" id="drawing-date-input-error"></span>
          <flatpickr
            :options="{ dateFormat: 'F j, Y' }"
            @update="updateDrawingDate"
          >
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
import Flatpickr from 'vue-flatpickr/vue-flatpickr-material_red'

import DrawingCard from './drawing-card'
import SearchBar from './search-bar'

export default {
  name: 'drawing-pane',
  components: {
    'drawing-card': DrawingCard,
    'search-bar': SearchBar,
    'flatpickr': Flatpickr
  },
  props: {
    history: Array,
    searchString: String
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
      let errors = false
      console.log(document.getElementById('drawing-date-input-error'))
      if (this.newDrawing.date === '') {
        errors = true
        document.getElementById('drawing-date-input').classList.add('md-input-invalid')
      }
      if (this.newDrawing.primary < 1) {
        errors = true
        document.getElementById('primary-input').classList.add('md-input-invalid')
        document.getElementById('primary-input-error').innerHTML = 'Must be greater than 1'
      }
      if (this.newDrawing.alternate < 0) {
        errors = true
        document.getElementById('alternate-input').classList.add('md-input-invalid')
        document.getElementById('alternate-input-error').innerHTML = 'Cannot be negative'
      }

      if (!errors) {
        this.$emit('drawNames', this.newDrawing)
        this.newDrawingPanelOpen = false

        // Reset errors...
        document.getElementById('drawing-date-input').classList.remove('md-input-invalid')
        document.getElementById('primary-input').classList.remove('md-input-invalid')
        document.getElementById('alternate-input').classList.remove('md-input-invalid')
        document.getElementById('alternate-input-error').innerHTML = ''
        document.getElementById('primary-input-error').innerHTML = ''
      }
    },

    updateDrawingDate: function (newDate) {
      this.newDrawing.date = moment(newDate, 'MMMM D, YYYY')

      // Because I couldn't just display newDrawing.date.format() in the
      //  template because when it was '', .format() didn't exist and I don't
      //  want to default to moment() because we can't edit the date if
      this.newDrawingFormattedDate = newDate
      // Now that a date has been selected, make sure it looks valid
      document.getElementById('drawing-date-input').classList.remove('md-input-invalid')
    }
  },
  data () {
    return {
      newDrawingPanelOpen: false,
      newDrawing: {
        primary: 3,
        alternate: 2,
        // Since we can't update the drawings once drawn,  the date the drawing
        //  is for needs to be deliberately chosen. We'll default to today in
        //  the datepicker, though.
        // date: moment()
        date: ''
      },
      newDrawingFormattedDate: ''
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

      .md-input-container {
        max-width: 200px;
        flex-shrink: 1;
        flex-grow: 1;
      }
    }
  }
}

@media print {
  .new-drawing-panel { display: none }
  .md-fab.md-fab-bottom-right { display: none }

  #drawing-pane #drawing-list {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;

    overflow: visible;

    .top-spacer {
      width: 100%;
      flex-shrink: 0;
    }

    .drawing { position: relative }
  }
}
</style>
