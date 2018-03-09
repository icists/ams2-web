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
        <el-input v-model="application.group"></el-input>
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
        <el-switch v-model="application.visa_letter" :active-color="colors.green" active-text="Need Visa Letters" ></el-switch>
        <el-switch v-model="application.financial_aid" :active-color="colors.green" active-text="Need Financial Aid" ></el-switch>
        <el-switch v-model="application.previous_participation" :active-color="colors.green" active-text="Previously Participated" ></el-switch>
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
        colors: this.$store.state.colors,
        policy: this.$store.state.policy,
      };
    },

    components: {
      BaseButton: () => import('@/components/common/BaseButton'),
      BaseCardBoard: () => import('@/components/common/BaseCardBoard'),
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
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
