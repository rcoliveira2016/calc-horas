<template>
    <input type="text" v-model="modelValue"
        :placeholder="props.placeholder"
        class="tw-rounded-lg tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-bg-gray-600 dark:tw-bg-gray-800 tw-p-3 tw-w-fit" />
</template>
<script lang="ts" setup>
const modelValue = defineModel<string>();
const props = defineProps<{
    placeholder?: string
}>();
</script>