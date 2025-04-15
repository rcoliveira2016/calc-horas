<template>
    <button :class="computedClasses" @click="handleClick">
        <Icon :icon="icon" :class="computedClassesInput" />
    </button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
    icon: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);
const computedClasses = computed(() => {
    const baseClasses = 'tw-inline-flex tw-items-center tw-p-2 tw-rounded tw-rounded-full focus:tw-outline-none focus:tw-ring';

    return `${baseClasses}`;
});

const computedClassesInput = computed(() => {
    const size = {
        xs: 'tw-h-4 tw-w-4',
        sm: 'tw-h-5 tw-w-5',
        md: 'tw-h-6 tw-w-6',
        lg: 'tw-h-7 tw-w-7',
        xl: 'tw-h-8 tw-w-8',
    }
    return size[props.size || 'md'];
});

const handleClick = () => {
    emits('click');
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
