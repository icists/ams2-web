<template>
  <div>
    <sui-container text>
      <base-header :text="headerText[this.$route.name]" class="header" />
      <sui-form equalWidth size="large">
        <sui-form-field
          v-bind:class="{ 'error': $v.user.email.$error }" >
          <label>Email address</label>
          <input
            v-model="user.email"
            @input="$v.user.email.$touch()"
            type="email"
            placeholder="applying@icists.org"
            :disabled="persisted"
          />
          <sui-label class="red pointing above" v-if="$v.user.email.$error">
            Invalid Email
          </sui-label>
        </sui-form-field>
        <sui-form-fields :field="2" v-if="!persisted">
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
            <input v-model="user.firstName" placeholder="Kildong" />
          </sui-form-field>
          <sui-form-field>
            <label>Last Name</label>
            <input v-model="user.lastName" placeholder="Hong" />
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
              :options="policy.countries"
            />
          </sui-form-field>
          <sui-form-field :class="{ 'error': $v.user.phoneNumber.$error }">
            <label>Phone</label>
            <input
              v-model="user.phoneNumber"
              @input="$v.user.phoneNumber.$touch()"
              placeholder="+821012345678"
            />
            <sui-label class="red pointing above" v-if="$v.user.phoneNumber.$error">
              Include Country Code (e.g. +82), No Hyphen
            </sui-label>
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>School</label>
            <model-select
              placeholder="Find your school"
              :options="policy.schools"
              v-model="user.school"
              @searchchange="value => updateSchools(value)"
              @select="(school) => { user.school = school.value }"
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
        @click.native="persisted ? update() : register()"
      >
        Done
      </base-button>
    </sui-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ModelSelect } from 'vue-search-select';
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

    computed: mapGetters({
      user: 'user',
    }),

    data() {
      return {
        headerText: {
          Register: 'Create an ICISTS account',
          Profile: 'Edit Account',
        },
        persisted: this.$route.name === 'Profile',
        policy: {
          genders: [
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' },
            { value: 'O', text: 'Other' },
          ],
          schools: [],
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
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
      this.$store.dispatch('getStage');

      this.policy.schools = [{ text: this.user.schoolText, value: this.user.school }];
      const response = await this.axios.get('accounts/countries/');
      this.policy.countries = response.data.map(({ code, name }) => ({
        flag: code.toLowerCase(),
        value: code,
        text: name,
      }));
    },

    methods: {
      ...mapActions([
        'createUser', 'updateUser',
      ]),

      async update() {
        alert('Yay! Update!');
        const user = this.user;
        await this.$store.dispatch('updateUser', {
          params: { id: this.user.id },
          data: user,
        });
        this.$router.push('/dashboard');
      },

      register() {
        const user = this.user;
        this.$auth.register({
          data: user,
          success(res) {
            localStorage.setItem('default_auth_token', res.data.token);
            this.$router.push('/');
          },
          error() {
            alert('Something wrong with your registration form! Please check again.');
          },
          rememberMe: true,
        });
      },
      async updateSchools(query) {
        const response = await this.axios.get(`accounts/schools/?query=${query}`);
        this.policy.schools = response.data.map(({ id, name }) => ({
          value: id,
          text: name,
        }));
      },
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseButton: () => import('@/components/common/BaseButton'),
      ModelSelect,
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
