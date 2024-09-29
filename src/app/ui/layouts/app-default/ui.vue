<script setup lang="ts">
import LazyTopBar from '~/src/widgets/top-bar/ui.vue';
import BreadCrumbs from "~/src/widgets/breadcrumbs/ui/index.vue";
</script>

<template>
  <LazyTopBar />
  <main id="app-layout" ref="appLayoutRef" class="mt-[24px] md:mt-4">
    <div class="container-t">
      <BreadCrumbs />
      <slot/>
    </div>
  </main>
</template>
