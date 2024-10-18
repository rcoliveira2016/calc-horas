<template>
    <button :class="computedClasses" @click="handleClick">
        <Icon :icon="icon" class="tw-h-5 tw-w-5" />
    </button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, defineProps } from 'vue';

interface Props {
    icon: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);
const computedClasses = computed(() => {
    const baseClasses = 'tw-inline-flex tw-items-center tw-p-2 tw-rounded tw-rounded-full focus:tw-outline-none focus:tw-ring';

    return `${baseClasses}`;
});

const handleClick = () => {
    emits('click');
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
