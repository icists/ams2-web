<template>
  <div>
    <base-row>
      <base-header text="Essay"></base-header>
    </base-row>

    <base-row>
      <base-header text="Topic Preference" :size="1.0"/>
      <el-select v-model="application.essay_topic" placeholder="Choose your topic for the essay.">
        <el-option v-for="topic in essayTopics"
                   :key="topic.number"
                   :label="topic.title"
                   :value="topic.number">
        </el-option>
      </el-select>
    </base-row>

    <base-row>
      <base-header text="Description" :size="1.0"/>
      <p>{{ (essayTopics.find((topic) => topic.number === application.essay_topic)|| {}).description }}</p>
    </base-row>

    <base-row>
      <base-header text="Your Essay" :size="1.0"/>
      <el-input type="textarea" autosize :rows="5" v-model="application.essay_text"></el-input>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ApplicationFormEssay',

    computed: mapGetters({
      application: 'application',
      essayTopics: 'essayTopics',
    }),

    components: {
      BaseButton: () => import('@/components/common/BaseButton'),
      BaseCardBoard: () => import('@/components/common/BaseCardBoard'),
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
    },

    methods: {

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
