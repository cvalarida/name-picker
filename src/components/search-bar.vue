<template lang="html">
  <md-whiteframe md-elevation="6" id="search-bar">
    <md-input-container>
      <label>Enter Filter Value</label>
      <md-input v-model="initialValue"></md-input>
    </md-input-container>
  </md-whiteframe>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#search-bar {
  height: 53px;
  width: 100%;
  top: 0px;
  background: #fff;

  // Override <md-input>'s default margins
  margin: -4px 0 -24px;
  padding: 0px 10px 0px 10px;

  // Keep it on the top
  z-index: 10;
}
</style>
