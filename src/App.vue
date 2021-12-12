<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    </div>
    <router-view />
  </div>
</template>
