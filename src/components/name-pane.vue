<template lang="html">
  <md-whiteframe md-elevation="1" id="name-pane">
    <md-tabs md-fixed>
      <!-- List Tab -->
      <md-tab md-label="List" md-icon="list">
        <div class="left-scroll-bar">
          <md-list class="name-list">
            <md-list-item v-for="person in people" class="name">
              <span @click="searchFor(person.name)">{{ person.name }}</span>
              <md-button class="md-icon-button delete-person-button" @click="openDeleteConfirm(person)">
                <md-icon>delete</md-icon>
              </md-button>
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

    <!-- Delete Confirmation Modal -->
    <modal v-if="deleteConfirmOpen">
      <h3 slot="header">Confirm Delete</h3>
      <span slot="body">Are you sure you want to remove <strong>{{ deleting.name }}</strong> from the list?</span>
      <div slot="footer">
        <md-button @click="deleteConfirmOpen = false">Cancel</md-button>
        <md-button class="md-warn" @click="deleteName(deleting._id)">Delete</md-button>
      </div>
    </modal>
  </md-whiteframe>
</template>

<script>
import modal from './modal'

export default {
  name: 'name-list',
  components: {
    modal
  },
  props: {
    people: Array
  },
  methods: {
    // Pass the new name back to the app to add it to the list
    addNames: function () {
      this.$emit('addNames', this.newNames)
      this.newNames = ''
    },

    openDeleteConfirm: function (person) {
      // Show the name of whom we're deleting
      this.deleting = person

      this.deleteConfirmOpen = true
    },

    // May change this to name later
    deleteName: function (id) {
      this.$emit('removeName', id)
      this.deleteConfirmOpen = false
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
      newNames: '',
      deleteConfirmOpen: false,
      deleting: {}
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

  .md-list-item .md-list-item-holder {
    // Space out the delete button
    justify-content: space-between;

    span {
      flex-grow: 1;
    }

    // Color the trash can gray when hovered over the name
    // Not working, not sure why, not going to mess with it right now.
    .name:hover .delete-person-button .md-icon {
      color: rgba(0,0,0,.54);
    }

    .delete-person-button {
      .md-icon {
        // Color the trash can white normally to hide it
        color: #fff;
        &:hover {
          // And red when hovered over the icon
          color: #f44336;
        }
      }
    }
  }

  .left-scroll-bar {
    direction: rtl;
  }
  .name-list {
    direction: ltr;
  }

  .modal-footer div {
    display: flex;
    align-content: center;
    justify-content: flex-end;
  }
}

@media print {
  #name-pane { display: none }
}
</style>
