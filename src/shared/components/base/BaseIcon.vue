<script lang="ts" setup>
interface Props {
  name: string;
  filled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { filled: false });

// Auto-load icons
const icons = Object.fromEntries(
  Object.entries(import.meta.glob('~/assets/icons/*.svg', { as: 'raw' })).map(
    (v: any) => {
      const [key, value] = v;
      const filename = key.split('/').pop().split('.').shift();
      return [filename, value];
    },
  ),
);

// Lazily load the icon
const icon = props.name && (await icons?.[props.name]?.());
</script>

<template>
  <div class="icon">
    <span v-if="icon" class="icon" v-html="icon"></span>
  </div>
</template>

<style lang="pcss">
.icon {
  @apply min-h-[24px] min-w-[24px] h-6 w-6 flex items-center justify-center;
}
</style>
