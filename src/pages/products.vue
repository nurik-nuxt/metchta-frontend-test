<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ProductFilter } from '~/src/widgets/product-filter';
import ProductCard from '~/src/entities/product/ui/ProductCard.vue';
import { BaseProgress } from "~/src/shared/components/base";
import { useProductApiService } from '~/src/shared/repository/modules';
import { useProductStore } from "~/src/shared/store/product";

const { getAllProducts } = useProductApiService();
const productStore = useProductStore();

const route = useRoute();
const router = useRouter();

const filters = reactive<{ orderBy: string; order: 'asc' | 'desc' }>({
  orderBy: route.query.orderBy?.toString() || 'rating',
  order: route.query.order === 'asc' || route.query.order === 'desc' ? route.query.order : 'desc',
});

const loading = ref<boolean>(false);
const limit = 12;

const fetchProducts = (isLoadMore = false) => {
  if (loading.value || !productStore.hasMoreProducts) return;

  loading.value = true;
  getAllProducts({ ...filters, page: productStore.page, limit })
      .then((res) => {
        if (res.length < limit) {
          productStore.hasMoreProducts = false;
        }

        if (isLoadMore) {
          productStore.addProducts(res);
        } else {
          productStore.setProducts(res);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loading.value = false;
      });
};

onMounted(() => {
  fetchProducts();
});

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const threshold = document.body.offsetHeight - 300;

  if (scrollPosition >= threshold && productStore.hasMoreProducts) {
    productStore.page += 1;
    fetchProducts(true);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const applySort = (sortOption: { value: string; order: 'asc' | 'desc' }) => {
  filters.orderBy = sortOption.value;
  filters.order = sortOption.order;
  productStore.resetProducts();
  fetchProducts();

  router.push({
    query: {
      ...route.query,
      orderBy: sortOption.value,
      order: sortOption.order,
    },
  });
};
</script>


<template>
  <div class="flex flex-col gap-6 page-wrapper">
    <product-filter :filters="filters" @sort-change="applySort" />
    <base-progress :show="loading && productStore.page === 1" />
    <div class="product-card-wrapper">
      <product-card v-for="product in productStore.products" :key="product.id" :product="product" />
    </div>
    <base-progress :show="loading && productStore.page > 1" />
    <div v-if="!productStore.hasMoreProducts && !loading">
      Больше нет доступных товаров.
    </div>
  </div>
</template>

<style scoped lang="pcss">
.page-wrapper {
  padding: 16px;

}

.product-card-wrapper {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}
</style>
