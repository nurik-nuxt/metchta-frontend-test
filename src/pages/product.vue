<script setup lang="ts">
import { useBreadcrumbs } from "~/src/widgets/breadcrumbs/model/hooks";
import { useProductApiService } from "~/src/shared/repository/modules";
import { useProductStore } from "~/src/shared/store/product";

import ProductPageControl from "~/src/widgets/page-control/ui/ProductPageControl.vue";
import BaseProgress from "~/src/shared/components/base/BaseProgress.vue";

const route = useRoute();
const { isDesktop } = useDevice();


const { getProductById } = useProductApiService();
const { addBreadcrumb, removeBreadcrumb } = useBreadcrumbs();

const productStore = useProductStore()

const loading = ref<boolean>(false);

const product = computed(() => {
  return productStore.currentProduct
});
const rate = computed(() => {
  if (product.value) {
    return product?.value?.rating * 5 / 100;
  }
});

onMounted(async () => {
  const productId = parseInt(<string>route?.params?.id);
  loading.value = true;

  try {
    const res = await getProductById(productId);
    productStore.setCurrentProduct(res);

    if (res?.id) {
      addBreadcrumb({ name: res.title, id: productId });
      document.title = res.title
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }

  const res = await getProductById(productId);
  productStore.setCurrentProduct(res);

  if (res?.id) {
    addBreadcrumb({ name: res.title, id: productId });
  }
});

onUnmounted(() => {
  const productId = parseInt(<string>route?.params?.id);
  removeBreadcrumb(productId);
});
</script>

<template>
  <base-progress v-if="loading" show />
  <div v-else class="product-wrapper">
    <div v-if="isDesktop" class="flex flex-col">
      <div class="product-title">{{ product?.title }}</div>
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
        <div class="product-feedback">
          {{ product?.ratesCount }} отзывов
        </div>
      </div>
    </div>
    <div class="product-main-block">
      <div class="product-media">
        <div class="product-image-container">
          <div class="product-image">
            <img :src="product?.image" :alt="product?.title" />
          </div>
        </div>
        <div v-if="!isDesktop" class="flex flex-col">
          <div class="product-title">{{ product?.title }}</div>
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
            <div class="product-feedback">
              {{ product?.ratesCount }} отзывов
            </div>
          </div>
        </div>
      </div>
      <div class="product-content">
        <div class="product-characteristics">
          <div class="product-description">{{ product?.description }}</div>
          <div class="product-info">
            <h2 class="product-info-title">О товаре</h2>
            <ul class="product-info-list">
              <li class="product-info-list-item">
                <span class="label">Страна-изготовитель</span>
                <span class="value">{{ product?.countryManufacturer }}</span>
              </li>
              <li class="product-info-list-item">
                <span class="label">Материал оправы</span>
                <span class="value">{{ product?.material }}</span>
              </li>
              <li class="product-info-list-item">
                <span class="label">Материал линзы</span>
                <span class="value">{{ product?.lenseMaterial }}</span>
              </li>
              <li class="product-info-list-item">
                <span class="label">Ширина линзы, мм</span>
                <span class="value">{{ product?.lenseWidth }}</span>
              </li>
              <li class="product-info-list-item">
                <span class="label">Разъем</span>
                <span class="value">{{ product?.connector }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="product-control">
          <ProductPageControl
              :price="product?.price"
              :discount="product?.discount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="pcss">
.product {
  &-wrapper {
    @apply px-4 flex flex-col gap-5;
    @media (max-width: 640px) {
      margin-bottom: 150px;
    }
  }
  &-media {
    @apply flex flex-col gap-5;
  }
  &-title {
    @apply font-medium text-[32px];
    @media (max-width: 640px) {
      @apply text-xl;
    }
  }
  &-feedback {
    @apply font-medium text-sm text-[#5C5C5C];
    @media (max-width: 640px) {
      @apply text-[11px]
    }
  }
  &-main {
    &-block {
      @apply flex gap-6;
      @media (max-width: 640px) {
        @apply flex-col;
      }
    }
  }
  &-image {
    border-radius: 18px;
    background-color: white;
    padding: 20px;
    &-container {
      @apply flex justify-center items-center bg-[#FFFFFF] h-full;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 636px;
      height: 100%;
    }
  }

  &-content {
    max-width: 526px;
    @apply flex flex-col gap-6;
  }
  &-characteristics {
    @apply flex flex-col gap-8;
  }
  &-description {
    @apply font-normal text-base;
    @media (max-width: 640px) {
      @apply text-sm;
    }
  }
  &-info {

    &-title {
      @apply text-lg font-semibold mb-2;
      @media (max-width: 640px) {
        @apply text-sm;
      }
    }

    &-list {
      @apply text-sm m-0;
      &-item {
        @apply py-3 flex;
        border-bottom: 1px solid #E7E7E7
      }
      .label {
        @apply text-base font-normal;
        flex: 1;
        @media (max-width: 640px) {
          @apply text-sm;
        }
      }
      .value {
        @apply font-semibold text-left text-base;
        flex: 1;
        @media (max-width: 640px) {
          @apply text-sm;
        }
      }
    }
  }
}
</style>
