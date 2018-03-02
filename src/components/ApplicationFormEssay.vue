<template>
  <div>
    <base-row>
      <base-header text="Essay"></base-header>
    </base-row>

    <base-row>
      <base-header text="Topic Preference" :size="1.0"/>
      <select-input v-model="form.essay_topic" :options="essay_topic_options"></select-input>
    </base-row>

    <base-row>
      <base-header text="Description" :size="1.0"/>
      <p>{{essay_topic_options.find(topic => topic.value == form.essay_topic).description }}</p>
    </base-row>

    <base-row>
      <base-header text="Your Essay" :size="1.0"/>
      <text-input :type="'textarea'" :rows="5" v-model="form.essay_content"></text-input>

    </base-row>
  </div>
</template>

<script>
  export default {
    name: 'ApplicationForm2',

    data() {
      return {
        form: {
          essay_topic: '1',
          essay_content: 'This is my essay.',
        },
        essay_topic_options: [{
          value: '1',
          label: 'Option1: Meditation Science is a bullshit.',
          description: 'Let\'s cut the BS, Dr.SSC.',
        }, {
          value: '2',
          label: 'Option2: Because Park Geun-hye says so.',
          description: 'If you really want something, the universe will step up to help you and you will achieve your dreams.',
        }, {
          value: '3',
          label: 'Option3: Little Paradise',
          description: 'A young woman leaves the city to return to her hometown in the countryside.',
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
