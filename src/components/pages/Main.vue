<template>
  <div>
    <div id="background">
      <div>
        <base-row v-show="!showLogin" class="slogan-row">
          <base-header
            :chunked_texts="['Meet People,', 'Get Inspired.']"
            :color="colors.white"
            :size="3"
          />
          <div class="button-container">
            <base-button
              link="/"
              :color="colors.white"
              @click.native="onShowLogin()"
            >
              <span class="button-text">Login</span>
            </base-button>
            <base-button link="/register" :color="colors.white">
              <span class="button-text">Create account</span>
            </base-button>
          </div>
        </base-row>
        <base-row v-show="showLogin">
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
            class="column"
            id="login-button"
            link="/dashboard"
            :color="colors.mediumBlue"
            @click.native="login()"
          >
            <span id="login-text">Go!</span>
          </base-button>
        </base-row>
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
      onShowLogin() {
        this.showLogin = true;
      },
      async login() {
        try {
          await this.$auth.login({
            data: this.body,
            rememberMe: false,
            fetchUser: false,
            redirect: { path: '/dashboard' },
          });
        } catch (error) {
          alert('Incorrect email or password.');
        }
      },
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
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

  #login-button {
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
