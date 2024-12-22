<template>
  <fieldset class="tw-mb-[15px] tw-w-full tw-flex tw-flex-col tw-justify-start">
    <label class="tw-leading-none tw-mb-2.5 tw-block" :for="props.idField">
      {{ props.label }}
    </label>
    <slot :id="props.idField" :label="props.label" />
  </fieldset>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string,
  idField: string
}>();

</script>