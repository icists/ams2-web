<template>
  <div>
    <base-row>
      <base-card-board :color="colors.lightGray">
        <div class="text-holder">
          <base-header :text="user.name"/>
          <p>
            From <span class="emphasis">{{user.country}}</span> <br/>
            Studies <span class="emphasis">{{user.major}}</span> at <span class="emphasis">{{user.school}}</span>
          </p>
        </div>
        <base-button link="/profile" :color="colors.black" outline>Edit Profile</base-button>
      </base-card-board>

      <base-header text="Application" :size="1.8"/>
      <base-card-board :color="colors.green">
        <div class="text-holder">
          <base-header text="Accepted" :color="colors.white"/>
          <p :style="{ color: colors.white }">
            Congratulations! You're accepted to the Early Application. <br/>
            Please proceed to order to confirm your participation.
          </p>
          <base-button link="/order" :color="colors.white" outline>Order</base-button>
          <base-button link="/application" :color="colors.white" outline>Review Application</base-button>
        </div>
      </base-card-board>

      <base-header text="Order" :size="1.8"/>
      <base-card-board :color="colors.lightGray">
        <div class="text-holder">
          <base-header text="Order Now" :color="colors.black"/>
          <p>
            Choose your accommodation option, meal plan, and so on.
          </p>
          <base-button link="/order" :color="colors.black" outline>Proceed</base-button>
        </div>
      </base-card-board>
    </base-row>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',

    data() {
      return {
        colors: this.$store.state.colors,
        user: this.$store.state.user,
      };
    },

    components: {
      BaseButton: () => import('./common/BaseButton'),
      BaseCardBoard: () => import('./common/BaseCardBoard'),
      BaseHeader: () => import('./common/BaseHeader'),
      BaseRow: () => import('./common/BaseRow'),
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
</style>
