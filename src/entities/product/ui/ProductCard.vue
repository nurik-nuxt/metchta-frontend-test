<script setup lang="ts">
import { Product } from "~/src/entities/product";
import { ProductPreview } from "~/src/features/product/preview";
import { thousandSeparator } from "~/src/shared/utils/helpers";
import BaseButton from "~/src/shared/components/base/BaseButton.vue";

interface Props {
  product: Product
}

const props = withDefaults(defineProps<Props>(), {
})
</script>

<template>
  <div class="product-card py-6 px-5 cursor-pointer">
    <NuxtLink :to="`/product/${props.product.id}`" class="product-card-wrapper">
      <ProductPreview
        :title="props.product.title"
        :image="props.product.image"
        :rating="props.product.rating"
        :rates-count="props.product.ratesCount"
      />
      <div class="product-card-footer">
        <div class="product-card-detail">
                <div class="flex gap-2 items-center">
                    <div class="product-card-sale-price">{{ thousandSeparator(Math.round(props.product.price)) }} ₸</div>
                    <div class="product-card-sale-discount">-{{ props.product.discount }} %</div>
                </div>
                <div class="product-card-price">{{ thousandSeparator(Math.round(props.product.price * props.product.discount/100)) }} ₸</div>
            </div>
        <div class="add-btn">
          <base-button
              icon-name="cart-empty"
              class="w-full"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>


<style lang="pcss" scoped>
.product-card {
  min-width: 140px;
  border: 1px solid #E7E7E7;
  border-radius: 16px;
  @apply py-6 px-5;
  @apply overflow-hidden relative flex flex-col gap-1;
    &-wrapper {
      @apply flex flex-col gap-8;
      @media (max-width: 640px) {
        @apply gap-5;
      }
    }
    &-sale {
        &-price {
          text-decoration: line-through;
          @apply text-base text-[#979797];
          @media (max-width: 640px) {
            @apply text-sm;
          }
        }
        &-discount {
            padding: 2px 8px 2px 8px;
            gap: 10px;
            border-radius: 50px;
            font-size: 12px;
            background: #F63B00;
            color: #FFFFFF;
        }
    }
    &-price {
      @apply font-bold;
      @media (max-width: 640px) {
        @apply text-sm;
      }
    }
    &-detail {
      @apply flex flex-col gap-3;
    }
    &-footer {
      @apply flex justify-between items-end;
      @media (max-width: 640px) {
        @apply flex-col items-baseline gap-3;
      }
    }
}

@media (max-width: 640px) {
  .product-card {
    padding: 8px;
  }
}
.add-btn {
  @media (max-width: 640px) {
    @apply w-full;
  }
}
</style>
