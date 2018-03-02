<template>
  <div>
    <base-row>
      <base-column>
        <base-header text="Application" :size="1.8"/>
        <base-header :text="policy.status" :size="1.2"/>
      </base-column>
      <base-column>
        <base-header text="Applicant" :size="1.8"/>
        <base-header :text="user.name" :size="1.2"/>
      </base-column>
    </base-row>

    <base-row>
      <base-column>
        <base-header text="Group" :size="1.8"/>
        <text-input v-model="form.group_name"></text-input>
      </base-column>
      <base-column>
        <base-header text="Topic Preference" :size="1.8"/>
        <select-input v-model="form.topic_preference" :options="topic_preference_options"></select-input>
      </base-column>
    </base-row>

    <base-row>
      <base-column>
        <base-header text="Radio" :size="1.8"/>
        <switch-input v-model="form.need_visa_letters" :active_text="'Need Visa Letters'"></switch-input>
        <switch-input v-model="form.need_financial_aid" :active_text="'Need Financial Aid'"></switch-input>
        <switch-input v-model="form.previously_participated" :active_text="'Previously Participated'"></switch-input>
      </base-column>
    </base-row>
  </div>
</template>

<script>
  export default {
    name: 'ApplicationFormEssay',

    data() {
      return {
        user: this.$store.state.user,
        policy: this.$store.state.policy,
        form: {
          group_name: '',
          topic_preference: 'Option1',
          need_visa_letters: true,
          need_financial_aid: false,
          previously_participated: true,
        },
        topic_preference_options: [{
          value: 'Option1',
          label: 'Option1',
        }, {
          value: 'Option2',
          label: 'Option2',
        }, {
          value: 'Option3',
          label: 'Option3',
        }],
      };
    },

    components: {
      BaseButton: () => import('./common/BaseButton'),
      BaseCardBoard: () => import('./common/BaseCardBoard'),
      BaseHeader: () => import('./common/BaseHeader'),
      BaseRow: () => import('./common/BaseRow'),
      SwitchInput: () => import('./common/SwitchInput'),
      SelectInput: () => import('./common/SelectInput'),
      TextInput: () => import('./common/TextInput'),
    },
  };
</script>

<style scoped>
  p {
    font-size: 1.2rem;
    line-height: 160%;
  }

  .text-holder {
    padding-left: 1rem;
  }

  .emphasis {
    font-weight: bold;
  }

  .el-switch {
    margin-bottom: 1.3rem;
  }
</style>
