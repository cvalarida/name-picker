<template lang="html">
  <!-- We don't really need the ripple or hover... -->
  <md-card md-with-hover v-md-ink-ripple class="drawing-card has-ripple">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ drawing.date.format('MMMM D, YYYY') }}</div>
        <!-- <div class="md-subhead">{{ drawing.names.primary.join(', ') }}</div> -->
      </md-card-header-text>

      <div>{{ drawing.date.fromNow() }}</div>
    </md-card-header>

    <md-card-content>
      <div><strong>Primary:</strong> {{ drawing.names.primary.join(', ') }}</div>
      <div><strong>Alternate:</strong> {{ drawing.names.alternate.join(', ') }}</div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: ['drawing']
}
</script>

<style lang="scss">
.drawing-card {
  width: 50%;
  max-width: 30em;
}

.vertical-connector {
  width: 1px;
  height: 2em;
  border-right: 1px solid #bbb;
  margin-left: auto;
  margin-right: auto;
}
</style>
