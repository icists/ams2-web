<template>
  <div>
    <base-row>
      <base-header text="Create an ICISTS account" class="header" />
      <sui-form equalWidth size="large">
        <sui-form-field>
          <label>Email address</label>
          <input v-model="user.email" type="email" placeholder="applying@icists.org" />
        </sui-form-field>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Password</label>
            <input
              v-model="user.password1"
              type="password"
              placeholder="Longer than 8 characters"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Confirm Password</label>
            <input
              v-model="user.password2"
              type="password"
              placeholder="Type it again"
            />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>First Name</label>
            <input v-model="user.firstName" placeholder="Harry" />
          </sui-form-field>
          <sui-form-field>
            <label>Last Name</label>
            <input v-model="user.lastName" placeholder="Potter" />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Gender</label>
            <sui-dropdown
              selection
              v-model="user.gender"
              :options="policy.genders"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Birthday</label>
            <input v-model="user.birthday" placeholder="YYYY-MM-DD" />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Nationality</label>
            <sui-dropdown
              placeholder="Select a country"
              selection
              v-model="user.nationality"
              :options="policy.countries"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Phone</label>
            <input v-model="user.phoneNumber" />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>School</label>
            <sui-dropdown
              placeholder="Find your school"
              selection
              v-model="user.school"
              :options="policy.schools"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Major</label>
            <input v-model="user.major" placeholder="Broomstick Engineering" />
          </sui-form-field>
        </sui-form-fields>
      </sui-form>
      <base-button
        id="save-button"
        link="/dashboard"
        :color="colors.icistsBlue"
        @click.native="register()"
      >
        Done
      </base-button>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Register',

    computed: mapGetters({
      user: 'user',
    }),

    data() {
      return {
        policy: {
          genders: [
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' },
            { value: 'O', text: 'Other' },
          ],
          schools: [
            { value: 1, text: 'KAIST' },
          ],
          countries: [
            { value: 'KR', text: 'Republic of Korea' },
          ],
        },
        colors: this.$store.state.colors,
        rememberMe: true,
        fetchUser: false,
        error: false,
      };
    },

    methods: {
      register() {
        const user = this.user;
        user.phoneNumber = '+' + user.phoneNumber
        this.$auth.register({
          data: user,
          success(res) {
            localStorage.setItem('default_auth_token', res.data.token);
            this.$router.push('/');
          },
          error() {},
          rememberMe: true,
        });
      },
      ...mapActions([
        'createUser',
      ]),
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
      BaseButton: () => import('@/components/common/BaseButton'),
    },
  };
</script>

<style scoped>
  label {
    margin-bottom: 1rem !important;
  }

  .header {
    margin-bottom: 2rem;
  }

  #save-button {
    margin-top: 4rem;
    float: right;
  }
</style>
