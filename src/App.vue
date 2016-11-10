<template>
  <div id="app" v-md-theme="'default'">
    <name-pane
      v-if="loggedIn"
      :people="people"
      @addNames="addNames"
      @removeName="removeName"
      @search="fetchDrawings"
    ></name-pane>
    <drawing-pane
      v-if="loggedIn"
      :history="history"
      :searchString="searchString"
      @search="fetchDrawings"
      @drawNames="drawNames"
    ></drawing-pane>

    <login-panel
      v-if="!loggedIn"
      :errorMessage="loginErrorMessage"
      @login="login"
    ></login-panel>
  </div>
</template>

<script>
import axios from 'axios'
import NamePane from './components/name-pane'
import DrawingPane from './components/drawing-pane'
import LoginPanel from './components/login'

// TODO: Make errors visible to the user

export default {
  name: 'app',
  components: {
    NamePane,
    DrawingPane,
    LoginPanel
  },
  methods: {
    callApi: function (method, url, options) {
      return new Promise((resolve, reject) => {
        if (!window.localStorage.token) {
          // Just in case...
          this.loggedIn = false
          this.loginErrorMessage = 'Looks like you\'ve been logged out'
          return reject({ jwt: 'No token' })
        }

        axios({
          method,
          url,
          ...options,
          headers: { 'Authorization': `Bearer ${window.localStorage.token}` }
        }).then((res) => resolve(res))
          .catch((err) => {
            // If it's a jwt error, log out
            // TODO: Check if it's a jwt error
            this.loggedIn = false
            window.localStorage.removeItem('token')
            // console.error(err)
            reject(err)
          })
      })
    },

    login: function (loginObject) {
      const { username, password } = loginObject
      axios.post('/token', { username, password })
        .then((res) => {
          window.localStorage.token = res.data.jwt
          this.loggedIn = true
          this.fetchNames()
          this.fetchDrawings()
        })
        .catch((err) => {
          console.error(err)
          this.loginErrorMessage = 'Invalid username or password.'
        })
    },

    fetchNames: function () {
      this.callApi('get', '/names')
        .then((res) => { this.people = res.data })
        .catch((err) => { console.error(err) })
    },

    /**
     * For both addNames and removeName, we could return the list of names after
     *  the action, but for development ease for now, we'll just call fetchNames
     */
    addNames: function (names) {
      names = names.split(/\r?\n/)
      this.callApi('post', '/names', { data: names })
        .then((res) => this.fetchNames())
        .catch((err) => { console.error(err) })
    },

    removeName: function (id) {
      this.callApi('delete', `/name?id=${id}`)
        .then((res) => this.fetchNames())
        .catch((err) => { console.error(err) })
    },

    /**
     * Searches through the history for the name given
     *
     * Later, it would be cool to search in only primary or alternate if
     *  specified like: primary:Bobo the Clown
     *
     * This'll change pretty radically, I imagine, when we get NeDB up
     *
     * @param Object searchObject  {
     *     searchString: String,
     *     startDate: Moment instance,
     *     endDate: Moment instance
     *   }
     */
    fetchDrawings: function (searchObject) {
      if (!searchObject) {
        searchObject = {}
      }
      const { searchString, startDate, endDate } = searchObject

      let params = {}
      if (searchString) {
        params.name = searchString
      }
      if (startDate) {
        params.startDate = startDate.unix()
      }
      if (endDate) {
        params.endDate = endDate.unix()
      }

      this.callApi('get', '/drawings', { params })
        .then((res) => { this.history = res.data })
        .catch((err) => { console.error(err) })
    },

    drawNames: function (newDrawingObject) {
      // Make the date a unix timestamp
      newDrawingObject.date = newDrawingObject.date.unix()

      // Send the request to draw the names
      this.callApi('post', '/drawings', { data: newDrawingObject })
        // Reload the list of drawings
        // There's a better way to do this to reduce network traffic, but...
        .then((res) => this.fetchDrawings())
        .catch((err) => { console.error(err) })
    }
  },
  data () {
    return {
      people: [],
      history: [],
      searchString: null,
      // True if we've got a token
      loggedIn: !!window.localStorage.token,
      loginErrorMessage: ''
    }
  },
  beforeMount: function () {
    if (window.localStorage.token) {
      console.log('beforeMount: have token')
      // Get the names
      this.fetchNames()

      // And the drawings
      this.fetchDrawings({ searchString: '' })
    }
  }
}
</script>

<style lang='scss'>
html {
  background: #efefef;
}

#app {
  display: flex;
  height: 100vh;

  // Make the drawing list wider than the name list
  #name-pane {
    flex: 2;
  }

  #drawing-pane {
    flex: 5;
  }
}
</style>
