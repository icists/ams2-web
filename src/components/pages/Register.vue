<template>
  <div>
    <base-row>
      <base-header text="Create an ICISTS account" class="header" />
      <sui-form equalWidth size="large">
        <sui-form-field
          v-bind:class="{ 'error': $v.user.email.$error }" >
          <label>Email address</label>
          <input v-model="user.email"
                 @input="$v.user.email.$touch()"
                 type="email"
                 placeholder="applying@icists.org" />
          <sui-label class="red pointing above" v-if="$v.user.email.$error"> Invalid Email </sui-label>
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
              placeholder="Select your country"
              search
              selection
              v-model="user.nationality"
              :options="policy.countries"
            />
          </sui-form-field>
          <sui-form-field
            v-bind:class="{ 'error': $v.user.phoneNumber.$error }" >
            <label>Phone</label>
            <input v-model="user.phoneNumber"
                   @input="$v.user.phoneNumber.$touch()"
            />
            <sui-label class="red pointing above" v-if="$v.user.phoneNumber.$error"> Invalid Phone Number (+XX-10-1234-5678) </sui-label>
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>School</label>
            <sui-dropdown
              placeholder="Find your school"
              search
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
        link="#"
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
  import { required, email, minLength } from 'vuelidate/lib/validators';

  function phoneNumberValidation(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true;
    }
    return /^\+[0-9]*-[0-9]*-[0-9]*.*$/.test(value);
  }

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
          countries: [],
        },
        colors: this.$store.state.colors,
        rememberMe: true,
        fetchUser: false,
        error: false,
      };
    },

    validations: {
      user: {
        email: {
          required,
          email,
          minLength: minLength(5),
        },
        phoneNumber: {
          required,
          phoneNumberValidation,
          minLength: minLength(10),
        },
      },
    },

    async mounted() {
      const response = await this.axios.get('accounts/countries/');
      this.policy.countries = response.data.map(({ code, name }) => ({
        flag: code.toLowerCase(),
        value: code,
        text: name,
      }));
    },

    methods: {
      register() {
        const user = this.user;
        this.$auth.register({
          data: user,
          success(res) {
            localStorage.setItem('default_auth_token', res.data.token);
            this.$router.push('/');
          },
          error(error) {
            alert('Something wrong with your registration form! Please check again.');
          },
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
