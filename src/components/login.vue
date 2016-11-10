<template lang="html">
  <div id="login-panel">
    <div class="md-display-3 heading">Login</div>
    <md-whiteframe>
      <form novalidate @keyup.enter="login">
        <md-input-container>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-input-container>

        <md-button class='md-raised md-primary' @click="login">Log In</md-button>
      </form>
    </md-whiteframe>
    <div id='error-message'>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'login-panel',
  props: {
    errorMessage: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      console.log(`username: ${this.username}, password: ${this.password}`)
      this.$emit('login', { username: this.username, password: this.password })
    }
  }
}
</script>

<style lang="scss">
#login-panel {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .md-whiteframe {
    background-color: #fff;
    padding: 16px;
    width: 60%;

    form {
      display: flex;
      align-items: center;
      // centering content is weird between 774px and 587px
      justify-content: center;
      flex-wrap: wrap;

      .md-input-container {
        margin: 8px;
        flex-grow: 0;
        flex-shrink: 1;
        width: 200px;
      }

      // Don't let the button grow
      button {
        height: 36px;
      }
    }
  }

  #error-message {
    color: red;
    margin-top: 16px;
  }

  .heading {
    margin-bottom: 16px;
    margin-top: -16px;
  }
}
</style>
