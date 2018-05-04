<template>
  <div>
    <base-row>
      <base-header text="Edit Account" class="header" />
      <sui-form equalWidth size="large">
        <sui-form-field>
          <label>Email address</label>
          <input v-model="user.email" type="email" placeholder="applying@icists.org" disabled/>
        </sui-form-field>
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
          <sui-form-field>
            <label>Phone</label>
            <input v-model="user.phoneNumber" />
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
        @click.native="update()"
      >
        Done
      </base-button>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { ModelSelect } from 'vue-search-select';

  export default {
    name: 'Profile',

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
          schools: [],
          countries: [],
        },
        colors: this.$store.state.colors,
        rememberMe: true,
        fetchUser: false,
        error: false,
      };
    },

    async mounted() {
      this.policy.schools = [{ text: this.user.schoolText, value: this.user.school }];
      const response = await this.axios.get('accounts/countries/');
      this.policy.countries = response.data.map(({ code, name }) => ({
        flag: code.toLowerCase(),
        value: code,
        text: name,
      }));
    },

    methods: {
      async update() {
        alert('Yay! Update!');
        const user = this.user;
        await this.$store.dispatch('updateUser', {
          params: { id: this.user.id },
          data: user,
        });
        this.$router.push('/dashboard');
      },
      async updateSchools(query) {
        const response = await this.axios.get(`accounts/schools/?query=${query}`);
        this.policy.schools = response.data.map(({ id, name }) => ({
          value: id,
          text: name,
        }));
      },
      ...mapActions([
        'createUser', 'updateUser',
      ]),
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
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
