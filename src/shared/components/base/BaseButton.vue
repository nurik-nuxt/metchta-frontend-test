<script lang="ts" setup>
import BaseIcon from '~/src/shared/components/base/BaseIcon.vue';
import BaseProgress from '~/src/shared/components/base/BaseProgress.vue';

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'big';
  iconPosition?: 'left' | 'right';
  block?: boolean;
  color?: 'primary' | 'primarylight';
  density?: 'default' | 'comfortable' | 'compact';
  iconName?: string;
  dataTestId?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  loading: false,
  variant: 'filled',
  iconPosition: 'right',
  rounded: false,
  size: undefined,
  block: false,
  color: 'primary',
  density: 'default',
  iconName: undefined,
  dataTestId: undefined,
});

const emit = defineEmits<{ (e: 'on-click'): void }>();
</script>

<template>
  <button
      class="button"
      :data-testid="dataTestId"
      :class="[
      {
        button__outlined: props.variant === 'outlined',
        button__text: props.variant === 'text',
        button__compact: props.density === 'compact',
        button__comfortable: props.density === 'comfortable',
        button__big: props.size === 'big',
        'w-full': props.block,
        'rounded-sm':
          !['text'].includes(props.variant) ||
          !['default'].includes(props.color),
      },
      `button--${color}`,
    ]"
      :disabled="props.disabled || props.loading"
      type="submit"
      @click="emit('on-click')"
  >
    <template v-if="!props.loading">
      <BaseIcon
          v-if="props.iconName && props.iconPosition === 'left'"
          :name="props.iconName"
          :filled="false"
          class="icon"
      />

      <slot />
      <BaseIcon
          v-if="props.iconName && props.iconPosition === 'right'"
          :name="props.iconName"
          :filled="false"
          class="icon"
      />
    </template>
    <base-progress v-else show size="24px" />
  </button>
</template>

<style scoped lang="pcss">
.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 12px;

  font-weight: 400;
  font-size: var(--font-size-lg);
  color: var(--color-white);
  border: none;
  transition: all 150ms ease-in-out;
  user-select: none;

  &.button--primary {
    background: var(--color-primary);

    .icon {
      @apply min-w-[20px] w-[20px] h-[20px] min-h-[20px];

      &:deep(.icon) {
        @apply min-w-[20px] w-[20px] h-[20px] min-h-[20px];
      }
    }
  }
  &.button--primarylight {
    background: var(--color-primary-light);
    padding: 12px 16px !important;
    .icon {
      @apply min-w-[24px] w-[24px] h-[24px] min-h-[24px];

      &:deep(.icon) {
        @apply min-w-[24px] w-[24px] h-[24px] min-h-[24px];
      }
    }
  }
}

</style>
