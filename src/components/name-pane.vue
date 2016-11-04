<template lang="html">
  <md-whiteframe md-elevation="1" id="name-pane">
    <md-tabs md-fixed>
      <!-- List Tab -->
      <md-tab md-label="List" md-icon="list">
        <div class="left-scroll-bar">
          <md-list class="name-list">
            <md-list-item v-for="person in people" @click="searchFor(person.name)">
              <span>{{ person.name }}</span>
            </md-list-item>
          </md-list>
        </div>
      </md-tab>

      <!-- Add Names Tab -->
      <md-tab md-label="Add" md-icon="add">
        <md-input-container md-inline class="new-name-input">
          <label>New Names</label>
          <md-textarea v-model="newNames"></textarea>
        </md-input-container>
        <md-button class="md-primary md-raised" @click="addNames">
          <md-icon>add</md-icon>
          Add
        </md-button>
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
    addNames: function () {
      this.$emit('addNames', this.newNames)
      this.newNames = ''
    },

    logEvent: function (event) {
      console.log(event)
    },

    searchFor: function (name) {
      this.$emit('search', { searchString: name })
    }
  },
  data () {
    return {
      newNames: ''
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

  // I hate that I have use !important, but...apart from setting a specific
  //  height on the #new-name-form, it's all I can do to make the tab only
  //  scroll when necessary, rather than when it gets passed its inlined style.
  .md-tabs {
    height: 100%;
  }
  .md-tabs-content {
    overflow-y: auto;
    height: 100% !important;
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
