<template lang="html">
  <md-whiteframe md-elevation="1" id="name-pane">
    <!-- <div class='tabs-spacer'></div> -->

    <md-tabs md-fixed>
      <md-tab md-label="List" md-icon="list">
        <div class="left-scroll-bar">
          <md-list class="name-list">
            <md-list-item v-for="person in people" @click="searchFor(person.name)">
              <span>{{ person.name }}</span>
            </md-list-item>
          </md-list>
        </div>
      </md-tab>

      <md-tab md-label="Add" md-icon="add">
        <form id="new-name-form" @submit.stop.prevent="addName">
          <md-input-container md-inline class="new-name-input">
            <label>New Name</label>
            <md-input v-model="newName"></input>
          </md-input-container>
          <md-button class="md-primary md-raised" @click="addName">
            <md-icon>add</md-icon>
            Add
          </md-button>
        </form>
      </md-tab>
    </md-tabs>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'name-list',
  props: {
    people: Array
  },
  methods: {
    // Pass the new name back to the app to add it to the list
    addName: function () {
      this.$emit('addName', this.newName)
      this.newName = ''
    },

    logEvent: function (event) {
      console.log(event)
    },

    searchFor: function (name) {
      this.$emit('search', name)
    }
  },
  data () {
    return {
      newName: ''
    }
  }
}
</script>

<style lang="scss">
#name-pane {
  display: flex;
  flex-direction: column;

  max-width: 20em;
  background-color: #fff;
  // Prevent the shadow of the search bar from overlapping the names list
  z-index: 30;

  #new-name-form {
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    // padding: 0 10px 0 10px;
    padding-left: 10px;
    border-bottom: 1px solid #ddd;

    .new-name-input {
      flex-grow: 1;
    }
  }

  .tabs-spacer {
    height: 28px;
    // Purple, the primary color
    // Preferably, we'd be able to get the color from the theme, but...
    background-color: #9c27b0;
    flex-shrink: 0;
  }

  .md-tabs-content {
    overflow-y: auto;
    // direction: rtl;
  }
  .left-scroll-bar {
    direction: rtl;
  }
  .name-list {
    direction: ltr;
  }
}

@media print {
  #name-pane { display: none }
}
</style>
