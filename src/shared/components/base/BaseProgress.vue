<script lang="ts" setup>
interface ProgressProps {
  show: boolean;
  size?: string;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  show: false,
  size: '32px',
});

const progressStyle = computed(() => {
  return {
    width: props?.size,
    height: props?.size,
  };
});
</script>

<template>
  <div v-if="show" class="loader">
    <div class="loading-spinner" :style="{ ...progressStyle }">
      <svg class="loading-spinner__circle-svg" viewBox="25 25 50 50">
        <circle
            class="loading-spinner__circle-stroke"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="2"
            stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  position: relative;
  margin: 0 auto;
}
.loading-spinner:before {
  content: '';
  display: block;
  padding-top: 100%;
}
.loading-spinner__circle-svg {
  animation: loading-spinner-rotate 1.28973s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loading-spinner__circle-stroke {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: loading-spinner-dash 2s ease-in-out infinite,
  loading-spinner-color 8s ease-in-out infinite;
  stroke-linecap: round;
  stroke-width: 4px;
}
@keyframes loading-spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
@keyframes loading-spinner-color {
  100%,
  0% {
    stroke: #045530;
  }
  40% {
    stroke: #30b478;
  }
  66% {
    stroke: #1c0e35;
  }
}
</style>
