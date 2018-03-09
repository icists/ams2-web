<template>
  <div>
    <base-row>
      <base-header text="Login"/>
      <el-form @submit.native.prevent="login()">
        <table><tr>
          <td>Email:</td>
          <td>
            <el-input v-model="body.email" type="text" placeholder="Email"></el-input>
          </td>
        </tr><tr>
          <td>Password:</td>
          <td>
            <el-input v-model="body.password" type="password" placeholder="Password"></el-input>
          </td>
        </tr><tr>
          <td></td>
          <td><label><el-checkbox v-model="rememberMe" /> Remember Me</label></td>
        </tr><tr>
          <td></td>
          <td>
            <el-button native-type="submit">Login</el-button>
            <el-button @click="$router.push('/register')">Register</el-button>
          </td>
        </tr></table>

        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
      </el-form>

    </base-row>
  </div>

</template>

<script>
  export default {
    name: 'Login',

    data() {
      return {
        colors: this.$store.state.colors,
        body: {
          email: '',
          password: '',
        },
        rememberMe: true,
        fetchUser: false,
        error: false,
      };
    },

    methods: {
      login() {
        this.$auth.login({
          data: this.body,
          rememberMe: this.rememberMe,
          fetchUser: this.fetchUser,
          redirect: { path: '/dashboard' },
        });
      },
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
      BaseButton: () => import('@/components/common/BaseButton'),
    },
  };
</script>
