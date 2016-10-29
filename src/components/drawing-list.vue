<template lang="html">
  <div id="drawing-list">
    <div v-for="drawing in history">
      <div>{{ drawing.date }}</div>
      <span v-for="name in drawing.names">
        {{ name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawing-list',
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

<style lang="css">
</style>
