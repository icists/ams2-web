<template>
  <div>
    <base-row>
      <base-header text="Application" :size="1.8"/>
      <base-card-board :color="green">
        <div class="text-holder">
          <base-header text="Accepted" :color="white"/>
          <p :style="{ color: white }">
            Congratulations! You're accepted to the Early Application. <br/>
            Please proceed to order to confirm your participation.
          </p>
          <base-button :color="white" outline>Order</base-button>
        </div>
      </base-card-board>

      <base-header text="Order" :size="1.8"/>
      <base-card-board :color="lightGray">
        <div class="text-holder">
          <base-header text="Order Now" :color="black"/>
          <p>
            Choose your accommodation option, meal plan, and so on.
          </p>
          <base-button :color="black" outline>Proceed</base-button>
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
        red: '#CA4F40',
        yellow: '#F4B352',
        green: '#1DB100',
        white: '#FFF',
        lightGray: '#EEE',
        black: '#000',
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
</style>
