<template>
  <div id="error">
    <h1>404 Page Error</h1>
    <router-link to="/">| Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
#error {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
}
</style>
