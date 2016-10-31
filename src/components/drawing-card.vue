<template lang="html">
  <md-card md-with-hover class="drawing-card">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ drawing.date.format('MMMM D, YYYY') }}</div>
        <div class="md-subhead">{{ drawing.names.primary.join(', ') }}</div>
      </md-card-header-text>

      <div>{{ drawing.date.fromNow() }}</div>
    </md-card-header>

    <md-card-content>
      <div><strong>Primary:</strong>   {{ drawing.names.primary.join(', ') }}</div>
      <div><strong>Alternate:</strong> {{ drawing.names.alternate.join(', ') }}</div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: ['drawing']
}
</script>

<style lang="css">
</style>
