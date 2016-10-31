<template lang="html">
  <md-whiteframe md-elevation="1" id="name-list">
    <div class="md-title names-header">Names</div>

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

  .names-header {
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 0.5em 0em 0.5em 0em;
  }
}
</style>
