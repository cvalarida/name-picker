<template lang="html">
  <!-- We don't really need the ripple or hover... -->
  <md-card md-with-hover v-md-ink-ripple class="drawing-card has-ripple">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ date.format('MMMM D, YYYY') }}</div>
      </md-card-header-text>

      <div class="time-ago">{{ date.fromNow() }}</div>
    </md-card-header>

    <md-card-content>
      <div><strong>Primary:</strong> {{ drawing.names.primary.join(', ') }}</div>
      <div><strong>Alternate:</strong> {{ drawing.names.alternate.join(', ') }}</div>
    </md-card-content>
  </md-card>
</template>

<script>
import moment from 'moment'

export default {
  props: ['drawing'],
  computed: {
    'date': function () {
      return moment.unix(this.drawing.date)
    }
  }
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

@media print {
  .vertical-connector { display: none }

  .drawing-card {
    width: 22em;
    // position: relative;

    // Reformat it without flex so we can avoid page breaks
    display: inline-block;
    -webkit-region-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    &.md-card { box-shadow: none }


    .md-card-header .time-ago { display: none }
  }
}
</style>
