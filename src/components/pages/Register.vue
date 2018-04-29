<template>
  <div>
    <base-row>
      <base-header text="Create an ICISTS account" class="header" />
      <sui-form equalWidth size="large">
        <sui-form-field
          v-bind:class="{ 'error': $v.user.email.$error }" >
          <label>Email address</label>
          <input
            v-model="user.email"
            @input="$v.user.email.$touch()"
            type="email"
            placeholder="applying@icists.org"
          />
          <sui-label class="red pointing above" v-if="$v.user.email.$error">
            Invalid Email
          </sui-label>
        </sui-form-field>
        <sui-form-fields :field="2">
          <sui-form-field :class="{ 'error': $v.user.password1.$error }">
            <label>Password</label>
            <input
              v-model="user.password1"
              @input="$v.user.password1.$touch()"
              type="password"
              placeholder="Longer than 8 characters"
            />
            <sui-label class="red pointing above" v-if="$v.user.password1.$error">
              Too short
            </sui-label>
          </sui-form-field>
          <sui-form-field :class="{ 'error': $v.user.password2.$error }">
            <label>Confirm Password</label>
            <input
              v-model="user.password2"
              @input="$v.user.password2.$touch()"
              type="password"
              placeholder="Type it again"
            />
            <sui-label class="red pointing above" v-if="$v.user.password2.$error">
              Passwords do not match
            </sui-label>
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
          <sui-form-field :class="{ 'error': $v.user.birthday.$error }">
            <label>Birthday</label>
            <input
              v-model="user.birthday"
              @input="$v.user.birthday.$touch()"
              placeholder="YYYY-MM-DD"
            />
            <sui-label class="red pointing above" v-if="$v.user.birthday.$error">
              Invalid Birthday Format (YYYY-MM-DD)
            </sui-label>
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
              :options="countryOptions"
            />
          </sui-form-field>
          <sui-form-field :class="{ 'error': $v.user.phoneNumber.$error }">
            <label>Phone</label>
            <input
              v-model="user.phoneNumber"
              @input="$v.user.phoneNumber.$touch()"
            />
            <sui-label class="red pointing above" v-if="$v.user.phoneNumber.$error">
              Include Country Code (e.g. +82), No Hyphen
            </sui-label>
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
              :options="schoolOptions"
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
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

  function phoneNumberValidation(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true;
    }
    return /^\+[0-9]*$/.test(value);
  }
  
  function birthdayValidation(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true;
    }
    return /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(value);
  }

  export default {
    name: 'Register',

    computed: {
      ...mapGetters({
        user: 'user',
        schools: 'schools',
        countries: 'countries',
      }),
      countryOptions: function () {
        return this.countries.map(({ code, name }) => ({
          flag: code.toLowerCase(),
          value: code,
          text: name,
        }));
      },
      schoolOptions: function () {
        return this.schools.map(({id, name}) => ({
          value: id,
          text: name,
        }));
      },
    },

    data() {
      return {
        policy: {
          genders: [
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' },
            { value: 'O', text: 'Other' },
          ],
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
        password1: {
          required,
          minLength: minLength(8),
        },
        password2: {
          confirmed: sameAs('password1'),
        },
        phoneNumber: {
          required,
          phoneNumberValidation,
          minLength: minLength(10),
        },
        birthday: {
          required,
          birthdayValidation,
          minLength: minLength(10),
        },
      },
    },

    async mounted() {
      this.$store.dispatch('getCountries');
      this.$store.dispatch('getSchools');
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
