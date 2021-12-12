<template>
  <svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      id="demi-tige-gauche"
      x="0"
      y="0"
      width="40"
      height="1080"
      :fill="tigeGaucheColor"
    />
    <rect
      id="demi-tige-droite"
      x="1040"
      y="0"
      width="40"
      height="1080"
      :fill="tigeDroiteColor"
    />

    <path
      id="feuille-centrale"
      d="M932.12-515.23C79.35-23.08,10.74,233.29,91.15,1080c24.39-78.5,454-47,564.59-104.17C926.86,835.57,1011.31,603.2,1014,364.78,1017.53,49.9,973.21-453.22,932.12-515.23Z"
      :fill="feuilleColor"
    />
  </svg>
</template>

<script>
export default {
  name: "FeuilleSVG",

  props: {
    feuilleColor: {
      type: String,
      default: "#088A1D",
    },

    tigeDroiteColor: {
      type: String,
      default: "#8A5004",
    },

    tigeGaucheColor: {
      type: String,
      default: "#8A5004",
    },
  },
};
</script>

<style lang="scss" scoped>
#feuille-centrale {
  filter: drop-shadow(1rem 1rem white);
}
</style>
