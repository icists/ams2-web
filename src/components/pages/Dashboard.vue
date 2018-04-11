<template>
  <div v-if="user != null && application != null">
    <base-row>
      <base-card-board :color="colors.lightGray">
        <base-header :text="user.fullName"/>
        <p>
          From <span class="emphasis">{{user.nationality}}</span> <br/>
          Studies <span class="emphasis">{{user.major}}</span> at <span class="emphasis">{{user.school}}</span>
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
        <base-header
          :text="appStatus.title"
          :color="colors.white"
        />
        <p :style="{ color: colors.white }">{{appStatus.text}}</p>
        <div class="buttons">
          <base-button link="/order" :color="colors.white" outline>Order</base-button>
          <base-button link="/applications" :color="colors.white" outline>Review Application</base-button>
        </div>
      </base-card-board>

      <base-header text="Order" :size="1.8"/>
      <base-card-board :color="colors.lightGray">
        <base-header text="Order Now" :color="colors.black"/>
        <p>
          Choose your accommodation option, meal plan, and so on.
        </p>
        <div class="buttons">
          <base-button link="/order" :color="colors.black" outline>Proceed</base-button>
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
      }),
      appStatus: function() {
        return this.appResults[this.application.screeningResult];
      },
      orderStatus: function() {
        return {
          disabled: this.application.screeningResult !== 'A',
        }
      }
    },

    created() {
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
    },

    mounted() {
      console.log(this.application);
    },

    data() {
      const colors = this.$store.state.colors;
      return {
        colors,
        appResults: {
          P: {
            color: colors.yellow,
            title: 'Pending',
            text: 'Please wait for the review process.',
          },
          A: {
            color: colors.green,
            title: 'Accepted',
            text: 'Congratulations! You\'re accepted to the Early Application. Please proceed to order to confirm your participation.',
          },
          R: {
            color: colors.red,
            title: 'Rejected',
            text: 'Unfortunately, blah blah.',
          },
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

  .buttons {
    margin-right: -1rem;
    display: inline-block;
    float: right;
  }

  .emphasis {
    font-weight: bold;
  }
</style>
