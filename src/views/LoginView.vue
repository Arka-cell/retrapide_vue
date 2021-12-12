<template>
  <div id="login-view" class="container">
    <LoginSection />
  </div>
</template>

<script>
import LoginSection from "@/components/LoginSection.vue";

export default {
  name: "LoginView",
  components: { LoginSection },
};
</script>
