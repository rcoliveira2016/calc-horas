<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui';

const modelValue = defineModel<boolean>();
const props = defineProps<{
  label?: string
}>();
</script>

<template>
  <fieldset class="tw-flex tw-gap-2 tw-items-center">
    <label v-if="props.label" class="tw-text-white tw-text-[15px] tw-leading-none tw-pr-[15px] tw-select-none">
      {{ props.label }}
    </label>
    <SwitchRoot v-model="modelValue"
      class="tw-w-[42px] tw-h-[25px] focus-within:tw-outline focus-within:tw-outline-black tw-flex tw-bg-black/50 tw-shadow-sm tw-rounded-full tw-relative data-[state=checked]:tw-bg-black tw-cursor-default">
      <SwitchThumb
        class="tw-block tw-w-[21px] tw-h-[21px] tw-my-auto tw-bg-white tw-shadow-sm tw-rounded-full tw-transition-transform tw-duration-100 tw-translate-x-0.5 tw-will-change-transform data-[state=checked]:tw-translate-x-[19px]" />
    </SwitchRoot>
  </fieldset>
</template>