<template lang="html">
  <md-whiteframe md-elevation="1" id="search-bar">
    <md-icon class='search-icon'>search</md-icon>

    <form id="search-form" @submit.stop.prevent="search">
      <md-input-container md-inline  id='search-input'>
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
  },
  watch: {
    // Probably there's a better way to do this, but using searchParam directly
    //  issues a warning to not modify props, and when I don't watch it and
    //  update searchString, when the searchParam prop changes, searchString
    //  doesn't. This is presumably because data() is only called upon creation
    //  of the element, which makes enough sense. Still, it's a pain for me. >_>
    searchParam: function (val) {
      this.searchString = val
      // Update the input so it actually looks like it has a value (if necessary)
      if (val !== '') {
        document.getElementById('search-input').classList.add('md-has-value')
      } else {
        document.getElementById('search-input').classList.remove('md-has-value')
      }
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
  // Line it up with the tabs on its left
  margin-top: -5px;

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

@media print {
  #search-bar { display: none }
}
</style>
