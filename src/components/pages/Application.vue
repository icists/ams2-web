<template>
    <form-wizard @on-complete="onComplete"
                 :color="colors.icistsBlue"
                 :error-color="colors.errorRed"
                 >
      <h2 slot="title">{{title}}</h2>
      <input type="hidden" v-model="application.id"/>
      <tab-content title="Basic Infos"
                   icon="ti-user">
        <application-form-basic></application-form-basic>
      </tab-content>
      <tab-content title="Essay"
                   icon="icon-letter">
        <application-form-essay></application-form-essay>
      </tab-content>
    </form-wizard>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ApplicationFormWizard',

    computed: mapGetters({
      application: 'application',
    }),


    created() {
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
      this.$store.dispatch('getAllEssayTopics');
      this.$store.dispatch('getAllProjectTopics');
    },

    data() {
      return {
        title: 'New Application',
        colors: this.$store.state.colors,
      };
    },

    methods: {
      onComplete() {
        alert('Yay. Done!');
        if (this.application.id !== undefined) {
          this.$store.dispatch('updateApplication', { params: { id: this.application.id }, data: this.application })
            .then(() => {
              this.$router.push('/');
            });
        } else {
          this.$store.dispatch('createApplication', { data: this.application })
            .then(() => {
              this.$router.push('/');
            });
        }
      },
      ...mapActions([
        'createApplication',
        'updateApplication',
      ]),
    },

    components: {
      ApplicationFormBasic: () => import('./ApplicationFormBasic'),
      ApplicationFormEssay: () => import('./ApplicationFormEssay'),
    },
  };
</script>
