<template>
  <div>
    <base-row>
      <base-column>
        <base-header text="Application" :size="1.8"/>
        <base-header :text="policy.status" :size="1.2"/>
      </base-column>
      <base-column>
        <base-header text="Applicant" :size="1.8"/>
        <base-header :text="user.full_name" :size="1.2"/>
      </base-column>
    </base-row>

    <base-row>
      <base-column>
        <base-header text="Group" :size="1.8"/>
        <text-input v-model="application.group"></text-input>
      </base-column>
      <base-column>
        <base-header text="Topic Preference" :size="1.8"/>
        <el-select v-model="application.topic_preference">
          <el-option v-for="topic in projectTopics"
                     :key="topic.number"
                     :label="topic.title"
                     :value="topic.number">
          </el-option>
        </el-select>
      </base-column>
    </base-row>

    <base-row>
      <base-column>
        <base-header text="Radio" :size="1.8"/>
        <switch-input v-model="application.visa_letter" :active_text="'Need Visa Letters'"></switch-input>
        <switch-input v-model="application.financial_aid" :active_text="'Need Financial Aid'"></switch-input>
        <switch-input v-model="application.previous_participation" :active_text="'Previously Participated'"></switch-input>
      </base-column>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ApplicationFormBasic',

    computed: mapGetters({
      user: 'user',
      application: 'application',
      projectTopics: 'projectTopics',
    }),

    data() {
      return {
        policy: this.$store.state.policy,
      };
    },

    components: {
      BaseButton: () => import('@/components/common/BaseButton'),
      BaseCardBoard: () => import('@/components/common/BaseCardBoard'),
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
      SwitchInput: () => import('@/components/common/SwitchInput'),
      SelectInput: () => import('@/components/common/SelectInput'),
      TextInput: () => import('@/components/common/TextInput'),
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
