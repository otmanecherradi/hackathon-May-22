<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <!-- <img
      alt="Vue logo"
      class="flex"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    /> -->

    <div class="pt-6 px-4">
      <div class="block ml-10 pr-4 space-x-8">
        <RouterLink to="/" class="font-medium text-gray-500 hover:text-gray-900"
          >Home</RouterLink
        >
        <RouterLink
          to="/about"
          class="font-medium text-gray-500 hover:text-gray-900"
          >About</RouterLink
        >
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';
</style>
