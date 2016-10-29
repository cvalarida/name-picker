<template lang="html">
  <div id='name-list'>
    <div v-for="person in people" class="name">
      {{ person.name }}
    </div>
  </div>
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

<style lang="css" scoped>
#name-list {
}

.name {
    /*text-align: center;*/
}
</style>
