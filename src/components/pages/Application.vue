<template>
    <form-wizard @on-complete="onComplete"
                 :color="colors.icistsBlue"
                 :error-color="colors.errorRed"
                 >
      <h2 slot="title">{{title}}</h2>
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
  export default {
    name: 'ApplicationFormWizard',

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
      },
    },
    components: {
      ApplicationFormBasic: () => import('./ApplicationFormBasic'),
      ApplicationFormEssay: () => import('./ApplicationFormEssay'),
    },
  };
</script>
