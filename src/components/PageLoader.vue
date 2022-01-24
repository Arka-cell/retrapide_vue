<template>
  <div class="page-loader" v-if="!mountedFinished">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
  </div>
</template>

<script>
export default {
    props: {
        mountedFinished: { type: Boolean, required: true },
    },
};
</script>

<style lang="scss" scoped>
$colors: rgba(#8cc271, 0.4), rgba(#69beeb, 0.4), rgba(#f5aa39, 0.4), rgba(#e9643b, 0.4);

.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  z-index: 999;
}

.cube {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;

  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background-color: nth($colors, $i);
    }
  }
  &:first-child {
    animation: left 1s infinite;
  }
  &:last-child {
    animation: right 1s infinite 0.5s;
  }
}
@keyframes left {
  40% {
    transform: translateX(-60px);
  }
  50% {
    transform: translateX(0);
  }
}
@keyframes right {
  40% {
    transform: translateX(60px);
  }
  50% {
    transform: translateX(0);
  }
}
</style>
