<script setup lang="ts">

interface Props {
  filters: {
    orderBy: string;
    order: 'asc' | 'desc';
  };
}

const props = withDefaults(defineProps<Props>(), {
  filters() {
    return {
      orderBy: 'rating',
      order: 'desc'
    }
  }
});

const emit = defineEmits<{
  (e: 'sort-change', sortOption: { value: string; order: string }): void;
}>();

const sortOptions: { label?: string, value: string, order: 'asc' | 'desc'}[] = [
  { label: 'По популярности', value: 'rating', order: 'desc' },
  { label: 'Сначала подешевле', value: 'price', order: 'asc' },
  { label: 'Сначала подороже', value: 'price', order: 'desc' },
  { label: 'Сначала новое', value: 'createdAt', order: 'desc' },
  { label: 'По алфавиту', value: 'title', order: 'asc' },
];


const applySort = (sortOption: { value: string; order: 'asc' | 'desc' }) => {
  props.filters.orderBy = sortOption.value;
  props.filters.order = sortOption.order;
  emit('sort-change', sortOption);
};
</script>

<template>
  <div class="hidden md:flex items-center space-x-4 filter-wrapper">
    <span class="text-sm font-normal text-[#322F38]">Сортировать:</span>
    <ul class="flex space-x-4">
      <li v-for="option in sortOptions" :key="option.value + option.order">
        <button
            :class="{
            'border-b-2 text-[#2667FF]': filters.orderBy === option.value && filters.order === option.order,
            'text-[#6A707C]': !(filters.orderBy === option.value && filters.order === option.order),
          }"
            @click="applySort(option)"
            class="text-sm font-normal py-2"
        >
          {{ option?.label }}
        </button>
      </li>
    </ul>
  </div>

  <div class="block md:hidden">
    <label class="text-xs text-[#6A707C]">Сортировать:</label>
    <select v-model="filters.orderBy" @change="applySort({ value: filters.orderBy, order: 'asc' })" class="select-wrapper">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="pcss">
.filter-wrapper {
  border: 1px solid #F0F0F0;
  padding: 1px 20px;
  border-radius: 8px;
}

.select-wrapper {
  border: 1px solid #F0F0F0;
  @apply text-sm text-[#2667FF] border rounded-lg p-2 w-full;
}
</style>
