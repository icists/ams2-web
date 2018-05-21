<template>
  <div>
    <sui-container text>
      <sui-form equalWidth size="large">
        <base-header text="Application" class="header" />
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Stage</label>
            <input :value="appStage" disabled />
          </sui-form-field>
          <sui-form-field>
            <label>Applicant</label>
            <input :value="user.fullName" disabled />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Group</label>
            <input v-model="application.group" />
          </sui-form-field>
          <sui-form-field>
            <label>Topic Preference</label>
            <sui-dropdown
              placeholder="Select a topic"
              selection
              v-model="application.topicPreference"
              :options="projectTopicOptions"
            />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-field>
          <label>Additional Questions</label>
          <sui-form-field>
            <sui-checkbox
              toggle
              v-model="application.visaLetter"
              label="Do you need a visa supporting letter to enter South Korea?"
            />
          </sui-form-field>
          <sui-form-field>
            <sui-checkbox
              toggle
              v-model="application.financialAid"
              label="Are you applying for a financial aid?"
            />
          </sui-form-field>
          <sui-form-field>
            <sui-checkbox
              toggle
              v-model="application.previousParticipation"
              label="Have you participated in ICISTS before?"
            />
          </sui-form-field>
        </sui-form-field>
        <div style="height: 60px" />
        <base-header text="Essay" class="header" />
        <sui-form-field>
          <label>Essay Topic</label>
          <sui-dropdown
            placeholder="Select a topic"
            selection
            v-model="application.essayTopic"
            :options="essayTopicOptions"
          />
        </sui-form-field>
        <sui-form-field>
          <label>Description</label>
          <p>{{essayTopicDescription}}</p>
        </sui-form-field>
        <sui-form-field style="margin-top: 2rem">
          <label>Your Essay</label>
          <textarea
            placeholder="Write your inspiring essay here."
            rows="5"
            v-model="application.essayText"
          />
        </sui-form-field>
      </sui-form>
      <base-button
        id="save-button"
        link="/dashboard"
        :color="colors.icistsBlue"
        @click.native="onComplete()"
      >
        Save
      </base-button>
    </sui-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ApplicationFormWizard',

    computed: {
      ...mapGetters({
        user: 'user',
        application: 'application',
        stage: 'stage',
        projectTopics: 'projectTopics',
        essayTopics: 'essayTopics',
      }),
      projectTopicOptions() {
        return this.projectTopics.map(({ number, title }) => ({
          value: number,
          text: title,
        }));
      },
      essayTopicOptions() {
        return this.essayTopics.map(({ number, title }) => ({
          value: number,
          text: title,
        }));
      },
      essayTopicDescription() {
        const selectedTopicNumber = this.application.essayTopic;
        const selectedTopic = this.essayTopics.find(topic => topic.number === selectedTopicNumber);
        return selectedTopic ? selectedTopic.description : 'Select a topic first.';
      },
      appStage() {
        const stage = (this.application && this.application.stage) || this.stage;
        return this.stageMap[stage];
      },
    },

    created() {
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
      this.$store.dispatch('getStage');
      this.$store.dispatch('getAllEssayTopics');
      this.$store.dispatch('getAllProjectTopics');
    },

    data() {
      return {
        colors: this.$store.state.colors,
        stageMap: {
          E: 'Early',
          R: 'Regular',
          L: 'Late',
        },
      };
    },

    methods: {
      async onComplete() {
        alert('Yay. Done!');
        if (this.application.id) {
          await this.$store.dispatch('updateApplication', {
            params: { id: this.application.id },
            data: this.application,
          });
          this.$router.push('/dashboard');
        } else {
          await this.$store.dispatch('createApplication', {
            data: {
              ...this.application,
              stage: this.application.stage || this.stage,
            },
          });
          this.$router.push('/dashboard');
        }
      },
      ...mapActions([
        'createApplication',
        'updateApplication',
      ]),
    },

    components: {
      BaseButton: () => import('@/components/common/BaseButton'),
      BaseHeader: () => import('@/components/common/BaseHeader'),
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

  .autofill {
    font-size: 1.4rem;
    font-weight: normal;
  }

  #save-button {
    margin-top: 4rem;
    float: right;
  }
</style>
