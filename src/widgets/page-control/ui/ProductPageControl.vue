<script setup lang="ts">
import {thousandSeparator} from "../../../shared/utils/helpers";
import BaseButton from "~/src/shared/components/base/BaseButton.vue";

console.log('Product Page Control')
interface Props {
  price: number;
  discount: number;
}

const props = withDefaults(defineProps<Props>(),{})
</script>

<template>
  <div class="wrapper">
    <div class="flex gap-2 items-baseline">
      <div class="price">{{ thousandSeparator(Math.round(price * discount / 100)) }} ₸</div>
      <div class="discount">{{ thousandSeparator(Math.round(price)) }} ₸</div>
    </div>
    <div class="wrapper-control">
      <BaseButton class="w-full">Купить</BaseButton>
      <BaseButton color="primarylight" icon-name="like-empty" />
    </div>
  </div>
</template>

<style scoped lang="pcss">
.wrapper {
  box-shadow: 0 4px 50px 0 #2667FF26;
  @apply p-4 rounded-2xl flex flex-col gap-6;

  @media (max-width: 640px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: white;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  }
}

.price {
  @apply text-[28px] font-bold;

  @media (max-width: 640px) {
    @apply text-[20px];
  }
}

.discount {
  @apply line-through text-lg font-normal;

  @media (max-width: 640px) {
    @apply text-[14px];
  }
}

.wrapper-control {
  @apply flex gap-4;

  @media (max-width: 640px) {
    @apply gap-2;
  }
}

</style>
