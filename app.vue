<script setup lang="ts">
import NuxtLoadingIndicator from '~/src/app/lib/nuxt-loading-indicator';

</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :duration="5000" :color="'#2667FF'" />
    <NuxtPage />
  </NuxtLayout>
</template>
