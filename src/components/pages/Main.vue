<template>
  <div>
    <div id="background">
      <div>
        <base-row>
          <base-header
            text="Meet People, Get Inspired."
            :color="colors.white"
            :size="3"
          />
          <div class="button-container">
            <base-button link="/" :color="colors.white">
              <span class="button-text">Login</span>
            </base-button>
            <base-button link="/" :color="colors.white">
              <span class="button-text">Create account</span>
            </base-button>
          </div>
        </base-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Main',

    data() {
      return {
        colors: this.$store.state.colors,
      };
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
      BaseButton: () => import('@/components/common/BaseButton'),
    },
  };
</script>

<style>
  #background {
    background-image: url('../../assets/background.jpg');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-text {
    color: black;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
