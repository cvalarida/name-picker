<template lang="html">
  <md-whiteframe md-elevation="1" id="name-list">
    <div class="names-header">
      <div class="md-title">Names</div>
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
      ]
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

  .names-header {
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid #eee;
    // Line it up with the search bar
    height: 50px;
  }
}
</style>
