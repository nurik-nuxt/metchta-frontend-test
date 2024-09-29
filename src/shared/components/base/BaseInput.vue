<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});
defineProps({
  modelValue: {
    type: String
  },
  pill: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue'] )
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="input"
      v-bind="$attrs"
      :value="modelValue"
      @input="updateValue"
      :class="{
        'has-suffix': $slots.suffix,
        pill,
      }"
    />
    <div class="suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  + .input-wrapper {
    margin-top: 16px;
  }
}
.input {
  box-sizing: border-box;
  width: 100%;
  background: #FFFFFF;
  padding: 9px 24px;
  outline: 0;
  border-radius: 50px;
  font-size: 16px;
  &.pill {
    border-radius: 50px;
  }
  &.has-prefix {
    padding-left: 12px;
  }
  &.has-suffix {
    padding-right: 48px;
  }
}

.suffix {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
}

.suffix {
  right: 16px;
}
</style>
