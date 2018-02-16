<template>
  <div>
    <base-row>
      <base-card-board :color="colors.lightGray">
        <div class="text-holder">
          <base-header :text="name"/>
          <p>
            From <span class="emphasis">{{country}}</span> <br/>
            Studies <span class="emphasis">{{major}}</span> at <span class="emphasis">{{school}}</span>
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
        colors: {
          red: '#CA4F40',
          yellow: '#F4B352',
          green: '#1DB100',
          white: '#FFF',
          lightGray: '#EEE',
          gray: '#BBB',
          black: '#000',
        },
        name: 'Jae-in Moon',
        country: 'South Korea',
        major: 'Politics and Presidency',
        school: 'Blue House',
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
