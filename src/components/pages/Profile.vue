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
              :options="countryOptions"
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
        @click.native="update()"
      >
        Done
      </base-button>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Profile',

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

    async mounted() {
      this.$store.dispatch('getCountries');
      this.$store.dispatch('getSchools');
    },

    methods: {
      async update() {
        alert('Yay! Update!');
        const user = this.user;
        await this.$store.dispatch('updateUser', {
          params: { id: this.user.id },
          data: user
        });
        this.$router.push('/dashboard')

      },
      ...mapActions([
        'createUser', 'updateUser',
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
