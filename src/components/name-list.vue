<template lang="html">
  <md-whiteframe md-elevation="1" id="name-list">
    <div id="new-name-form">
      <md-input-container md-inline class="new-name-input">
        <label>New Name</label>
        <md-input v-model="newName"></input>
      </md-input-container>
      <md-button class="md-primary md-raised">
        <md-icon>add</md-icon>
        Add
      </md-button>
    </div>

    <md-list>
      <md-list-item v-for="person in people">
        <span>{{ person.name }}</span>
      </md-list-item>
    </md-list>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'name-list',
  data () {
    return {
      people: [
        { name: 'Bobo' },
        { name: 'Claudia' },
        { name: 'Demosthenes' }
      ],
      newName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
#name-list {
  max-width: 20em;
  background-color: #fff;
  // Prevent the shadow of the search bar from overlapping the names list
  z-index: 30;

  #new-name-form {
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
}
</style>
