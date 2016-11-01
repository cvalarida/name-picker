<template lang="html">
  <md-whiteframe md-elevation="1" id="search-bar">
    <md-icon class='search-icon'>search</md-icon>

    <form id="search-form" @submit.stop.prevent="search">
      <md-input-container md-inline>
        <label>Search</label>
        <md-input v-model="searchString"></md-input>
      </md-input-container>
    </form>

    <md-button id="print-button" class="md-icon-button md-raised" @click="printWindow">
      <md-icon>print</md-icon>
      <md-tooltip md-direction="left" md-delay="400">Print Current List</md-tooltip>
    </md-button>
  </md-whiteframe>
</template>

<script>
export default {
  props: {
    searchParam: String
  },
  methods: {
    printWindow: function () {
      window.print()
    },
    search: function () {
      // console.log('searching in search-bar for ' + this.searchString)
      this.$emit('search', this.searchString)
    }
  },
  data () {
    return {
      searchString: this.searchParam
    }
  }
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

  #search-form {
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
