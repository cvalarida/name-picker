<template lang="html">
  <md-whiteframe md-elevation="1" id="search-bar">
    <md-icon class='search-icon'>search</md-icon>

    <md-input-container md-inline class="search-input-container">
      <label>Search</label>
      <md-input v-model="search.name"></md-input>
    </md-input-container>

    <md-button id="print-button" class="md-icon-button md-raised">
      <md-icon>print</md-icon>
      <md-tooltip md-direction="left" md-delay="400">Print Current List</md-tooltip>
    </md-button>
  </md-whiteframe>
</template>

<script>
export default {
  props: ['search']
}
</script>

<style lang="scss">
#search-bar {
  display: flex;
  background: #fff;

  flex-shrink: 0;
  width: 100%;
  // Keep it on the top
  z-index: 10;

  padding: 0px 10px 0px 10px;

  .search-icon {
    margin-right: 10px;
  }

  .search-input-container {
    flex-grow: 1;
  }

  #print-button {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    margin-left: 20px;
  }
}
</style>
