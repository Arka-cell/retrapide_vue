<template>
  <section id="leaf-view" class="section columns is-mobile">
    <div class="column is-6">
      <h1 class="title is-1">Grille Instagram</h1>
      <div class="leaf-grid">
        <FeuilleSVG
          class="leaf1"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />

        <FeuilleSVG
          class="leaf2"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf3"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf4"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf5"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf6"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf7"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf8"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
        <FeuilleSVG
          class="leaf9"
          :feuille-color="feuilleColor"
          :tige-droite-color="tigeDroiteColor"
          :tige-gauche-color="tigeGaucheColor"
        />
      </div>
    </div>
    <div class="column is-6">
      <h1 class="title is-1">Modification du layout</h1>
      <div class="input">
        <label> Feuille </label>
        <input v-model="feuilleColor" type="color" />
      </div>

      <div class="input">
        <label> Barre Droite</label>
        <input v-model="tigeDroiteColor" type="color" />
      </div>

      <div class="input">
        <label> Barre Gauche </label>
        <input v-model="tigeGaucheColor" type="color" />
      </div>
    </div>
  </section>
</template>

<script>
import FeuilleSVG from "@/components/FeuilleSVG.vue";

export default {
  name: "LeafView",

  components: { FeuilleSVG },

  data() {
    return {
      feuilleColor: "#088A1D",
      tigeGaucheColor: "#8A5004",
      tigeDroiteColor: "#8A5004",
    };
  },
};
</script>

<style lang="scss" scoped>
.leaf-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.leaf-grid > * {
  border: 1px solid black;
}

.leaf4,
.leaf5,
.leaf6 {
  overflow: visible;
  z-index: -2;
}

.leaf7,
.leaf8,
.leaf9 {
  overflow: visible;
  z-index: -3;
}
</style>
