<template>
  <div>
    <div id="background">
      <div>
        <div class="container slogan-row" v-show="!showLogin">
          <base-header
            :chunks="['Meet People,', 'Get Inspired.']"
            :color="colors.white"
            :size="3"
          />
          <div class="button-container">
            <base-button
              link="/"
              :color="colors.white"
              @click.native="toggleLogin()"
            >
              <span class="button-text">Login</span>
            </base-button>
            <base-button link="/register" :color="colors.white">
              <span class="button-text">Create account</span>
            </base-button>
          </div>
        </div>
        <div class="container" v-show="showLogin">
          <base-header text="Login" :color="colors.white" />
          <input
            class="column"
            id="input-email"
            v-model="body.email"
            placeholder="Email address"
            v-on:keyup.enter="login()"
          />
          <input
            class="column"
            type="password"
            v-model="body.password"
            placeholder="Password"
            v-on:keyup.enter="login()"
          />
          <base-button
            class="column login-button"
            link="/dashboard"
            :color="colors.mediumBlue"
            @click.native="login()"
          >
            <span id="login-text">Go!</span>
          </base-button>
          <br/>
          <base-button
            class="column login-button"
            link="/"
            :color="colors.mediumBlue"
            @click.native="toggleLogin()"
          >
            <span id="back-text">Back to Main</span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Main',

    data() {
      return {
        colors: this.$store.state.colors,
        showLogin: false,
        body: {
          email: '',
          password: '',
        },
      };
    },

    methods: {
      toggleLogin() {
        this.showLogin = !this.showLogin;
      },
      async login() {
        try {
          await this.$auth.login({
            data: this.body,
            redirect: { path: '/dashboard' },
          });
        } catch (error) {
          alert('Incorrect email or password.');
        }
      },
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseButton: () => import('@/components/common/BaseButton'),
    },
  };
</script>

<style>
  #background {
    background-image: url('../../assets/background.jpg');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    max-width: 1000px;
    zoom: 1;
    margin: auto;
  }

  .button-text {
    color: black;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: block;
    border-width: 0;
    padding: 1rem;
    font-size: 1rem;
    min-width: 250px;
    outline: none;
  }

  .login-button {
    text-align: center;
    padding: 1rem !important;
    margin: 0.5rem 0 0 !important;
    min-width: 250px;
  }

  #input-email {
    border-bottom-color: #EEEEEE;
    border-bottom-width: 1px;
  }

  .slogan-row .row.lg {
    padding-left: 0;
    padding-right: 0;
  }
</style>
