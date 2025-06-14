<template>
    <input ref="input" type="text" v-model="modelValue" :placeholder="props.placeholder" :class="[
        'tw-w-fit tw-rounded-lg tw-bg-gray-600 dark:tw-bg-gray-800 tw-p-3',
        noBorder ? 'tw-border-0 tw-outline-0' : 'tw-border tw-border-neutral-200 dark:tw-border-white/10'
    ]" />
</template>
<script lang="ts" setup>
const modelValue = defineModel<string>();
const input = useTemplateRef('input');
const props = defineProps<{
    placeholder?: string
    focus?: boolean
    noBorder?: boolean
}>();

onMounted(() => {
    if (props.focus) {
        input.value?.focus();
    }
})

</script>