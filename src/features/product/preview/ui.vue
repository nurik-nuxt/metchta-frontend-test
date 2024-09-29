<script setup lang="ts">
interface Props {
  image: string;
  title: string;
  rating: number;
  ratesCount: number;
}

const props = withDefaults(defineProps<Props>(),{})
const rate = computed(() => {
  return props.rating*5/100
})
</script>

<template>
  <div class="product-card-previewer">
    <img :src="image" :alt="title">
    <div class="flex flex-col gap-2">
      <span class="product-card-title">{{ title }}</span>
      <div class="flex items-center gap-1">
        <van-rate
          :model-value="rate"
          count="5"
          :size="12"
          color="#363842"
          void-icon="star"
          void-color="#eee"
          readonly
          allow-half
        />
        <div class="product-card-feedback">
          {{ ratesCount }} отзывов
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.product {
  &-card {
    &-previewer {
      @apply flex flex-col gap-2;
    }
    &-title {
      @apply font-medium text-sm text-dark-text;
      @media (max-width: 640px) {
        @apply text-xs
      }
    }
    &-feedback {
      @apply font-medium text-sm text-[#5C5C5C];
      @media (max-width: 640px) {
        @apply text-[11px]
      }
    }
  }
}
</style>
