<template>
  <div v-if="user != null && application != null">
    <base-row>
      <base-card-board :color="colors.lightGray">
        <base-header :text="user.fullName"/>
        <p>
          From <span class="emphasis">{{user.nationalityText}}</span> <br/>
          Studies <span class="emphasis">{{user.major}}</span> at <span class="emphasis">{{user.schoolText}}</span>
        </p>
        <div class="buttons">
          <base-button
            link="/profile"
            :color="colors.black"
            outline
          >
            Edit Profile
          </base-button>
        </div>
      </base-card-board>

      <base-header text="Application" :size="1.8"/>
      <base-card-board :color="appStatus.color">
        <base-header :text="appStatus.title" :color="appStatus.textColor"/>
        <p class="instruction" :style="{ color: appStatus.textColor }">{{appStatus.text}}</p>
        <div class="buttons" v-if="appStatus.buttons.length > 0">
          <base-button
            v-for="button of appStatus.buttons"
            :key="button.text"
            :link="button.link"
            :color="appStatus.textColor"
            outline
          >
            {{button.text}}
          </base-button>
        </div>
      </base-card-board>

      <base-header text="Order" :size="1.8"/>
      <base-card-board :color="orderStatus.color">
        <base-header :text="orderStatus.title" :color="orderStatus.textColor"/>
        <p class="instruction" :style="{ color: orderStatus.textColor }">{{orderStatus.text}}</p>
        <div class="buttons" v-if="orderStatus.buttons.length > 0">
          <base-button
            v-for="button of orderStatus.buttons"
            :key="button.text"
            :link="button.link"
            :color="orderStatus.textColor"
            outline
          >
            {{button.text}}
          </base-button>
        </div>
      </base-card-board>
    </base-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Dashboard',

    computed: {
      ...mapGetters({
        user: 'user',
        application: 'application',
        stage: 'stage',
      }),
      appStatus: function() {
        const isClosed = ['E', 'R', 'L'].indexOf(this.stage) < 0;
        const result = this.application.screeningResult || (isClosed ? 'C' : 'N');
        return this.appResults[result];
      },
      orderStatus: function() {
        const result = this.application.screeningResult === 'A' ? 'ON' : 'NA';
        return this.orderResults[result];
      },
    },

    created() {
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
      this.$store.dispatch('getStage');
    },

    data() {
      const colors = this.$store.state.colors;
      return {
        colors,
        appResults: {
          C: {
            color: colors.lightGray,
            textColor: colors.gray,
            title: 'Closed',
            text: 'Application is currently closed.\nPlease come back in a few days.',
            buttons: [],
          },
          N: {
            color: colors.lightGray,
            textColor: colors.black,
            title: 'Apply Now',
            text: 'You can apply now for ICISTS 2018.\nGrab the chance to meet people and get inspired.',
            buttons: [
              { link: '/applications', text: 'Apply' },
            ],
          },
          P: {
            color: colors.yellow,
            textColor: colors.white,
            title: 'Waiting for Review',
            text: 'Your application is waiting for organizing committee’s review.\nYou can revise it anytime before May 30th.',
            buttons: [
              { link: '/applications', text: 'Review Application' },
            ],
          },
          A: {
            color: colors.green,
            textColor: colors.white,
            title: 'Accepted',
            text: 'Congratulations! You\'re accepted to the Early Application.\nPlease proceed to order to confirm your participation.',
            buttons: [
              { link: '/order', text: 'Order' },
              { link: '/applications', text: 'Review Application' },
            ],
          },
          R: {
            color: colors.red,
            textColor: colors.white,
            title: 'Rejected',
            text: 'Unfortunately, your application is not eligible to ICISTS 2018. But you can still edit and submit again.',
            buttons: [
              { link: '/applications', text: 'Review Application' },
            ],
          },
        },
        orderResults: {
          NA: {
            color: colors.lightGray,
            textColor: colors.gray,
            title: 'Not Available',
            text: 'You can place your order after your application is accepted.',
            buttons: [],
          },
          ON: {
            color: colors.lightGray,
            textColor: colors.black,
            title: 'Order Now',
            text: 'Choose your options for the conference.',
            buttons: [
              { link: '/order', text: 'Proceed' },
            ]
          }
        },
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
    font-size: 1.3rem;
    line-height: 160%;
    margin: 1rem 0 0.5rem;
    letter-spacing: -0.2px;
  }

  .instruction {
    white-space: pre-line;
  }

  .buttons {
    margin-right: -1rem;
    margin-top: 1rem;
    float: right;
  }

  .emphasis {
    font-weight: bold;
  }
</style>
